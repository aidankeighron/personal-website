import { Position } from "@/app/v1/types";
import { useBox } from "@react-three/cannon";

const debug = true;

type ColliderBoxProps = {
    position: Position,
    scale: [width: number, height: number, depth: number],
    rotation?: Position,
}

export function ColliderBox({position, scale, rotation=[0,0,0]}: ColliderBoxProps): any {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
    collisionFilterGroup: 1,
    collisionFilterMask: 2,
  }));

  return (
    <mesh visible={debug} position={position} rotation={rotation}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent={true} opacity={0.25} />
    </mesh>
  );
  // return (
  //   debug && (
  //     <mesh position={position}>
  //       <boxGeometry args={scale} />
  //       <meshBasicMaterial transparent={true} opacity={0.25} />
  //     </mesh>
  //   )
  // );
}
