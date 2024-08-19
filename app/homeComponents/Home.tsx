'use client';

import { useScroll, MotionConfig, LazyMotion, domAnimation, m } from "framer-motion";
import AboutMe from "./AboutMe";
import WhatIDo from "./WhatIDo";
import Header from "./Header";
import OtherProjects from "./OtherProjects";
import Resume from "./Resume";
import Skillsets from "./Skillsets";
import VideoEntry from "./VideoEntry";

export default function Home() {
    const { scrollYProgress } = useScroll();
  
    return(
        <MotionConfig reducedMotion="user">
            <LazyMotion strict features={domAnimation}>
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
                <AboutMe />
                <m.h1
                    initial={{opacity: 0, x: '-10vh'}}
                    whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
                    viewport={{once: true, amount: 'some', margin: '5%'}}
                    id={'whatido'} className='section-title'
                >
                    What I Do
                </m.h1>
                <WhatIDo />
                <m.h1
                    initial={{opacity: 0, x: '-10vh'}}
                    whileInView={{opacity: 1, x: 0, transition: {duration: 1}}}
                    viewport={{once: true, amount: 'some', margin: '5%'}}
                    id={'skills'} className='section-title'
                >
                    Skills
                </m.h1>        
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
                <OtherProjects />
                <div style={{height: '10vh'}}></div>
            </LazyMotion>
        </MotionConfig>
    );
  }