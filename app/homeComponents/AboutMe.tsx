'use client';

import { m } from "framer-motion";
import Image from "next/image";
import aboutMeImage from '../../public/images/aidan_profile.jpg';

export default function AboutMe() {
    return (
      <div className='flex items-center flex-col'>
          <div id={'aboutme'} className='max-w-[1500px] mx-[5%] bg-about-me-background dark:bg-d-about-me-background flex flex-col md:flex-row items-center rounded-2xl p-4 shadow-xl'>
            <m.div
              initial={{opacity: 0, scale: 0.7}}
              whileInView={{opacity: 1, scale: 1, transition: {
                duration: 1,
                ease: 'easeOut'
              }}}            
              viewport={{once: true, amount: 'some'}}
              className='md:w-1/3 m-4'
            >
            <Image width={4007} height={4004} placeholder='blur' blurDataURL='/images/aidan_profile.webp' priority
                  src={aboutMeImage} alt="Picture of Aidan Keighron" className='h-max w-max rounded-xl' />
            </m.div>
            <p className='text-d-main font-medium text-sm md:text-2xl md:w-2/3 whitespace-pre-line md:mx-4'>{`I am a computer science student at Michigan State University.

My current combat robot, Horizon, is a horizontal spinner that packs quite a punch.

I founded a startup called Half Full, where I am making an all-in-one task management software.`}</p>
          </div>
      </div>
    );
  }