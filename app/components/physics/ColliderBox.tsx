import { Position } from "@/app/types";
import { useBox } from "@react-three/cannon";

const debug = true;

type ColliderBoxProps = {
    position: Position,
    scale: [width: number, height: number, depth: number]
}

export function ColliderBox({position, scale}: ColliderBoxProps): any {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    <mesh visible={debug} position={position}>
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