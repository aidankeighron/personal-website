import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { Ref, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { Group, Object3DEventMap, Quaternion, Vector3 } from "three";

type CarParams = {
}

export function Car(): JSX.Element {
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    "/models/car.glb"
  ).scene;

  const position: [x: number, y: number, z: number] = [-1.5, 0.5, 3];
  const width: number = 0.13;
  const height: number = 0.04;
  const front: number = 0.12;
  const wheelRadius: number = 0.025;

  const chassisBodyArgs: [x: number, y: number, z: number] = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(() => ({
    allowSleep: false, // TODO what does this do
    args: chassisBodyArgs,
    mass: 150,
    position,
  }), useRef(null));

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels
  }), useRef(null));

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if (chassisBody.current == null) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0,0,0);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();
    position.multiply(new Vector3(0, 0, 1));
    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 6, 0)));

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    if (!result) return;

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