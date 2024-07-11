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
          <Html wrapperClass='content' occlude="blending" center >
              <Content />
          </Html>
        </Canvas>
      </div>
    </div>
  );
}