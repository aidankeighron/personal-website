'use client'

import css from './page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function CurrentRobots() {
    return (
        <main className={css.main}>
        <Header />
        <div>
          <h1>Current Projects</h1>
          
          <h3>Alchemy</h3>
          <p></p>

          <h3>Personal Website</h3>
          <p>This website that you are looking at right now I have developed myself. I used the Next.js 
            framework and Three.js for the car simulation.</p>
        </div>
      </main>
    )
}