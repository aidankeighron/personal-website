'use client'

import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from './types';
import { competitiveRobotList, projectList, combatRobotList, skillsets, workExperience, otherProjects } from './pageData';
import { motion } from 'framer-motion';

function Header() {
  return (
    <div className='absolute flex z-10 space-x-4 w-full items-end justify-end mr-[2.5%] p-10'>
        <Link href={'#aboutme'} scroll={true}><p className='header-link'>About Me</p></Link>
        <Link href={'#robotics'} scroll={true}><p className='header-link'>Robotics</p></Link>
        <Link href={'#projects'} scroll={true}><p className='header-link'>Projects</p></Link>
    </div>
  );
};

function VideoEntry() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoTopOffset, setVideoTopOffset] = useState<number>(0);

  useLayoutEffect(() => {
    if (videoRef.current) {
      // console.log(videoRef.current);
      // console.log(videoRef.current.offsetWidth);
      console.log(videoRef.current.offsetHeight);
      // console.log(window.innerWidth)
      console.log(window.innerHeight)
      // TODO change this to a ratio of the width
      if (videoRef.current.offsetHeight > window.innerHeight) {
        console.log("over by", videoRef.current.offsetHeight-window.innerHeight);
        setVideoTopOffset(videoRef.current.offsetHeight-window.innerHeight);
      }
    }
  })

  return (
    <div className='relative'>
      {/* TODO move up so width is max */}
      {/* <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className='aspect-video max-w-max h-screen'> */}
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className='aspect-video' style={{marginTop: `-${videoTopOffset}px`}}>
        <source src="/videos/intro_video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='bg-a-main dark:bg-d-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-4 rounded-md border-b-4 border-third dark:border-d-third shadow-xl'>
        <h1 className='text-second dark:text-d-second text-4xl font-bold text-center'>Hi, I am Aidan Keighron</h1>
        <p className='text-second dark:text-d-second text-base font-medium text-center'>I'm a Software Developer and I make robots in my spare time</p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className='flex items-center flex-col'>
        <div className='max-w-[1500px] mx-[5%] bg-a-third dark:bg-d-third flex flex-row items-center rounded-2xl p-4 shadow-xl'>
          <img className='w-1/3 rounded-xl m-4' src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron"/>
          <p className='text-second dark:text-d-second text-xl whitespace-pre-line mr-4'>{`I am Aidan Keighron, a highly motivated computer science student at Michigan State University, fueled by a passion for robotics, automation, and software development. I'm constantly developing new software and robotics projects. 

I Co-Founded the combat robotics team Bad Conflict, where we build robots to compete in antweight combat robotics competitions. I created a startup called Alchemy, where I am making an all-in-one task management software that aims to reduce the time it takes to plan out your day.

Outside of technology, I love to read and roller blade.`}</p>
        </div>
    </div>
  );
}

type ShowModelProps = {
  url: string,
  scale: number,
  position: Position,
  rotation: Rotation,
}

function CanvasLoader() {
  const { progress } = useProgress();

  // TODO loading bar
  return (
    <Html as='div' center
      style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <span className='canvas-loader'></span>
      <p style={{fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 40}}>{progress.toFixed(2)}%</p>
    </Html>
  );
};

function ShowModel({url, scale, position, rotation}: ShowModelProps) {
  const model: any = useLoader(GLTFLoader, url).scene;

  return (
    <>
      <ambientLight />
      <mesh>
        <primitive
          object={model} 
          scale={scale}
          rotation={rotation} 
          position={position}
        />
      </mesh>
    </>
  );
};

function CombatRobots() {
  return (
    <div className='flex flex-col items-end mx-[5%]'>
      <h2 id={'robotics'} className='what-i-do-title'>Combat Robotics</h2>
      <h3 className='what-i-do-date'>August 2022 - Present</h3>
      <div className='robot-learn-more mb-[2.5%]'>
        <Link href={"/currentrobots"}><p>Learn More</p></Link>
      </div>
      {combatRobotList.map(robot => {
        return (
            <div key={robot.name} className='robot-container'>
              <p className='robot-text'>{robot.description}</p>
              {/* TODO clipping */}
              {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} className='robot-model' camera={{position: [0, 0, 500]}} orthographic>
                <Suspense fallback={<CanvasLoader />}>
                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    target={[0,0,0]}
                    position={[0,0,0]}
                  />
                  <ShowModel url={robot.modelUrl} scale={robot.scale}
                    position={robot.position} rotation={robot.rotation} />
                </Suspense>
                <Preload all />
              </Canvas>}
              {robot.imageUrl && <img src={robot.imageUrl} alt={robot.imageAlt} className='robot-image'/>}
            </div>
        )
      })}
      <h2 className='what-i-do-title self-baseline'>Competitive Robotics</h2>
      <h3 className='what-i-do-date  self-baseline'>January 2019 - May 2023</h3>
      <div className='robot-learn-more self-baseline mb-20'>
        <Link href={"/currentrobots"}><p>Learn More</p></Link>
      </div>
      {competitiveRobotList.map(robot => {
        return (
          <div key={robot.name} className='robot-container'>
            {robot.videoUrl && 
            <video autoPlay loop muted playsInline preload="auto" className='robot-video'>
              <source src={robot.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            <p className='robot-text'>{robot.description}</p>
            {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} camera={{position: [0, 0, 500]}} orthographic
                                        className='robot-model'>
              <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  target={[0,0,0]}
                  position={[0,0,0]}
                />
                <ShowModel url={robot.modelUrl} scale={robot.scale}
                  position={robot.position} rotation={robot.rotation} />
              </Suspense>
              <Preload all />
            </Canvas>}
            {/* TODO use <Image /> for better optimization */}
            {robot.imageUrl && <img src={robot.imageUrl} alt={robot.imageAlt} className='robot-image'/>}
          </div>
        )
      })}
    </div>
  )
}

