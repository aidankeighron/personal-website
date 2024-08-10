"use client" // TODO remove

import { useProgress, OrbitControls, Preload, Html } from "@react-three/drei";
import { useLoader, Canvas } from "@react-three/fiber";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Position, Rotation } from "../types";
import robot2541Image from '../../public/images/2451-2023-1.png';

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
  
function LoadModel({url, scale, position, rotation}: ShowModelProps) {
    const model: any = useLoader(GLTFLoader, url).scene;
    return (        
      <mesh>
        <primitive
          object={model} 
          scale={scale}
          rotation={rotation} 
          position={position}
        />
      </mesh>
    );
}
  
function ShowModel({url, scale, position, rotation}: ShowModelProps) {
    // TODO clipping
    return (  
      <Canvas frameloop='demand' dpr={[1, 2]} camera={{position: [0, 0, 500]}} orthographic
        className='robot-model'>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            target={[0,0,0]}
            position={[0,0,0]}
          />
          <ambientLight />
          <LoadModel url={url} scale={scale} position={position} rotation={rotation} />
        </Suspense>
        <Preload all />
    </Canvas>
    );
};
  
type WhatIDoProps = {
    title: string,
    date: string,
    learnMoreLink?: string,
}
  
function WhatIDoHeader({title, date, learnMoreLink}: WhatIDoProps) {
    return (
      <>
        <m.h2
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}} 
        className='what-i-do-title'>
        {title}
      </m.h2>
      <m.h3 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className={`what-i-do-date ${learnMoreLink ? "" : "mb-10 md:mb-[2.5vh]"}`}>
          {date}
      </m.h3>
      {learnMoreLink && <m.div 
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1, transition: {
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}}            
        viewport={{once: true, amount: 'some'}}
        className='robot-learn-more mb-10 md:mb-[2.5vh]'
      >
        <Link href={"/currentrobots"}><p>Learn More</p></Link>
      </m.div>}
    </>
    );
}
  
  // TODO looks bad medium ui
export default function CombatRobots() {
    const [zoom, setZoom] = useState(2);
  
    useEffect(() => {
      const handleResize = () => {
        setZoom(window.innerWidth < 1024 ? 1.5 : 2);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div id={'robotics'} className='flex flex-col items-end mx-[5%]'>
        <WhatIDoHeader title={"Combat Robotics"} date={"August 2022 - Present"} learnMoreLink={"/currentrobots"}/>
        <div className='robot-container'>
          <m.p
            initial={{opacity: 0.5, y: '25%'}}
            whileInView={{opacity: 1, y: 0, transition: {
              duration: 1,
              delay: 0.1,
              ease: 'easeOut'
            }}}            
            viewport={{once: true, amount: 'some'}}
            className='robot-text whitespace-pre-line'
          >
            {`I am the Co-Founder and Team Manager of the combat robotics team, Bad Conflict. 

We compete in ant-weight robotics competitions, meaning the robots need to be less than one pound. With such a constraining limit, we are always innovating and looking for new ways to make our robots better.

Our team philosophy is to help our members compete in combat robotics by removing barriers to entry. We support our members throughout the creation process with member support for designing, wiring, and building. We also get corporate sponsorships to help offset the cost of combat robotics.`}
          </m.p>
          <ShowModel url={"/models/twofold.glb"} scale={zoom} position={[0,0,0]} rotation={[-1, -0.1, Math.PI + 0.2]} />
          {/* TODO text indicating you can rotate model */}
        </div>
        <div className='robot-container md:mt-[-5rem]'>
          <m.p
            initial={{opacity: 0.5, y: '25%'}}
            whileInView={{opacity: 1, y: 0, transition: {
              duration: 1,
              delay: 0.1,
              ease: 'easeOut'
            }}}            
            viewport={{once: true, amount: 'some'}}
            className='robot-text whitespace-pre-line'
          >
            {`My current robot is Horizon, a horizontal spinner. The robot you see to your right is not the first attempt. Version 1 was a great learning experience (meaning it had a lot of issues). With an underpowered, unprotected, and direct-drive weapon system, it was a rough first try that only won a match because the other robot had an electrical failure.

Version 2 kept the same energy but with major design improvements. It has 1/8in carbon fiber top and bottom plates for stability and armor. Its chassis is made of TPU (3D printable rubber) to absorb damage. The weapon is a 101g AR500 weapon spinning, theoretically, at 18000 RPM. With a weapon diameter of over 6 inches, it has a tip speed of 350 MPH, packing quite a punch.`}
          </m.p>
          <ShowModel url={"/models/horizon.glb"} scale={zoom}
            position={[0,0,0]} rotation={[2*Math.PI/3, 0, -Math.PI/12]} />
        </div>
  
        <div className='self-baseline mb-10'>
          <WhatIDoHeader title='Competitive Robotics' date='January 2019 - May 2023' />
        </div>
        <div className='robot-container !flex-col 2xl:!flex-row mb-0'> 
          <video autoPlay loop muted playsInline preload="auto" width={1920} height={1080}
            className='robot-video hidden 2xl:block'>
            <source src={"/videos/mantis_demo_1.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <m.p 
            initial={{opacity: 0.5, y: '25%'}}
            whileInView={{opacity: 1, y: 0, transition: {
              duration: 1,
              delay: 0.1,
              ease: 'easeOut'
            }}}            
            viewport={{once: true, amount: 'some'}}
            className='robot-text max-w-[700px] whitespace-pre-line'
          >
            {`I did competitive robotics in high school as the Programming Lead of team 2451 PWNAGE.

Each season, we built a 125-pound robot to compete in 3v3 competitions. Throughout my four seasons on the team, we built a wide variety of robots, from a 420-degree turret that shoots basketball-sized balls to a triple-jointed arm able to pick up cones and cubes.

I had a lot of fun designing the code for these robots. You're not designing a robot to last 5 years and do the same task 10,000 times. You have to develop a robot that can score as many points as possible in two minutes and thirty seconds. Motor ratings become a suggestion and if your 12V battery isn't at 7V by the end of the match, then that means you aren't putting enough into your motors.`}
          </m.p>
          <Image src={robot2541Image} alt={"Image of 2451's 2023 FRC Robot"} width={541} height={654}
            className='robot-image hidden 2xl:block'/>
          <div className='2xl:hidden flex flex-row justify-center'>
            <Image src={robot2541Image} alt={"Image of 2451's 2023 FRC Robot"} width={541} height={654} 
              className='robot-image rounded-xl mr-[2.5%] w-[45%] 2xl:hidden'/>
            <video autoPlay loop muted playsInline preload="auto" width={1920} height={1080}
              className='robot-video ml-[2.5%] w-[45%] 2xl:hidden'>
              <source src={"/videos/mantis_demo_1.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    )
}