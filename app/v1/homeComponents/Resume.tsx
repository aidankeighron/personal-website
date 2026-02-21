'use client';

import { m } from "framer-motion";

export default function Resume() {
    return (
      <m.div
        initial={{ width: 'min-content', borderRadius: '36px' }}
        whileInView={{ width: '100%', borderRadius: '0px' }}
        viewport={{once: true, amount: 'some'}}
        transition={{ease: 'easeInOut', duration: 1}}
        className='bg-about-me-background dark:bg-d-about-me-background h-[120px] text-d-main mt-10' // w-full
      >
        <a href='/AidanKeighronResume.pdf' target="_blank" className='underline text-4xl flex items-center justify-center h-full mx-[5vw] whitespace-nowrap'>View Resume</a>
      </m.div>
    )
  }