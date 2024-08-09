"use client" // TODO can remove?

import { m } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";

export default function VideoEntry() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoTopOffset, setVideoTopOffset] = useState<number>(0);
  
    // TODO make this resize on going back 
    useLayoutEffect(() => {
      if (videoRef.current) {
        // TODO change this to a ratio of the width
        if (videoRef.current.offsetHeight > window.innerHeight) {
          setVideoTopOffset(videoRef.current.offsetHeight-window.innerHeight);
        }
      }
    }, [])
  
    return (
      <>
      <h1 className='text-d-main dark:text-main text-4xl mb-16 m-2 w-fit h-fit p-4 border-b-4 border-third dark:border-d-third sm:hidden'>Aidan Keighron</h1>
      <div className='relative'>
        {/* TODO loading issue on laptop (use dev tools to throttle internet) */}
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" width={1920} height={1080} 
          className='aspect-video' style={{marginTop: `-${videoTopOffset}px`}}>
          <source src="https://8owxurotrcpnrijg.public.blob.vercel-storage.com/Introvideo10-0Rdfp1DfzaQstt6r6zYfb70qEBwuYq.mp4" type="video/mp4" />
          {/* If necessary */}
          {/* https://cloudinary.com/pricing */}
          {/* https://www.cloudflare.com/plans/ */}
          {/* https://www.backblaze.com/cloud-storage/pricing */}
          {/* <source src="/videos/intro_video5.mp4" type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <m.div
          initial={{opacity: 0, y: '25%', x: '-50%'}}
          whileInView={{opacity: 1, y: '0', x: '-50%', transition: {duration: 1, ease: 'easeOut'}}}
          viewport={{once: true, amount: 'some', margin: '5%'}}
          className='bg-a-main dark:bg-d-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-4 rounded-md border-b-4 border-third dark:border-d-third shadow-xl hidden sm:block'
        >
          <h1 className='text-d-main dark:text-main text-xl md:text-2xl lg:text-4xl font-bold text-center whitespace-nowrap'>Hi, I am Aidan Keighron</h1>
          <p className='text-d-main dark:text-main text-xs md:text-sm lg:text-base font-medium text-center'>I'm a Software Developer and I make robots in my spare time</p>
        </m.div>
      </div>
      <h1 className='text-d-main dark:text-main text-base mt-16 m-2 w-fit h-fit p-4 border-b-4 border-third dark:border-d-third sm:hidden'>I'm a Software Developer and I make robots in my spare time</h1>
      </>
    );
  }