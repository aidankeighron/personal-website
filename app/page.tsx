'use client'

import React, { Suspense } from 'react';
import Image from 'next/image';
import css from "./css/page.module.css"
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from './types';
import { projectList, robotList, skillsets, workExperience } from './pageData';

function Header() {
  return (
    <div className={css.header}>
      <h1>Aidan Keighron</h1>
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
        <source src="/videos/introVideo2.mp4" type="video/mp4" />
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
        <h1 id={'aboutme'} className={css.sectionTitle}>About Me</h1>
        <div>
          <Image src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron" width={4007/16} height={4004/16}
              quality={100} className={css.image}/>
          <p>I am Aidan Keighron a highly motivated computer science student at Michigan State University, 
            fueled by a passion for robotics, automation, and software development. I am a sophomore at 
            Michigan State University studying computer science. I love STEM, robotics, and programming, 
            outside of technology I love to read and roller blade.</p>
          {/* <p>I am Aidan Keighron a sophomore at Michigan State University studying computer science. 
          I love STEM, robotics, and programming, outside of technology I love to read and rollerblade. 
          I am very involved in competitive robotics, I am the Team Manager of a combat robotics 
          team, Bad Conflict, we compete in antweight robotics competitions. I am an alumni of FRC team 
          2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since 
          middle school and I hight recommend it to anyone even vaguely interested.</p> */}
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
      <h2 id={'robotics'} >Combat Robotics</h2>
      <h3>August 2022 - Present</h3>
      {robotList.map(robot => {
        return (
          <>
            {robot.title !== undefined && <>
              <h2 style={{alignSelf: robot.titleRightAlign ? 'last baseline' : 'baseline'}}>{robot.title}</h2>
              <h3 style={{alignSelf: robot.titleRightAlign ? 'last baseline' : 'baseline'}}>{robot.titleBody}</h3>
            </>}
            <div key={robot.name} className={css.combatRobotsRobot}>
              <p>{robot.description}</p>
              <Canvas frameloop='demand' dpr={[1, 2]} className={css.robotModel} camera={{position: [0, 0, 300]}} orthographic>
                <Suspense fallback={null}>
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
              </Canvas>
            </div>
          </>
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
                      <p>{skill.experienceYears} Year{skill.experienceYears != 1 ? 's' : ''} of experience</p>}
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
          <p>{experience.bullets}</p>
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