"use client" // TODO can remove?

import { m } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

function Socials() {
  return (
    <div className="flex flex-row justify-around mt-3 gap-x-4">
      <Link href={"https://github.com/aidankeighron"} className='' target='_blank'>
        <button type="button"
          className="mb-2 flex rounded bg-[#333] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
          <span className="me-2 [&>svg]:h-4 [&>svg]:w-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </span>
          GitHub
        </button>
      </Link>
      <Link href={"https://www.linkedin.com/in/aidan-keighron/"} className='' target='_blank'>
        <button type="button"
          className="mb-2 flex rounded bg-[#0077b5] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
          <span className="me-2 [&>svg]:h-4 [&>svg]:w-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
            </svg>
          </span>
          Linkedin
        </button>
      </Link>
      <Link href={"mailto:aidankeighron@gmail.com"} className='' target='_blank'>
        <button type="button"
          className="mb-2 flex rounded bg-[#ea4335] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
          <span className="me-2 [&>svg]:h-4 [&>svg]:w-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </span>
          Gmail
        </button>
      </Link>
    </div>
  )
}

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

  
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const onVideoError = () => {
      if (videoRef.current) {
        videoRef.current.src = "/videos/introvideo10.mp4";
        videoRef.current.removeEventListener('error', onVideoError, true);
      }
    }

    videoRef.current.src = 'https://firebasestorage.googleapis.com/v0/b/personal-website-2-17025.appspot.com/o/Introvideo14.mp4?alt=media&token=186d3f37-20f3-4e69-a659-b2598ed50f57';
    videoRef.current.addEventListener('error', onVideoError, true);
  }, [])

  return (
    <>
    <h1 className='text-d-main dark:text-main text-4xl mb-16 m-2 w-fit h-fit p-4 border-b-4 border-third dark:border-d-third sm:hidden'>Aidan Keighron</h1>
    <div className='relative'>
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" width={1920} height={1080} 
        className='aspect-video' style={{marginTop: `-${videoTopOffset}px`}}>
        {/* <source src="https://firebasestorage.googleapis.com/v0/b/personal-website-54361.appspot.com/o/Introvideo10.mp4?alt=media&token=c3696367-8fd0-4f9f-a797-533834d8883d" type="video/mp4" /> */}
        {/* <source src="/videos/introvideo10.mp4" type="video/mp4" />  */}
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
        <Socials />
      </m.div>
    </div>
    <h1 className='text-d-main dark:text-main text-base mt-16 m-2 w-fit h-fit p-4 border-b-4 border-third dark:border-d-third sm:hidden'>I'm a Software Developer and I make robots in my spare time</h1>
    <div className="sm:hidden">
      <Socials />
    </div>
    </>
  );
}