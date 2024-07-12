"use client";

import { Html } from '@react-three/drei';
import Header from '../components/Header';
import Content from './content.mdx';
import { Canvas } from '@react-three/fiber';
import { Scene } from "../components/physics/Scene";
import { Physics } from "@react-three/cannon";

export default function Page() {
  return (
    <div className='main'>
      <Header />
      <div className='scene'>
        <Canvas>
          <Physics
            broadphase="SAP" gravity={[0, -2.6, 0]}>
            <Scene />
          </Physics>
          <Html className="contentWrapper" transform rotation-x={-Math.PI / 2} position={[0, 0, 0]} occlude="blending" scale={0.1} fullscreen>
          {/* <Html wrapperClass='content' occlude="blending" center > */}
              <div className='content'>
                <Content />
              </div>
          </Html>
        </Canvas>
      </div>
    </div>
  );
}