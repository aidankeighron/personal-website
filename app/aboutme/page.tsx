'use client'

import css from './page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function CurrentRobots() {
    return (
        <main className={css.main}>
        <Header />
        <h1 className={css.title}>About Me</h1>
        
        {/* Image of Me */}
        <p  className={css.description}>I am Aidan Keighron a sophomore at Michigan State University studying computer science. 
        I love STEM, robotics, and programming, outside of technology I love to read and rollerblade. 
        I am very involved in competitive robotics, I am the Team Manager of a combat robotics 
        team, Bad Conflict, we compete in antweight robotics competitions. I am an alumni of FRC team 
        2451 PWNAGE and FLL team 11676 TechNo Turtles. I have been doing competitive robotics since 
        middle school and I hight recommend it to anyone even vaguely interested.</p>
      </main>
    )
}