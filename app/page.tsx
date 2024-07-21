'use client'

import React from 'react';
import Image from 'next/image';
import css from "./css/page.module.css"
import Link from 'next/link';

function Header() {
  return (
    <div className={css.header}>
      <h1>Aidan Keighron</h1>
      <div>
        <Link href={'/'}><p>Home</p></Link>
        <Link href={'/currentprojects'}><p>Current Projects</p></Link>
        <Link href={'/currentrobots'}><p>Current Robots</p></Link>
        <Link href={'#aboutme'} scroll={true}><p>About Me</p></Link>
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
        <h1 id={'aboutme'}>About Me</h1>
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

type Robot = {
  name: string,
  description: string,
  imageSrc: string,
  imageAlt: string,
}

const robotList: Robot[] = [
  {
    name: "Bad Conflict",
    description: "I am the Team Manager of a combat robotics team, Bad Conflict, we compete in ant-weight robotics competitions. I am an alumni of FRC team 2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since middle school and I height recommend it to anyone even vaguely interested.",
    imageSrc: "/images/aidan_profile.jpg",
    imageAlt: "Robot Photo",
  },
  {
    name: "Horizon",
    description: "My current robot is Horizon a horizontal spinner. It has 1/8 in Carbon Fiber top and bottom plates for armor and a TPU (3D printable rubber) chassis to absorb damage. With a 101g AR500 weapon spinning, theoretically, at 18000 RPM. That is a tip speed of 350 MPH, packing quite a punch.",
    imageSrc: "/images/aidan_profile.jpg",
    imageAlt: "Robot Photo",
  },
]

function CombatRobots() {
  return (
    <div className={css.combatRobots}>
      {robotList.map(robot => {
        return (
          <div key={robot.name}>
            <Image src={robot.imageSrc} alt={robot.imageAlt} quality={100} className={css.image}/>
            <p>{robot.description}</p>
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
      <div style={{height: '40vh'}}></div>
    </main>
  );
}