'use client'

import Link from 'next/link';
import css from '../page.module.css';
import React from 'react';

export default function Home() {
  
  return(
    <main className={css.main}>
      <div className={css.header}>
        <p>Aidan Keighron</p>
      </div>
      <div>
        <h1>PID Visualizer</h1>
        <Link href={'/'}>Back</Link>
        <p>PID Visualizer a PID visualization software</p>
      </div>
    </main>
  );
}