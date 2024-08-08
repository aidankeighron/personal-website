import React from 'react';
import Home from './homeComponents/Home';
import BackToTop from './components/BackToTop';

export default function Page() {
  return(
    <main className='flex flex-col items-center'>
      <title>Home | Aidan Keighron</title>
      <Home />
      <BackToTop />
    </main>
  );
}