'use client'

import Link from 'next/link';
import React, { StrictMode, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { CombatScene } from '../components/physics/CombatScene';
import Image from 'next/image';
import BackToTop from '../components/BackToTop';

const imagesAndVideos = {
  horizon: {
    image: "/images/horizon_1.jpg",
    imageDim: {w: 3000, h: 4000},
    imageAlt: "Horizon, combat robot",
    video: "/videos/horizon_demo.mp4",
    videoDim: {w: 1920, h: 1080},
  },
  twofold: {
    image: "/images/twofold_1.jpg",
    imageDim: {w: 3000, h: 4000},
    imageAlt: "Twofold after a competition",
    image1: "/images/twofold_2.jpg",
    imageDim1: {w: 3000, h: 4000},
    image1Alt: "Twofold before a competition",
  }
}

const css = {
  robotTitle: "text-xl md:text-3xl mr-5 bottom-border w-fit",
  robotTitleDiv: "flex flex-row items-end mb-5",
  robotWL: "text-base md:text-lg text-second dark:text-d-second",
  robotDesc: "text-base md:text-lg mb-5",
  robotInfoDiv: "self-center mx-12 w-[80%] xl:w-[45%]",
  robotFactsOuterDiv: "mb-10",
  robotFactsDiv: "flex flex-row mb-1",
  robotFactsKey: "text-base md:text-lg mr-2",
  robotFactsValue: "text-base md:text-lg font-light dark:font-semibold text-second dark:text-a-main",
  robotDiv: "mb-16 flex flex-col xl:flex-row justify-between",
  robotImage: "robot-image w-1/4 rounded-xl hidden xl:block",
  robotHiddenDiv: "xl:hidden flex flex-row justify-center",
  robotHiddenImage: "robot-image mr-[2.5%] w-[45%] rounded-xl xl:hidden",
  robotVideo: "robot-video rounded-xl w-1/4 hidden xl:block",
  robotHiddenVideo: "robot-video rounded-xl ml-[2.5%] w-[45%] xl:hidden",
}

export default function CurrentRobots() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <>
      <Link href='/'><p className='header-link w-fit fixed z-10 items-end justify-end top-10 left-20'>Home</p></Link>
      <div className='flex flex-col items-center pt-40'>
        <title>Current Robots | Aidan Keighron</title>
        {/* TODO rename */}
        <h1 className='text-3xl md:text-5xl font-semibold bottom-border mb-2'>Combat Robotics</h1>
        <h1 className='text-sm text-second dark:text-a-main mb-10'>* Check out the demo below</h1>

        <div className='flex w-[90%] flex-col'>
          <h2 className='text-xl md:text-3xl bottom-border font-medium w-fit mb-10'>Combat Robots - Antweight (1lb)</h2>
          {/* TODO Image of robot */}
          <div className='flex flex-col odd:flex-col-reverse'>
            <div className={css.robotDiv}>
              <Image width={imagesAndVideos.horizon.imageDim.w} height={imagesAndVideos.horizon.imageDim.h} src={imagesAndVideos.horizon.image} 
                alt={imagesAndVideos.horizon.imageAlt} className={css.robotImage} />
              <div className={css.robotInfoDiv}>
                <div className={css.robotTitleDiv}>
                  <h3 className={css.robotTitle}>Horizon</h3>
                  <h4 className={css.robotWL}>W: 1, L: 3</h4>
                </div>
                <p className={css.robotDesc}>{`Horizon is a horizontal spinner with a 100g weapon that spins at ~18000 RPM. 
It has a TPU chassis to absorb impact and Carbon Fiber top and bottom plates for rigidity. It's weapon is AR500 Steel and has 
a tip speed of 350 MPH.`}</p>
                <div className={css.robotFactsOuterDiv}>
                  {Object.entries({
                    "Weight": "450g",
                    "Weapon Hit Force": "a lot",
                    "Dimensions": "6.6in x 4.9in x 1.5in",
                    "Number of Wires": "15"
                  }).map(([key, value]) => {
                    return (
                      <div key={key} className={css.robotFactsDiv}>
                        <p className={css.robotFactsKey}>{key}:</p>
                        <p className={css.robotFactsValue}>{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <video autoPlay loop muted playsInline preload="none" width={imagesAndVideos.horizon.videoDim.w} height={imagesAndVideos.horizon.videoDim.h}
                className={css.robotVideo}>
                <source src={imagesAndVideos.horizon.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className={css.robotHiddenDiv}>
                <Image width={imagesAndVideos.horizon.imageDim.w} height={imagesAndVideos.horizon.imageDim.h} src={imagesAndVideos.horizon.image} 
                  alt={imagesAndVideos.horizon.imageAlt} className={css.robotHiddenImage} />
                <video autoPlay loop muted playsInline preload="none" width={imagesAndVideos.horizon.videoDim.w} height={imagesAndVideos.horizon.videoDim.h}
                  className={css.robotHiddenVideo}>
                  <source src={imagesAndVideos.horizon.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className={css.robotDiv}>
              <Image width={imagesAndVideos.twofold.imageDim.w} height={imagesAndVideos.twofold.imageDim.h} src={imagesAndVideos.twofold.image} 
                alt={imagesAndVideos.twofold.imageAlt} className={css.robotImage} />
              <div className={css.robotInfoDiv}>
                <div className={css.robotTitleDiv}>
                  <h3 className={css.robotTitle}>Twofold</h3>
                  <h4 className={css.robotWL}>W: 5, L: 7</h4>
                </div>
                <p className={css.robotDesc}>{`Twofold is a double wedge designed to get under opponents and push them around. The double wedge 
design allows Twofold to take a lot more damage as it comes with a spare ready to go. Fun fact: Twofold is so low to the ground that some 
weapons are unable to do any damage.`}</p>
                <div className={css.robotFactsOuterDiv}>
                  {Object.entries({
                      "Weight": "0.5lb",
                      "Weapon Hit Force": "0",
                      "Dimensions": "7in x 7.2in x 1in",
                      "Ground Effect": "All of it"
                  }).map(([key, value]) => {
                    return (
                      <div key={key} className={css.robotFactsDiv}>
                        <p className={css.robotFactsKey}>{key}:</p>
                        <p className={css.robotFactsValue}>{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Image width={imagesAndVideos.twofold.imageDim1.w} height={imagesAndVideos.twofold.imageDim1.h} src={imagesAndVideos.twofold.image1} 
                alt={imagesAndVideos.twofold.image1Alt} className={css.robotImage} />
              <div className={css.robotHiddenDiv}>
                <Image width={imagesAndVideos.twofold.imageDim.w} height={imagesAndVideos.twofold.imageDim.h} src={imagesAndVideos.twofold.image} 
                  alt={imagesAndVideos.twofold.imageAlt} className={css.robotHiddenImage} />
                <Image width={imagesAndVideos.twofold.imageDim1.w} height={imagesAndVideos.twofold.imageDim1.h} src={imagesAndVideos.twofold.image1} 
                  alt={imagesAndVideos.twofold.image1Alt} className={css.robotHiddenImage} />
              </div>
            </div>
          </div>
          <h1 className='text-3xl bottom-border font-medium w-fit mb-2'>Playground</h1>
          <p className='text-second dark:text-d-second text-base mb-10'>* W A S D to move | R to reset, Controls on mobile are a work in progress</p>
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
          <div className='mb-[5vh]'></div>
        </div>
      </div>
      <BackToTop />
    </>
  )
}