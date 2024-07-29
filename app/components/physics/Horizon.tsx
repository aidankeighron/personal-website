import { useBox, useRaycastVehicle, PublicApi, RaycastVehiclePublicApi, 
    WheelInfoOptions, BodyProps, CompoundBodyProps, useCompoundBody, 
} from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { Ref, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WheelDebug } from "./WheelDebug";
import { Group, Object3DEventMap, Quaternion, Vector3 } from "three";
import { Position } from "@/app/types";

const GROUP0 = 1;
const GROUP1 = 2;

type CarParams = {
  startPosition: Position,
  orbit?: boolean,
}

export function Horizon({startPosition, orbit=false}: CarParams): JSX.Element {
    const result = useLoader(
    GLTFLoader,
    "/models/horizon_no_weapon.glb"
    ).scene;

    const weaponRef = useRef<any>(null);
    const weapon = useLoader(
    GLTFLoader,
    "/models/horizon_weapon.glb"
    ).scene;

    const position: Position = startPosition;
    const width: number = 0.2;
    const height: number = 0.08;
    const front: number = 0.15;
    const wheelRadius: number = 0.05;

    const chassisBodyArgs: Position = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(() => ({
    allowSleep: false, // TODO what does this do
    args: chassisBodyArgs,
    mass: 150,
    position,
    rotation: [0,0,0],
    collisionFilterGroup: GROUP1,
    collisionFilterMask: GROUP0,
    }), useRef(null));

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
    const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
        chassisBody,
        wheelInfos,
        wheels
    }), useRef(null));

    useControls(vehicleApi, chassisApi, position);

    const cameraOffset = new Vector3(0, 6, 0);
    const positionMultiply = new Vector3(0, 0, 1);

    useFrame((state) => {
    if (chassisBody.current == null || orbit) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0,0,0);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();
    position.multiply(positionMultiply);
    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(-1).add(cameraOffset));

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
    });

    useEffect(() => {
    if (!result || !weapon) return;
    let mesh = result; // so we don't hide the mesh JSX element
    mesh.scale.set(0.002, 0.002, 0.002);
    let mesh1 = weapon; // so we don't hide the mesh JSX element
    mesh1.scale.set(0.002, 0.002, 0.002);
    }, [result]);

    // const weaponBodyArgs: Position = [0.31, 0.02, 0.01];
    const weaponBodyArgs: Position = [1, 0.5, 0.5];
    const [weaponCollision, weaponCollisionAPI] = useBox(() => ({
        allowSleep: false,
        mass: 100,
        collisionFilterGroup: GROUP1,
        collisionFilterMask: GROUP0,
        type: 'Kinematic',
        rotation: [0,0,2.55],
        position: [0,0,0.017],
        args: [0.31, 0.02, 0.01],
        angularFactor: [0, 0, 1]
    }), useRef(null));

    const boxArgs: Position = [0.4, 0.4, 0.4];
    const [physicsBox, test1] = useBox(() => ({
        allowSleep: false, // TODO what does this dor
        args: boxArgs,
        mass: 50,
        position: [-1,0.3,0],
        rotation: [0,0,0],
        // collisionFilterGroup: GROUP1,
        // collisionFilterMask: GROUP0,
        type: 'Dynamic',
    }), useRef(null));

    useFrame(() => {
        // weaponCollisionAPI.applyForce([])
        // weaponCollisionAPI.applyTorque([0,0,10]);
        // weaponRef.current.rotation.z += 0.1;
        // weaponRef.current.rotation.z += 0.1*166.66; // Actual Speed
    });

    return (
        <group ref={vehicle as Ref<Group<Object3DEventMap>>} name="vehicle">
            <group ref={chassisBody as Ref<Group<Object3DEventMap>>} name="chassisBody">
                <primitive object={result} rotation-x={-Math.PI/2} rotation-y={Math.PI} position={[0, -0.05, 0.06]}/>
                <group ref={weaponRef} rotation-x={-Math.PI/2} rotation-y={Math.PI} position={[0, 0.0125, -0.165]}>
                    <primitive object={weapon} />
                    <mesh ref={weaponCollision as any} visible={true}>
                        <boxGeometry args={weaponBodyArgs} />
                        <meshBasicMaterial transparent={true} opacity={0.25} />
                    </mesh>
                </group>
            </group>
            <mesh ref={physicsBox as any}>
            <meshBasicMaterial transparent={true} opacity={0.3} />
            <boxGeometry args={boxArgs} />
            </mesh>
            {/* <mesh ref={chassisBody}>
            <meshBasicMaterial transparent={true} opacity={0.3} />
            <boxGeometry args={chassisBodyArgs} />
            </mesh> */}

            {/* <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} /> */}
        </group>
    );
}

