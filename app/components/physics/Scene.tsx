import {
  OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { usePlane } from "@react-three/cannon";
import { Position } from "@/app/types";
  
type SceneProps = {
  startPosition?: Position,
  orbit?: boolean,
};

export function Scene({startPosition, orbit=false}: SceneProps): JSX.Element {
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
      {(() => {
        if (orbit) {
          return <OrbitControls target={[-2.64, -0.71, 0.03]} />
        }
        else {
          return <PerspectiveCamera makeDefault position={startPosition ?? [-6, 3.9, 6.21]} fov={40} />
        }
      })()}
      <Ground />
      <Car startPosition={startPosition} />
    </Suspense>
  );
}