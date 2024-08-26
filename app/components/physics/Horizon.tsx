import { useBox, useRaycastVehicle, PublicApi, RaycastVehiclePublicApi, 
    WheelInfoOptions, BodyProps, CompoundBodyProps, useCompoundBody,
} from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { Ref, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { WheelDebug } from "./WheelDebug";
import { Group, Object3DEventMap } from "three";
import { Position } from "@/app/types";
import { WheelDebug } from "./WheelDebug";

const GROUP0 = 1;
const GROUP1 = 2;
const weaponArgs: Position = [0.1, 0.07, 0.4];
type CarParams = {
  startPosition: Position,
  orbit?: boolean,
}

export function Horizon({startPosition, orbit=false}: CarParams): JSX.Element {
  // TODO make drive upside down
  // TODO hitting objects pushes you up
  // TODO reset cubes
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
  type: 'Dynamic',
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

  const controls = useControls(vehicleApi, chassisApi, position);

  let weaponAngle = 0;
  useFrame(() => {
    const slow = true;

    if (slow) {
      weaponAngle -= 0.5;
      vehicleApi.setSteeringValue(weaponAngle, 3);
      weaponRef.current.rotation.z += 0.5;
    }
    else {
      weaponAngle -= 1;
      vehicleApi.setSteeringValue(weaponAngle, 3);
      weaponRef.current.rotation.z += 1;
    }
  });

  useEffect(() => {
  if (!result || !weapon) return;
  let mesh = result;
  mesh.scale.set(0.002, 0.002, 0.002);
  let mesh1 = weapon;
  mesh1.scale.set(0.002, 0.002, 0.002);
  }, [result, weapon]);

  return (
    <>
      <group ref={vehicle as Ref<Group<Object3DEventMap>>} name="vehicle">
          <group ref={chassisBody as Ref<Group<Object3DEventMap>>} name="chassisBody">
              <primitive object={result} rotation-x={-Math.PI/2} rotation-y={Math.PI} position={[0, -0.05, 0.06]}/>
              <group ref={weaponRef} rotation-x={-Math.PI/2} rotation-y={Math.PI} position={[0, 0.0125, -0.165]}>
                  <primitive object={weapon} />
              </group>
          </group>

          {/* <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} /> */}
          {/* <group ref={wheels[3]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={weaponArgs} />
              <meshNormalMaterial transparent={true} opacity={0.25} />
            </mesh>
          </group> */}
      </group>
      <PhysicsBox position={[0, 0.1, -0.5]} args={[0.2, 0.2, 0.2]} controls={controls} color="blue" />
      <PhysicsBox position={[0, 0.3, -0.5]} args={[0.1, 0.1, 0.1]} controls={controls} color="purple" />
      <PhysicsBox position={[-0.5, 0.1, -0.5]} args={[0.3, 0.3, 0.3]} controls={controls} color="red" />
      <PhysicsBox position={[-0.5, 0.5, -0.5]} args={[0.3, 0.3, 0.3]} controls={controls} color="yellow" />
      <PhysicsBox position={[-0.4, 1, -0.5]} args={[0.3, 0.3, 0.3]} controls={controls} color="green" />
    </>
  );
}

type PhysicsBoxArgs = {
  position: Position,
  args: Position,
  color: string,
  controls?: {[key: string]: boolean}
}
function PhysicsBox({position, args, color, controls}: PhysicsBoxArgs) {
  const [physicsBox, physicsBoxAPI] = useBox(() => ({
      allowSleep: false, // TODO what does this do
      args: args,
      mass: 200,
      position: position,
      rotation: [0,0,0],
      type: 'Dynamic',
  }), useRef(null));
  
  useEffect(() => {
    if (controls === undefined) return;
    const reset = controls.r;
    
    if (reset) {
      physicsBoxAPI.position.set(...position);
      physicsBoxAPI.rotation.set(0, 0, 0);
      physicsBoxAPI.velocity.set(0, 0, 0);
      physicsBoxAPI.angularVelocity.set(0, 0, 0);
    }
  }, [controls, physicsBoxAPI, position]);

  return (
    <mesh ref={physicsBox as any}>
    <meshBasicMaterial color={color} opacity={0.5} />
    <boxGeometry args={args} />
  </mesh>
  )
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
  const engineForce = 170;

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
  }, [controls, vehicleApi, chassisApi, startPosition]); // TODO are all of these needed?

  return controls;
}

function useWheels(width: number, height: number, front: number, radius: number): [Ref<Group<Object3DEventMap>>[], WheelInfoOptions[]] {
    const wheels: Ref<Group<Object3DEventMap>>[] = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
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
      rollInfluence: 0.1,
    };
  
    const wheelInfos: WheelInfoOptions[] = [
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [-width * widthMultiplier, height * heightMultiplier, front * frontMultiplier],
        isFrontWheel: false,
      },
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [width * widthMultiplier, height * heightMultiplier, front * frontMultiplier],
        isFrontWheel: false,
      },
      {
        ...wheelInfo,
        chassisConnectionPointLocal: [0, height * heightMultiplier, -front * frontMultiplier*1.2],
        isFrontWheel: true,
      },
      {
        radius: 0.01,
        directionLocal: [0, -1, 0],
        axleLocal: [0, 1, 0],
        suspensionStiffness: 20,
        suspensionRestLength: 0.03,
        maxSuspensionTravel: 0.1,
        frictionSlip: 20,
        dampingRelaxation: 10,
        dampingCompression: 10,
        rollInfluence: 0.1,
        chassisConnectionPointLocal: [0, 0.02, -0.16],
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
    const propsFuncWeapon: GetByIndex<CompoundBodyProps> = () => ({
        collisionFilterGroup: GROUP1,
        collisionFilterMask: GROUP0,
        mass: 100,
        shapes: [
          {
              args: weaponArgs,
              rotation: [0, 0, 0],
              type: "Box",
          },
        ],
        type: "Kinematic",
    });
  
    useCompoundBody(propsFunc, wheels[0]);
    useCompoundBody(propsFunc, wheels[1]);
    useCompoundBody(propsFunc, wheels[2]);
    useCompoundBody(propsFuncWeapon, wheels[3]);
  
    return [wheels, wheelInfos];
  };