function useControls(vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi, startPosition: Position) {
  let [controls, setControls] = useState<{[key: string]: boolean}>({ });

  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true}));
    }

    const keyUpPressHandler = (e: KeyboardEvent) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false}));
    }
  
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    }
  }, []);

  const frontSteering = 1;
  const engineForce = 150;

  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;

    const forward = controls.w || controls.arrowup;
    const reverse = controls.s || controls.arrowdown;
    const left = controls.a || controls.arrowleft;
    const right = controls.d || controls.arrowright;
    const reset = controls.r;

    if (reverse) {
        vehicleApi.applyEngineForce(-engineForce, 0);
        vehicleApi.applyEngineForce(-engineForce, 1);
        vehicleApi.applyEngineForce(-engineForce, 2);
    }
    else if (forward) {
        vehicleApi.applyEngineForce(engineForce, 0);
        vehicleApi.applyEngineForce(engineForce, 1);
        vehicleApi.applyEngineForce(engineForce, 2);
    }

    if (!forward && !reverse) {
      vehicleApi.applyEngineForce(0, 0);
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.setBrake(1, 0);
      vehicleApi.setBrake(1, 1);
      vehicleApi.setBrake(1, 2);
    }
    else {
        vehicleApi.setBrake(0, 0);
        vehicleApi.setBrake(0, 1);
        vehicleApi.setBrake(0, 2);
    }

    if (left) {
        vehicleApi.setSteeringValue(frontSteering, 2);
    } else if (right) {
        vehicleApi.setSteeringValue(-frontSteering, 2);
    }
    else {
        vehicleApi.setSteeringValue(0, 2);
    }

    if (reset) {
      chassisApi.position.set(...startPosition);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]); // TODO are all of these needed?

  return controls;
}

function useWheels(width: number, height: number, front: number, radius: number): [Ref<Group<Object3DEventMap>>[], WheelInfoOptions[]] {
    const wheels: Ref<Group<Object3DEventMap>>[] = [useRef(null), useRef(null), useRef(null)];
  
    const widthMultiplier = 0.5;
    const heightMultiplier = 0.2;
    const frontMultiplier = 0.7;
  
    const wheelInfo: WheelInfoOptions = {
      radius,
      directionLocal: [0, -1, 0],
      axleLocal: [1, 0, 0],
      suspensionStiffness: 500,
      suspensionRestLength: 0.03,
      maxSuspensionTravel: 0.1,
      frictionSlip: 20,
      dampingRelaxation: 10,
      dampingCompression: 10,
      // maxSuspensionForce: 100000,
      rollInfluence: 0.1,
      // customSlidingRotationalSpeed: -30,
      // useCustomSlidingRotationalSpeed: true,
    };
  
    const wheelInfos: WheelInfoOptions[] = [
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [-width * widthMultiplier, height * heightMultiplier, front * frontMultiplier],
        isFrontWheel: true,
      },
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [width * widthMultiplier, height * heightMultiplier, front * frontMultiplier],
        isFrontWheel: true,
      },
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [0, height * heightMultiplier, -front * frontMultiplier*1.2],
        isFrontWheel: false,
      },
    ];
  
    type GetByIndex<T extends BodyProps> = (index: number) => T
    const propsFunc: GetByIndex<CompoundBodyProps> = () => ({
        collisionFilterGroup: GROUP1,
        collisionFilterMask: GROUP0,
        mass: 1,
        shapes: [
        {
            args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
            rotation: [0, 0, -Math.PI / 2],
            type: "Cylinder",
        },
        ],
        type: "Kinematic",
    });
  
    useCompoundBody(propsFunc, wheels[0]);
    useCompoundBody(propsFunc, wheels[1]);
    useCompoundBody(propsFunc, wheels[2]);
  
    return [wheels, wheelInfos];
  };