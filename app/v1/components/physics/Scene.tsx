import {
  OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { usePlane } from "@react-three/cannon";
import { Position } from "@/app/v1/types";
  
type SceneProps = {
  startPosition: Position,
  orbit?: boolean,
};

export function Scene({startPosition, orbit=false}: SceneProps): JSX.Element {
  // Side planes
  // usePlane(
  //   () => ({ 
  //     type: 'Static', 
  //     position: [4.5, 0, 0],
  //     rotation: [0, -Math.PI/2, 0] }
  //   ), 
  //   useRef(null)
  // );
  // usePlane(
  //   () => ({ 
  //     type: 'Static', 
  //     position: [-4.5, 0, 0],
  //     rotation: [0, Math.PI/2, 0] }
  //   ), 
  //   useRef(null)
  // );

  return (
    <Suspense fallback={null}>
      <ambientLight />
      {(() => {
        // return <OrbitControls target={[0,0,0]} position={[0,0,0]} />
        // return <PerspectiveCamera makeDefault position={startPosition} fov={40} />
        if (orbit) {
          return <OrbitControls target={[0,0,0]} position={[0,0,0]} />
        }
        else {
          return <PerspectiveCamera makeDefault position={startPosition} fov={40} />
        }
      })()}
      <Ground />
      <Car startPosition={startPosition} orbit={orbit} />
    </Suspense>
  );
}
