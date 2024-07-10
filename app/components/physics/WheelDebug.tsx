import { Ref } from "react";
import { Group, Object3DEventMap } from "three";

const debug = true;

type WheelDebugParams = {
    radius: number,
    wheelRef: Ref<Group<Object3DEventMap>>
}

export function WheelDebug({radius, wheelRef}: WheelDebugParams): JSX.Element {
  return debug && (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshNormalMaterial transparent={true} opacity={0.25} />
      </mesh>
    </group>
  );
};