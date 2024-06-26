import {
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { ColliderBox } from "./ColliderBox";
  
  export function Scene(): JSX.Element {
    const [thirdPerson, setThirdPerson] = useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = useState<[x: number, y: number, z: number]>([-6, 3.9, 6.21]);
  
    useEffect(() => {
      function keydownHandler(e: globalThis.KeyboardEvent) {
        if (e.key == "k") {
          // random is necessary to trigger a state change
          if(thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
          setThirdPerson(!thirdPerson); 
        }
      }
  
      window.addEventListener("keydown", keydownHandler);
      return () => window.removeEventListener("keydown", keydownHandler);
    }, [thirdPerson]);
  
    return (
      <Suspense fallback={null}>
        <ambientLight />
  
        <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
        {!thirdPerson && (
          <OrbitControls target={[-2.64, -0.71, 0.03]} />
        )}
        <ColliderBox position={[0, 0, 0]} scale={[1, 1, 1]}/>
        <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
        <Ground />
        <Car thirdPerson={thirdPerson} />
      </Suspense>
    );
  }