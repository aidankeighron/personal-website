'use client'

import Link from 'next/link';
import React, { StrictMode, useState } from 'react';
import { badConflictRobots } from '../pageData';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { CombatScene } from '../components/physics/CombatScene';

export default function CurrentRobots() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className='bg-d-main flex flex-col items-center pt-40'>
      <Link href='/'><p className='header-link w-fit absolute z-10 items-end justify-end top-10 left-20'>Home</p></Link>
      <h1 className='text-5xl font-semibold bottom-border mb-2'>Combat Robotics</h1>
      <h1 className='text-sm text-a-main mb-10'>*Check out the playground below</h1>

      <div className='w-[80%]'>
        <h2 className='text-3xl bottom-border font-medium w-fit mb-10'>Combat Robots - Antweight (1lb)</h2>
        {/* TODO Image of robot */}
        <div className='flex flex-col odd:flex-col-reverse'>
        {badConflictRobots.map((robot) => {
          return (
            <div key={robot.name} className='mx-16 mb-16 flex flex-row odd:flex-row-reverse justify-between'>
              {robot.image1 && <img src={robot.image1} alt={robot.image1Alt} className='w-1/4 rounded-xl' />}
              <div className='self-center mx-12'>
                <div className='flex flex-row items-end mb-5'>
                  <h3 className='text-3xl mr-5 bottom-border w-fit'>{robot.name}</h3>
                  <h4 className='text-lg text-d-a-second'>W: {robot.record.w}, L: {robot.record.l}</h4>
                </div>
                <p className='text-lg mb-5'>{robot.description}</p>
                <div className=''>
                  {Object.entries(robot.info).map(([key, value]) => {
                    return (
                      <div key={key} className='flex flex-row mb-1'>
                        <p className='text-lg mr-2'>{key}:</p>
                        <p className='text-lg font-semibold text-a-main'>{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {robot.image2 && <img src={robot.image2} alt={robot.image2Alt} className='w-1/4 rounded-xl' />}
            </div>
          )
        })}
        </div>
        <h1 className='text-3xl bottom-border font-medium w-fit mb-10'>Playground</h1>
        <StrictMode>
          <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}} style={{height: '90vh'}} className='bg-d-a-main rounded-xl'>
            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
              <Physics
                broadphase="SAP" gravity={[0, -2.6, 0]}>
                <CombatScene startPosition={[0, 0.1, 0]} orbit={true} />
              </Physics>
              <Stats />
            </PerformanceMonitor>
          </Canvas>
        </StrictMode>
        <div className='mb-[100px]'></div>
      </div>
    </div>
  )
}