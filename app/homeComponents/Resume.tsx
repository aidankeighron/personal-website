'use client';

import { m } from "framer-motion";

export default function Resume() {
    return (
      <m.div
        initial={{ width: 'min-content', borderRadius: '36px' }}
        whileInView={{ width: '100%', borderRadius: '0px' }}
        viewport={{once: true, amount: 'some'}}
        transition={{ease: 'easeInOut', duration: 1}}
        className='bg-third dark:bg-d-third h-[120px] text-main' // w-full
      >
        <a href='/AidanKeighronResume.pdf' target="_blank" className='text-4xl flex items-center justify-center h-full mx-[5vw] whitespace-nowrap'>View Resume</a>
      </m.div>
    )
  }