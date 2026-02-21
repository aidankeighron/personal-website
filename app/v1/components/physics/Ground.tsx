import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute, Mesh } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground(): JSX.Element {
  usePlane(
    () => ({ 
      type: 'Static', 
      rotation: [-Math.PI / 2, 0, 0] }
    ), 
    useRef(null)
  );

  const gridMap = useLoader(
    TextureLoader,
    "/textures/grid.png"
  );

  useEffect(() => {
    if (!gridMap) return;
    console.log("Updating gridMap");
    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef = useRef<Mesh>(null);
  useEffect(() => {
    if (!meshRef.current) return;
    console.log("Updating Mesh Ref");
    const uvs2 = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef]);

  return (
    <>
      {/* <mesh
        ref={meshRef}
        position={[0, -0.01, 5]}
        rotation-x={-Math.PI * .5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh> */}
    </>
  );
}
