import { useBox } from "@react-three/cannon";

const debug = false;

type ColliderBox = {
    position: [x: number, y: number, z: number],
    scale: [width: number, height: number, depth: number]
}

export function ColliderBox({position, scale}: ColliderBox) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
}