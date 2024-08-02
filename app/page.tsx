'use client' // TODO remove to utalize server side rendering

import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from './types';
import { competitiveRobotList, projectList, combatRobotList, skillsets, workExperience, otherProjects } from './pageData';
import { domAnimation, LazyMotion, m, MotionConfig, useScroll } from 'framer-motion';
import Image from 'next/image';
import aboutMeImage from '../public/images/aidan_profile.jpg';

function Header() {
  const variants = {
    visible: {
      opacity: 1,
      transition: {when: "beforeChildren", staggerChildren: 0.25}
    },
    hidden: {
      opacity: 0,
      transition: {when: "afterChildren"}
    },
  }

  const item = {
    visible: {
      opacity: 1,
      scale: 1.0,
      transition: {ease: [0, 0.71, 0.2, 1.01]}
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
      
    },
  }

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className='absolute flex z-10 space-x-4 w-full items-end justify-end mr-[2.5%] p-10 invisible md:visible'
    >
      <Link href={'#aboutme'} scroll={true}>
        <m.p className='header-link'
          variants={item}
        >
          About Me
        </m.p>
      </Link>
      <Link href={'#robotics'} scroll={true}>
        <m.p className='header-link'
          variants={item}
        >
          Robotics
        </m.p>
      </Link>
      <Link href={'#projects'} scroll={true}>
        <m.p className='header-link'
          variants={item}
        >
          Projects
        </m.p>
      </Link>
      <Link href={'#skills'} scroll={true}>
        <m.p className='header-link'
          variants={item}
        >
          Skills
        </m.p>
      </Link>
    </m.div>
  );
};

