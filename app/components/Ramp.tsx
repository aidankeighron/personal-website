import { useTrimesh } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Ramp(): any {
    const result = useLoader(GLTFLoader, "/models/ramp.glb");

    let geometry;
    if (result.scene.children[0] instanceof Mesh) {
      geometry = result.scene.children[0].geometry;
    }

    const vertices = geometry.attributes.position.array;
    const indices  = geometry.index.array;

    useTrimesh(
        () => ({
            args: [vertices, indices],
            mass: 0,
            type: "Static",
        }),
        useRef(null)
    );
}