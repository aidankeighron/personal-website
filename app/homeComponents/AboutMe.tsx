'use client';

import { m } from "framer-motion";
import Image from "next/image";
import aboutMeImage from '../../public/images/aidan_profile.jpg';

export default function AboutMe() {
    return (
      <div className='flex items-center flex-col'>
          <div id={'aboutme'} className='max-w-[1500px] mx-[5%] bg-third dark:bg-d-third flex flex-col md:flex-row items-center rounded-2xl p-4 shadow-xl'>
            <m.div
              initial={{opacity: 0, scale: 0.7}}
              whileInView={{opacity: 1, scale: 1, transition: {
                duration: 1,
                ease: 'easeOut'
              }}}            
              viewport={{once: true, amount: 'some'}}
              className='md:w-1/3 m-4'
            >
            {/* TODO better blur url */}
            <Image width={4007} height={4004} placeholder='blur' blurDataURL='/images/aidan_profile.jpg' priority
                  src={aboutMeImage} alt="Picture of Aidan Keighron" className='h-max w-max rounded-xl' />
            </m.div>
            <p className='dark:text-d-main text-main text-sm md:text-xl md:w-2/3 whitespace-pre-line md:mx-4'>{`I am Aidan Keighron, a highly motivated computer science student at Michigan State University, fueled by a passion for robotics, automation, and software development. 
            
I have made physics simulations, machine learning algorithms, and even a calculator made out of files.

On the robotics side of things, I Co-Founded the combat robotics team Bad Conflict, where we build robots to compete in antweight robotics competitions. My current robot, Horizon, is a horizontal spinner that packs quite a punch.

Taking software development to the next level I created a startup called Alchemy, where I am making an all-in-one task management software that aims to reduce the time it takes to plan out your week.`}</p>
          </div>
      </div>
    );
  }