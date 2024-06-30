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
        <h1>Fantasy FRC</h1>
        <Link href={'/'}>Back</Link>
        <p>Fantasy football but FRC</p>
      </div>
    </main>
  );
}