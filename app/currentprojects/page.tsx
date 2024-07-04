'use client'

import css from './page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function CurrentRobots() {
    return (
        <main className='main'>
        <Header />
        <div>
            <h1>Current Projects</h1>
            
            <div className={css.project}>
                <h3 className={css.projectTitle}>Alchemy</h3>
                <p className={css.projectDescription}> Alchemy is a productivity tool that I developed to help improve my time 
                    management.</p>
            </div>

            <div className={css.project}>
                <h3 className={css.projectTitle}>Personal Website</h3>
                <p className={css.projectDescription}>This website that you are looking at right now I have developed myself. I used the Next.js 
                framework for the core of the website and Three.js for the car simulation. 
                This website will continue to grow with me and I will be keeping it updated as I work 
                on new projects.</p>
            </div>
        </div>
      </main>
    )
}