function Projects() {
  return (
    <div className='px-20 flex flex-col'>
      <h2 id={'projects'} className='what-i-do-title self-end'>Projects</h2>
      <h3 className='what-i-do-date self-end'>October 2021 - Present</h3>
      {projectList.map(project => {
        return (
          <div className='robot-container min-h-[800px]' key={project.name}>
            <p className='robot-text'>{project.description}</p>
            {project.videoUrl !== undefined && <video autoPlay loop muted playsInline preload="auto" className='robot-video basis-1/2 w-[45%] object-none'>
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {project.imageUrl !== undefined && <img src={project.imageUrl} alt={project.imageAlt} className='robot-image object-contain basis-1/2 w-[45%]'/>}
            {project.page && <div className='robot-learn-more mb-20 self-end'>
              <Link href={project.page}><p>Learn More</p></Link>
            </div>}
          </div>
        )
      })}
    </div>
  )
}

function Skillsets() {
  return (
    <>
    <div className='mx-[5%] flex flex-wrap flex-row justify-around mb-10 dark:text-main text-d-main w-[90%]'>
      {(() => {
        return (Object.entries(skillsets).map(([name, skillset]) => {
          return (
            <div key={name} className='p-4 mt-5'>
              <h1 className='w-min text-3xl font-bold mb-6'>{name}</h1>
              {skillset.map(skill => {
                return (
                  <div className='mb-5 font-medium' key={skill.name}>
                    <h2 className='text-xl'>{skill.name}</h2>
                    {skill.experienceYears !== undefined &&
                      <p className='text-sm text-d-a-second'>{skill.experienceYears} Year{skill.experienceYears != 1 ? 's' : ''}</p>}
                    {skill.subList !== undefined && skill.subList.map(sub => {
                      return <p key={sub} className='text-sm text-d-a-second'>● {sub}</p>
                    })}
                    {skill.skill !== undefined &&
                      <p className='text-sm text-d-a-second mb-1'>Skill Level {skill.skill}</p>}
                  </div>
                )
              })}
            </div>
        )}));
      })()}
    </div>
    <div className='mx-[15%] mb-10 dark:text-main text-d-main'>
      <h1 className='text-4xl font-bold mb-6'>Work Experience</h1>
      {workExperience.map(experience => {
        return (
        <div key={experience.company}>
          <h2 className='text-2xl font-bold bottom-border w-fit mb-3'>{experience.company}</h2>
          <h3 className='text-sm mb-1 text-d-a-second'>{experience.description}</h3>
          <h4 className='text-sm mb-4 text-d-a-second'>{experience.duration}</h4>
          {experience.bullets.map(bullet => {
            return (<p key={bullet} className='text-base mb-2'>● {bullet}</p>); // TODO list
          })}
        </div>
        );
      })}
    </div>
    </>
  );
}

function Resume() {
  return (
    <div className='bg-d-third w-full h-[120px] dark:text-main text-d-main'>
      <a href='/AidanKeighronResume.pdf' target="_blank" className='text-4xl flex items-center justify-center w-full h-full'>View Resume</a>
    </div>
  )
}

function OtherProjects() {
  return (
    <div className='flex flex-wrap m-10 justify-around gap-y-10'>
      {otherProjects.map(project => {
        return (
          <motion.div key={project.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className='bg-a-main dark:bg-second p-8 rounded-xl shadow-lg h-full flex flex-col w-[400px]'>
            <p className='text-3xl font-semibold mb-2 bottom-border w-fit'>{project.name}</p>
            <p className='text-sm dark:text-d-a-second mb-3'>{project.date}</p>
            <p className='text-base'>{project.description}</p>
            <div className='flex flex-wrap gap-3 mt-4'>
              {project.tags.length != 0 && project.tags.map(tag => {
                return (
                  <p key={tag} className='text-sm bg-a-main w-fit px-2 py-1 rounded-2xl'>{tag}</p>
                );
              })}
            </div>
            {project.page && <Link href={project.page} className='mt-auto'><p className='robot-learn-more'>Learn More</p></Link>}
          </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Home() {
  // const [dpr, setDpr] = useState(1.5);

  return(
    <main className='flex flex-col items-center'>
      {/* <StrictMode>
          <Canvas frameloop="demand" dpr={dpr} performance={{current: 1, min: 0.1, max: 1, debounce: 200}}>
            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
              <Physics
                broadphase="SAP" gravity={[0, -2.6, 0]}>
                <Scene startPosition={[0, 0, 0]} orbit={false} />
              </Physics>
              <Stats />
            </PerformanceMonitor>
          </Canvas>
        </StrictMode> */}
      <Header />
      <VideoEntry />
      <h1 id={'aboutme'} className='section-title'>About Me</h1>
      <AboutMe />
      <h1 className='section-title'>What I Do</h1>
      <CombatRobots />
      <Projects />
      <h1 className='section-title'>Skills</h1>
      <Skillsets />
      <Resume />
      <h1 className='section-title'>Other Projects</h1>
      <OtherProjects />
      <div style={{height: '10vh'}}></div>
    </main>
  );
}