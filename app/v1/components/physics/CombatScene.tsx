import {
    OrbitControls,
      PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import { Ground } from "./Ground";
import { Position } from "@/app/v1/types";
import { Horizon } from "./Horizon";

  type SceneProps = {
    startPosition: Position,
    orbit?: boolean,
  };
  
  export function CombatScene({startPosition, orbit=false}: SceneProps): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ambientLight />
        {orbit && <OrbitControls target={[0,0,0]} 
        maxPolarAngle={Math.PI/2-0.01}
        />}
        <PerspectiveCamera makeDefault position={[-2,1,2]} fov={40} />
        <Ground />
        <mesh rotation-x={-Math.PI/2}>
            <planeGeometry args={[12, 12]}/>
            <meshBasicMaterial
                opacity={0.325}
                transparent={false}
                color={"#111111"}
            />
        </mesh>
        <Horizon startPosition={startPosition} orbit={orbit} />
      </Suspense>
    );
  }
