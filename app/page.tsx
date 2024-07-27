'use client'

import React, { Suspense } from 'react';
import css from "./css/page.module.css"
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from './types';
import { competitiveRobotList, projectList, robotList, skillsets, workExperience } from './pageData';

function Header() {
  return (
    <div className={css.header}>
      <div>
        <Link href={'/'}><p>Home</p></Link>
        <Link href={'#aboutme'} scroll={true}><p>About Me</p></Link>
        <Link href={'#robotics'}><p>Robotics</p></Link>
        <Link href={'#projects'}><p>Projects</p></Link>
      </div>
    </div>
  );
};

function VideoEntry() {
  return (
    <div className={css.entryDiv}>
      <video autoPlay loop muted playsInline preload="auto">
        <source src="/videos/introVideo5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <h1>Hi, I am Aidan Keighron</h1>
        <p>I'm a Software Developer and I make robots in my spare time</p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className={css.aboutMe}>
        <div>
          <img src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron"/>
          <p>{`I am Aidan Keighron, a highly motivated computer science student at Michigan State University, fueled by a passion for robotics, automation, and software development. I'm constantly developing new software and robotics projects. 

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
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
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
    <div className={css.combatRobots}>
      <h2 id={'robotics'}>Combat Robotics</h2>
      <h3>August 2022 - Present</h3>
      {robotList.map(robot => {
        return (
            <div key={robot.name} className={css.combatRobotsRobot}>
              <p>{robot.description}</p>
              {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} className={css.robotModel} camera={{position: [0, 0, 300]}} orthographic>
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
              {robot.imageUrl && <img src={robot.imageUrl} alt={robot.imageAlt}/>}
            </div>
        )
      })}
      <h2 style={{alignSelf: 'baseline'}}>Competitive Robotics</h2>
      <h3 style={{alignSelf: 'baseline'}}>January 2019 - May 2023</h3>
      {competitiveRobotList.map(robot => {
        return (
          <div key={robot.name} className={css.combatRobotsRobot}>
            {robot.videoUrl && 
            <video autoPlay loop muted playsInline preload="auto">
              <source src={robot.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            <p>{robot.description}</p>
            {robot.modelUrl && <Canvas frameloop='demand' dpr={[1, 2]} className={css.robotModel} camera={{position: [0, 0, 300]}} orthographic>
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
            {robot.imageUrl && <img src={robot.imageUrl} alt={robot.imageAlt}/>}
          </div>
        )
      })}
    </div>
  )
}

function Projects() {
  return (
    <div className={css.projects}>
      <h2 id={'projects'} >Projects</h2>
      <h3>October 2021 - Present</h3>
      {projectList.map(project => {
        return (
          <div key={project.name} className={css.projectsProject}>
            <p>{project.description}</p>
            {project.videoUrl !== undefined && <video autoPlay loop muted playsInline preload="auto">
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {project.imageUrl !== undefined && <img src={project.imageUrl} alt={project.imageAlt}/>}
          </div>
        )
      })}
    </div>
  )
}

function Skillsets() {
  return (
    <>
    <h1 className={css.sectionTitle}>Skills</h1>
    <div className={css.skillsets}>
      {(() => {
        return (Object.entries(skillsets).map(([name, skillset]) => {
          return (
            <div key={name} className={css.skill}>
              <h1>{name}</h1>
              {skillset.map(skill => {
                return (
                  <div key={skill.name}>
                    <h2>{skill.name}</h2>
                    {skill.experienceYears !== undefined &&
                      <p>{skill.experienceYears} Year{skill.experienceYears != 1 ? 's' : ''}</p>}
                    {skill.subList !== undefined && skill.subList.map(sub => {
                      return <p key={sub}>● {sub}</p>
                    })}
                    {skill.skill !== undefined &&
                      <p>Skill Level {skill.skill}</p>}
                  </div>
                )
              })}
            </div>
        )}));
      })()}
    </div>
    <div className={css.workExperience}>
      <h1>Work Experience</h1>
      {workExperience.map(experience => {
        return (
        <div key={experience.company}>
          <h2>{experience.company}</h2>
          <h3>{experience.description}</h3>
          <h4>{experience.duration}</h4>
          {experience.bullets.map(bullet => {
            return (<p key={bullet}>● {bullet}</p>); // TODO list
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
    <div className={css.resume}>
      <a href='/AidanKeighronResume.pdf' target="_blank">View Resume</a>
    </div>
  )
}

// function OtherProjects() {
//   return (
//     <>
//     <h1 className={css.sectionTitle}>Other Projects</h1>
//     <div className={css.otherProjects}>
//       {
//         return (
//           <div>
//             <h2></h2>
//             <img />
//             <h3></h3>
//             <h4></h4>
//             <p></p>
//           </div>
//         )
//       }
//     </div>
//     </>
//   );
// }

export default function Home() {
  // const [dpr, setDpr] = useState(1.5);

  // TODO start supporting dark/light mode from the start
  return(
    <main className='main'>
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
      <h1 id={'aboutme'} className={css.sectionTitle}>About Me</h1>
      <AboutMe />
      <div className={css.whatIDo}>
        <h1 className={css.sectionTitle}>What I Do</h1>
        <CombatRobots />
        <Projects />
      </div>
      <Skillsets />
      <Resume />
      <div style={{height: '20vh'}}></div>
    </main>
  );
}