function VideoEntry() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoTopOffset, setVideoTopOffset] = useState<number>(0);

  useLayoutEffect(() => {
    if (videoRef.current) {
      // TODO change this to a ratio of the width
      if (videoRef.current.offsetHeight > window.innerHeight) {
        setVideoTopOffset(videoRef.current.offsetHeight-window.innerHeight);
      }
    }
  })

  return (
    <div className='relative'>
      {/* TODO loading issue on laptop (use dev tools to throttle internet) */}
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className='aspect-video' style={{marginTop: `-${videoTopOffset}px`}}>
        <source src="/videos/intro_video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <m.div
        initial={{opacity: 0, y: '25%', x: '-50%'}}
        whileInView={{opacity: 1, y: '0', x: '-50%', transition: {duration: 1, ease: 'easeOut'}}}
        viewport={{once: true, amount: 'some', margin: '5%'}}
        className='bg-a-main dark:bg-d-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-4 rounded-md border-b-4 border-third dark:border-d-third shadow-xl'
      >
        <h1 className='text-second dark:text-d-second text-xl md:text-2xl lg:text-4xl font-bold text-center whitespace-nowrap'>Hi, I am Aidan Keighron</h1>
        <p className='text-second dark:text-d-second text-xs md:text-sm lg:text-base font-medium text-center'>I'm a Software Developer and I make robots in my spare time</p>
      </m.div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className='flex items-center flex-col'>
        <div className='max-w-[1500px] mx-[5%] bg-a-third dark:bg-d-third flex flex-row items-center rounded-2xl p-4 shadow-xl'>
          <m.div
            initial={{opacity: 0, scale: 0.7}}
            whileInView={{opacity: 1, scale: 1, transition: {
              duration: 1,
              ease: 'easeOut'
            }}}            
            viewport={{once: true, amount: 'some'}}
            className='w-1/3 m-4'
          >
          <Image placeholder='blur' blurDataURL='/images/aidan_profile.jpg' priority
                src={aboutMeImage} alt="Picture of Aidan Keighron" className='h-max w-max rounded-xl' />
          {/* <Image width={0} height={0} sizes="100vw" placeholder='blur' blurDataURL='/images/aidan_profile.jpg'
                src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron" className='h-max w-max rounded-xl' /> */}
          </m.div>
          <p className='text-second dark:text-d-second w-2/3 text-xl whitespace-pre-line mr-4'>{`I am Aidan Keighron, a highly motivated computer science student at Michigan State University, fueled by a passion for robotics, automation, and software development. I'm constantly developing new software and robotics projects. 

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
      <m.h2
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}} 
        id={'robotics'} className='what-i-do-title'
      >
        Combat Robotics
      </m.h2>
      <m.h3 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='what-i-do-date'>
          August 2022 - Present
      </m.h3>
      <m.div 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='robot-learn-more mb-[2.5%]'
      >
        <Link href={"/currentrobots"}><p>Learn More</p></Link>
      </m.div>
      {combatRobotList.map((robot, index) => {
        return (
            <div key={robot.name} className='robot-container'>
              <m.p
                initial={{opacity: 0.5, y: '25%'}}
                whileInView={{opacity: 1, y: 0, transition: {
                  duration: 1,
                  delay: 0.1,
                  ease: 'easeOut'
                }}}            
                viewport={{once: true, amount: 'some'}}
                className='robot-text'
              >
                {robot.description}
              </m.p>
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
      <m.h2 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='what-i-do-title self-baseline'
      >
        Competitive Robotics
      </m.h2>
      <m.h3 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='what-i-do-date  self-baseline'
      >
        January 2019 - May 2023
      </m.h3>
      <m.div 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='robot-learn-more self-baseline mb-20'
      >
        <Link href={"/currentrobots"}><p>Learn More</p></Link>
      </m.div>
      {competitiveRobotList.map((robot, index) => {
        return (
          <div key={robot.name} className='robot-container'>
            {robot.videoUrl && 
            <video autoPlay loop muted playsInline preload="auto" className='robot-video'>
              <source src={robot.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            <m.p 
              initial={{opacity: 0.5, y: '25%'}}
              whileInView={{opacity: 1, y: 0, transition: {
                duration: 1,
                delay: 0.1,
                ease: 'easeOut'
              }}}            
              viewport={{once: true, amount: 'some'}}
              className='robot-text'
            >
              {robot.description}
            </m.p>
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
      <m.h2 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        id={'projects'} className='what-i-do-title self-end'
      >
        Projects
      </m.h2>
      <m.h3 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='what-i-do-date self-end'
      >
        October 2021 - Present
      </m.h3>
      {projectList.map((project, index) => {
        return (
          <div className='robot-container min-h-[800px]' key={project.name}>
            <m.p 
              initial={{opacity: 0.5, y: '25%'}}
              whileInView={{opacity: 1, y: 0, transition: {
                duration: 1,
                delay: 0.1,
                ease: 'easeOut'
              }}}            
              viewport={{once: true, amount: 'some'}}
              className='robot-text'
            >
              {project.description}
            </m.p>
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
  const variants = {
    visible: {
      opacity: 1,
      transition: {when: "beforeChildren", staggerChildren: 0.5}
    },
    hidden: {
      opacity: 0,
      transition: {when: "afterChildren"}
    },
  }

  const item = {
    visible: {
      opacity: 1,
      x: '0',
      transition: {ease: 'easeOut', duration: 1}
    },
    hidden: {
      opacity: 0,
      x: '-25%',
    },
  }
  
  return (
    <>
    <m.div 
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 'some'}}
      variants={variants}
      className='mx-[5%] flex flex-wrap flex-row sm:justify-around mb-10 dark:text-main text-d-main w-[90%]'
    >
      {(() => {
        return (Object.entries(skillsets).map(([name, skillset]) => {
          return (
            <m.div 
              variants={item}
              key={name} className='p-4 mt-5'
            >
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
            </m.div>
        )}));
      })()}
    </m.div>
    <m.div 
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 'some'}}
      variants={variants}
      className='mx-[15%] mb-10 dark:text-main text-d-main'
    >
      <h1 className='text-4xl font-bold mb-6'>Work Experience</h1>
      {workExperience.map(experience => {
        return (
        <m.div 
          variants={item}
          key={experience.company}
        >
          <h2 className='text-2xl font-bold bottom-border w-fit mb-3'>{experience.company}</h2>
          <h3 className='text-sm mb-1 text-d-a-second'>{experience.description}</h3>
          <h4 className='text-sm mb-4 text-d-a-second'>{experience.duration}</h4>
          {experience.bullets.map(bullet => {
            return (<p key={bullet} className='text-base mb-2'>● {bullet}</p>);
          })}
        </m.div>
        );
      })}
    </m.div>
    </>
  );
}

function Resume() {
  return (
    <m.div
      initial={{ width: 'min-content', borderRadius: '36px' }}
      whileInView={{ width: '100%', borderRadius: '0px' }}
      viewport={{once: true, amount: 'some'}}
      transition={{ease: 'easeInOut', duration: 1}}
      className='bg-d-third h-[120px] dark:text-main text-d-main' // w-full
    >
      <a href='/AidanKeighronResume.pdf' target="_blank" className='text-4xl flex items-center justify-center h-full mx-[5vw] whitespace-nowrap'>View Resume</a>
    </m.div>
  )
}

function OtherProjects() {
  return (
    <div className='flex flex-wrap m-10 justify-around gap-y-10'>
      {otherProjects.map(project => {
        return (
          <m.div
            initial={{opacity: 0, y: '25%'}}
            whileInView={{opacity: 1, y: '0', transition: {duration: 1, ease: 'easeOut'}}}
            viewport={{once: true, amount: 'some', margin: '5%'}}
            key={project.name}
            className='bg-a-main dark:bg-second p-8 rounded-xl shadow-lg h-full flex flex-col max-[400px]:w-[300px] w-[400px]'
          >
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
          </m.div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  // const [dpr, setDpr] = useState(1.5);

  return(
    <main className='flex flex-col items-center'>
      <MotionConfig reducedMotion="user">
      <LazyMotion strict features={domAnimation}>
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
      <m.div
        className="fixed top-0 left-0 right-0 h-[10px] bg-third dark:bg-d-third origin-[0%] z-10"
        style={{ scaleX: scrollYProgress }}
      />
      <Header />
      <VideoEntry />
      <m.h1
        initial={{opacity: 0, x: '-10vh'}}
        whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
        viewport={{once: true, amount: 'some', margin: '5%'}}
        id={'aboutme'} className='section-title'
      >
        About Me
      </m.h1>
      {/* <h1 id={'aboutme'} className='section-title'>About Me</h1> */}
      <AboutMe />
      <m.h1
        initial={{opacity: 0, x: '-10vh'}}
        whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
        viewport={{once: true, amount: 'some', margin: '5%'}}
        className='section-title'
      >
        What I Do
      </m.h1>
      {/* <h1 className='section-title'>What I Do</h1> */}
      <CombatRobots />
      <Projects />
      <m.h1
        initial={{opacity: 0, x: '-10vh'}}
        whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
        viewport={{once: true, amount: 'some', margin: '5%'}}
        id={'skills'} className='section-title'
      >
        Skills
      </m.h1>        
      {/* <h1 className='section-title'>Skills</h1> */}
      <Skillsets />
      <Resume />
      <m.h1
        initial={{opacity: 0, x: '-10vh'}}
        whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
        viewport={{once: true, amount: 'some', margin: '5%'}}
        className='section-title'
      >
        Other Projects
      </m.h1>
      {/* <h1 className='section-title'>Other Projects</h1> */}
      <OtherProjects />
      <div style={{height: '10vh'}}></div>
      </LazyMotion>
      </MotionConfig>
    </main>
  );
}