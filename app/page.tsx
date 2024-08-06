import React from 'react';
import { Metadata } from 'next';
import Home from './homeComponents/Home';

export const metadata: Metadata = {
  title: "Home"
}

export default function Page() {
  return(
    <main className='flex flex-col items-center'>
      <Home />
    </main>
  );
}