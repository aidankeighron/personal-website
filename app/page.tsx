'use client'

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from './types';
import { competitiveRobotList, projectList, combatRobotList, skillsets, workExperience, otherProjects } from './pageData';

function Header() {
  return (
    <div className='absolute flex z-10 space-x-4 w-full items-end justify-end mr-96 p-10'>
        <Link href={'/'}><p className='header-link'>Home</p></Link>
        <Link href={'#aboutme'} scroll={true}><p className='header-link'>About Me</p></Link>
        <Link href={'#robotics'} scroll={true}><p className='header-link'>Robotics</p></Link>
        <Link href={'#projects'} scroll={true}><p className='header-link'>Projects</p></Link>
    </div>
  );
};

function VideoEntry() {
  return (
    <div className='relative'>
      {/* TODO move up so width is max */}
      <video autoPlay loop muted playsInline preload="auto" className='aspect-video max-w-max h-screen'>
        <source src="/videos/intro_video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='bg-a-main dark:bg-d-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-4 rounded-md border-b-4 border-third dark:border-d-third shadow-xl'>
        <h1 className='text-second dark:text-d-second text-4xl font-bold text-center'>Hi, I am Aidan Keighron</h1>
        <p className='text-second dark:text-d-second text-xl font-medium text-center'>I'm a Software Developer and I make robots in my spare time</p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className='flex items-center flex-col'>
        <div className='max-w-[1500px] bg-a-third dark:bg-d-third flex flex-row items-center rounded-2xl p-4 shadow-xl'>
          <img className='w-1/3 rounded-xl m-4' src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron"/>
          <p className='text-second dark:text-d-second text-2xl whitespace-pre-line mr-4'>{`I am Aidan Keighron, a highly motivated computer science student at Michigan State University, fueled by a passion for robotics, automation, and software development. I'm constantly developing new software and robotics projects. 

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
    <div className='flex flex-col items-end px-20'>
      <h2 id={'robotics'} className='what-i-do-title'>Combat Robotics</h2>
      <h3 className='what-i-do-date'>August 2022 - Present</h3>
      {combatRobotList.map(robot => {
        return (
            <div key={robot.name} className='robot-container'>
              <div className='robot-container-text'>
                <p className='robot-text'>{robot.description}</p>
                {<div className='robot-learn-more'>
                  <Link href={robot.pageUrl ?? ""}><p>Learn More</p></Link>
                </div>}
              </div>
              {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} className='robot-model' camera={{position: [0, 0, 300]}} orthographic>
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
      {competitiveRobotList.map(robot => {
        return (
          <div key={robot.name} className='robot-container'>
            {robot.videoUrl && 
            <video autoPlay loop muted playsInline preload="auto" className='robot-video'>
              <source src={robot.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            <div className='robot-container-text'>
              <p className='robot-text'>{robot.description}</p>
              {<div className='robot-learn-more'>
                <Link href={robot.pageUrl ?? ""}><p>Learn More</p></Link>
              </div>}
            </div>
            {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} className='robot-model' camera={{position: [0, 0, 300]}} orthographic>
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
    <div className='px-20'>
      <h2 id={'projects'} className='what-i-do-title'>Projects</h2>
      <h3 className='what-i-do-date'>October 2021 - Present</h3>
      {projectList.map(project => {
        return (
          <div className='robot-container h-[600px]' key={project.name}>
            <p className='robot-text'>{project.description}</p>
            {project.videoUrl !== undefined && <video autoPlay loop muted playsInline preload="auto" className='robot-video w-1/2 object-none m-0 mr-10'>
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {project.imageUrl !== undefined && <img src={project.imageUrl} alt={project.imageAlt} className='robot-image object-contain w-1/2'/>}
          </div>
        )
      })}
    </div>
  )
}

function Skillsets() {
  return (
    <>
    <div className='w-[80%] flex flex-row justify-between mb-10 dark:text-main text-d-main'>
      {(() => {
        return (Object.entries(skillsets).map(([name, skillset]) => {
          return (
            <div key={name} className='p-4 mt-5'>
              <h1 className='text-5xl font-bold mb-6'>{name}</h1>
              {skillset.map(skill => {
                return (
                  <div className='mb-5 font-medium' key={skill.name}>
                    <h2 className='text-2xl'>{skill.name}</h2>
                    {skill.experienceYears !== undefined &&
                      <p className='text-xl text-d-a-second'>{skill.experienceYears} Year{skill.experienceYears != 1 ? 's' : ''}</p>}
                    {skill.subList !== undefined && skill.subList.map(sub => {
                      return <p key={sub} className='text-xl text-d-a-second'>● {sub}</p>
                    })}
                    {skill.skill !== undefined &&
                      <p className='text-xl text-d-a-second'>Skill Level {skill.skill}</p>}
                  </div>
                )
              })}
            </div>
        )}));
      })()}
    </div>
    <div className='w-[80%] p-4 mb-10 dark:text-main text-d-main'>
      <h1 className='text-5xl font-bold mb-6'>Work Experience</h1>
      {workExperience.map(experience => {
        return (
        <div key={experience.company}>
          <h2 className='text-4xl font-bold bottom-border w-fit mb-3'>{experience.company}</h2>
          <h3 className='text-base mb-1 text-d-a-second'>{experience.description}</h3>
          <h4 className='text-base mb-4 text-d-a-second'>{experience.duration}</h4>
          {experience.bullets.map(bullet => {
            return (<p key={bullet} className='text-xl'>● {bullet}</p>); // TODO list
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
    <div className='bg-d-third w-full h-[120px] mb-20 dark:text-main text-d-main'>
      <a href='/AidanKeighronResume.pdf' target="_blank" className='text-5xl flex items-center justify-center w-full h-full'>View Resume</a>
    </div>
  )
}

function OtherProjects() {
  return (
    <div className='grid grid-cols-3 m-10 gap-10'>
      {otherProjects.map(project => {
        return (
          <div key={project.name} className='bg-a-main dark:bg-second p-8 rounded-xl shadow-lg'>
            <p className='text-3xl font-semibold mb-2 bottom-border w-fit'>{project.name}</p>
            <p className='text-base dark:text-d-a-second mb-3'>{project.date}</p>
            <p className='text-lg'>{project.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  // const [dpr, setDpr] = useState(1.5);

  // TODO start supporting dark/light mode from the start
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
      <div style={{height: '20vh'}}></div>
    </main>
  );
}