import {
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { usePlane } from "@react-three/cannon";
  
  export function Scene(): JSX.Element {
    // Side planes
    usePlane(
      () => ({ 
        type: 'Static', 
        position: [4.5, 0, 0],
        rotation: [0, -Math.PI/2, 0] }
      ), 
      useRef(null)
    );
    usePlane(
      () => ({ 
        type: 'Static', 
        position: [-4.5, 0, 0],
        rotation: [0, Math.PI/2, 0] }
      ), 
      useRef(null)
    );
    
    return (
      <Suspense fallback={null}>
        <ambientLight />
  
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
        {/* <OrbitControls target={[-2.64, -0.71, 0.03]} /> */}
        <Ground />
        <Car />
      </Suspense>
    );
  }