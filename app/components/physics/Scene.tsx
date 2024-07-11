import {
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { ColliderBox } from "./ColliderBox";
  
  export function Scene(): JSX.Element {

    return (
      <Suspense fallback={null}>
        <ambientLight />
  
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
        {/* <OrbitControls target={[-2.64, -0.71, 0.03]} /> */}
        <ColliderBox position={[0, 0, 0]} scale={[1, 1, 1]}/>
        <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
        <Ground />
        <Car />
      </Suspense>
    );
  }