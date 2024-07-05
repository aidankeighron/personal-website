'use client'

import css from './page.module.css';
import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';

export default function CurrentRobots() {
    return (
      <main className='main'>
        <Header />
        <h1 className={css.title}>About Me</h1>
        
        <div className={css.description}>
          <Image src='/images/aidan_profile.jpg' alt="Picture of Aidan Keighron" width={4007/16} height={4004/16}
            quality={100} className={css.image}/>
          <p>I am Aidan Keighron a sophomore at Michigan State University studying computer science. 
          I love STEM, robotics, and programming, outside of technology I love to read and rollerblade. 
          I am very involved in competitive robotics, I am the Team Manager of a combat robotics 
          team, Bad Conflict, we compete in antweight robotics competitions. I am an alumni of FRC team 
          2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since 
          middle school and I hight recommend it to anyone even vaguely interested.</p>
        </div>
      </main>
    )
}