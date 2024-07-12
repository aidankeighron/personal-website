import {
  OrbitControls,
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
        {/* <ColliderBox position={[0, 0, 0]} scale={[1, 1, 1]}/> */}
        {/* TODO plane geometry v ? */}
        <ColliderBox position={[-4.5, 0, 0]} scale={[0.5, 1, 1000]}/>
        <ColliderBox position={[4.5, 0, 0]} scale={[0.5, 1, 1000]}/>
        <Ground />
        <Car />
      </Suspense>
    );
  }