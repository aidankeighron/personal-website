'use client'

import Link from 'next/link';
import css from '../page.module.css';
import React from 'react';
import Header from '../components/Header';

export default function Home() {
  
  return(
    <main className={css.main}>
      <Header />
      <div>
        <h1>Alchemy</h1>
        <Link href={'/'}>Back</Link>
        <p>Alchemy is a desktop software</p>
      </div>
    </main>
  );
}