'use client'

import Link from 'next/link';
import css from '../page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function Home() {
  
  return(
    <main className='main'>
      <Header />
      <div>
        <h1>PID Visualizer</h1>
        <Link href={'/'}>Back</Link>
        <p>PID Visualizer a PID visualization software</p>
      </div>
    </main>
  );
}