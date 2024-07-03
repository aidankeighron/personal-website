'use client'

import css from './page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function CurrentRobots() {
    return (
        <main className={css.main}>
        <Header />
        <div>
            <h1>Current Robots</h1>

            <h2>Combat Robots - Antweight (1lb)</h2>
            <div className='horizontal'>
                {/* Image of robot */}
                <div className={css.robotContainer}>
                    <h3 className={css.robotTitle}>Horizon</h3>
                    <p>(W: 1, L: 3)</p>
                    <p className={css.robotDescription}>Horizon is a horizontal spinner with a 100g weapon that spins at FIND_NUMBER RP. 
                        It has a TPU chassis to absorb impact and Carbon Fiber top and bottom plates for rigidity. 
                        It's weapon is AR500 Steel and has a tip speed of FIND_NUMBER MPH.</p>
                    <p className={css.robotStreak}>Weight: FIND_NUMBER</p>
                    <p className={css.robotInfo}>Weapon Hit Force: FIND_NUMBER</p>
                    <p className={css.robotInfo}>Dimensions: FIND_NUMBER</p>
                    <p className={css.robotInfo}>Number of Wires: FIND_NUMBER</p>
                </div>
            </div>
            <div className='horizontal'>
                {/* Image of robot */}
                <div className={css.robotContainer}>
                    <h3 className={css.robotTitle}>Twofold</h3>
                    <p className={css.robotStreak}>(W: FIND_NUMBER, L: FIND_NUMBER)</p>
                    <p className={css.robotDescription}>Twofold is a double wedge designed to get under opponents and push them around. 
                        The double wedge design allows Twofold to take a lot more damage as it comes with a spare 
                        ready to go. Fun fact: Twofold is so low to the ground that some weapons are unable to 
                        do any damage.</p>
                    <p className={css.robotInfo}>Weight: FIND_NUMBER</p>
                    <p className={css.robotInfo}>Weapon Hit Force: 5</p>
                    <p className={css.robotInfo}>Dimensions: FIND_NUMBER</p>
                    <p className={css.robotInfo}>Ground Effect: All of it</p>
                </div>
            </div>
        </div>
      </main>
    )
}