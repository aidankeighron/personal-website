import { useBox, useRaycastVehicle, PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { Ref, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { Group, Object3DEventMap, Quaternion, Vector3 } from "three";
import { Position } from "@/app/v1/types";

type CarParams = {
  startPosition: Position,
  orbit?: boolean,
}

export function Car({startPosition, orbit=false}: CarParams): JSX.Element {
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    "/models/car.glb"
  ).scene;


  const position: Position = startPosition;
  const width: number = 0.13;
  const height: number = 0.04;
  const front: number = 0.12;
  const wheelRadius: number = 0.025;

  const chassisBodyArgs: Position = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(() => ({
    allowSleep: false,
    args: chassisBodyArgs,
    mass: 150,
    position,
    rotation: [0,Math.PI,0]
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
    if (!result) return;
    console.log("Updating car mesh");
    let mesh = result; // so we don't hide the mesh JSX element
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, 26, -67);
  }, [result]);

  return (
    <group ref={vehicle as Ref<Group<Object3DEventMap>>} name="vehicle">
      <group ref={chassisBody as Ref<Group<Object3DEventMap>>} name="chassisBody">
        <primitive object={result} rotation-y={Math.PI} position={[0, -0.09, 0]} />
      </group>
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}

function useControls(vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi, startPosition: Position) {
  let [controls, setControls] = useState<{[key: string]: boolean}>({ });
  let shiftTimer = useRef<number>(0);
  let lastTimeSeconds = useRef<number>(Date.now()/1000);
  let gear = useRef<number>(1);
  let speed = useRef<number>(0);

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

  useEffect(() => {
    let subscription = chassisApi.velocity.subscribe((value) => {
      speed.current = Math.sqrt(Math.pow(value[0], 2) + Math.pow(value[1], 2) + Math.pow(value[2], 2));
    });
    console.log("Subscribing to velocity");

    return () => {
      subscription();
    }
  });
  
  useEffect(() => {
    const frontSteering = 0.5;
    const backSteering = 0.1; // 0.25 drift?
    const engineForce = 500;
    const shiftTime = 0.2;
    const gears: {'R': number, [key: number]: number} = {
      'R': -0.5,
      '0': 0,
      '1': 1.0,
      '2': 1.7,
      '3': 2.5,
      '4': 3.8,
      '5': 5.0,
    }

    if(!vehicleApi || !chassisApi) return;
    const currentTimeSeconds = Date.now() / 1000;
    const timeStepSeconds = currentTimeSeconds - lastTimeSeconds.current;
    lastTimeSeconds.current = currentTimeSeconds;
    console.log("Time Step Milliseconds", timeStepSeconds*1000);

    const forward = controls.w || controls.arrowup;
    const reverse = controls.s || controls.arrowdown;
    const breaking = controls[" "];
    const left = controls.a || controls.arrowleft;
    const right = controls.d || controls.arrowright;
    const reset = controls.r;

    if (shiftTimer.current > 0) {
      shiftTimer.current -= timeStepSeconds;
      shiftTimer.current = Math.max(0, shiftTimer.current);
    } 
    else {
      if (reverse) {
        const power = (gears['R'] - Math.abs(speed.current)) / Math.abs(gears['R']);
        const force = (engineForce / gear.current) * Math.abs(power);
        vehicleApi.applyEngineForce(-force, 2);
        vehicleApi.applyEngineForce(-force, 3);
      }
      else {
        const power = (gears[gear.current] - speed.current) / (gears[gear.current] - gears[gear.current-1]);
        if (power < 0.1 && gear.current < Object.keys(gears).length-2) { // -2 for 0 and R
          console.log("Upshift");
          gear.current += 1;
          shiftTimer.current = shiftTime;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (power > 1.2 && gear.current > 1) {
          console.log("Downshift");
          gear.current -= 1
          shiftTimer.current = shiftTime;
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }
        else if (forward) {
          const force = (engineForce / gear.current) * power;
          vehicleApi.applyEngineForce(force, 2);
          vehicleApi.applyEngineForce(force, 3);
        }
      }
    }

    if (breaking) {
      vehicleApi.setBrake(3, 2);
      vehicleApi.setBrake(3, 3);
    }
    else {
      vehicleApi.setBrake(0, 2);
      vehicleApi.setBrake(0, 3);
    }
    

    if (!forward && !reverse && !breaking) {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      vehicleApi.setBrake(1, 2);
      vehicleApi.setBrake(1, 3);
    }
    // if (forward) {
    //   vehicleApi.applyEngineForce(100, 2);
    //   vehicleApi.applyEngineForce(100, 3);
    // }

    if (left) {
      vehicleApi.setSteeringValue(frontSteering, 2);
      vehicleApi.setSteeringValue(frontSteering, 3);
      vehicleApi.setSteeringValue(-backSteering, 0);
      vehicleApi.setSteeringValue(-backSteering, 1);
    } else if (right) {
      vehicleApi.setSteeringValue(-frontSteering, 2);
      vehicleApi.setSteeringValue(-frontSteering, 3);
      vehicleApi.setSteeringValue(backSteering, 0);
      vehicleApi.setSteeringValue(backSteering, 1);
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (reset) {
      chassisApi.position.set(...startPosition);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, Math.PI, 0);
      gear.current = 1;
    }
  }, [controls, vehicleApi, chassisApi, startPosition]);

  return controls;
}
