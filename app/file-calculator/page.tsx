"use client";

import { Html, PerformanceMonitor, Stats } from '@react-three/drei';
import Content from './content.mdx';
import { Canvas } from '@react-three/fiber';
import { Scene } from "../components/physics/Scene";
import { Physics } from "@react-three/cannon";
import { StrictMode, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "File Calculator"
}

export default function Page() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className='scene bg-d-main flex flex-col items-center'>
    <Link href='/'><p className='header-link w-fit absolute z-10 items-end justify-end top-10 left-20'>Home</p></Link>
      <StrictMode>
        <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}} className='bg-d-main'>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
          <Physics
            broadphase="SAP" gravity={[0, -2.6, 0]}>
            <Scene startPosition={[0, 0.1, -12]}/>
          </Physics>
          <Stats />
          <Html className="contentWrapper" transform rotation-x={-Math.PI / 2} position={[0, 0, 0]} occlude="blending" scale={0.1} fullscreen>
              <div className='content' style={{transform: 'scale(2)'}}>
                <Content />
              </div>
          </Html>
        </PerformanceMonitor>
        </Canvas>
      </StrictMode>
      </div>
  );
}