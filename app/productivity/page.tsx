"use client";

import { Html, PerformanceMonitor, Stats } from '@react-three/drei';
import Header from '../components/Header';
import Content from './content.mdx';
import { Canvas } from '@react-three/fiber';
import { Scene } from "../components/physics/Scene";
import { Physics } from "@react-three/cannon";
import { StrictMode, useState } from 'react';

export default function Page() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className='main'>
      <Header />
      <div className='scene'>
        <StrictMode>
          <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
            <Physics
              broadphase="SAP" gravity={[0, -2.6, 0]}>
              <Scene />
            </Physics>
            <Stats />
            <Html className="contentWrapper" transform rotation-x={-Math.PI / 2} position={[0, 0, 0]} occlude="blending" scale={0.1} fullscreen>
            {/* <Html wrapperClass='content' occlude="blending" center > */}
                <div className='content'>
                  <Content />
                </div>
            </Html>
          </PerformanceMonitor>
          </Canvas>
        </StrictMode>
      </div>
    </div>
  );
}