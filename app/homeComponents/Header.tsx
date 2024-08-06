'use client';

import { m } from "framer-motion";
import Link from "next/link";

export default function Header() {
    const variants = {
      visible: {
        opacity: 1,
        transition: {when: "beforeChildren", staggerChildren: 0.25}
      },
      hidden: {
        opacity: 0,
        transition: {when: "afterChildren"}
      },
    }
  
    const item = {
      visible: {
        opacity: 1,
        scale: 1.0,
        transition: {ease: [0, 0.71, 0.2, 1.01]}
      },
      hidden: {
        opacity: 0,
        scale: 0.5,
        
      },
    }
  
    return (
      <m.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className='absolute z-10 space-x-4 w-full items-end justify-end mr-[2.5%] p-10 hidden md:flex'
      >
        {/* TODO make them work and smooth scroll */}
        <Link href={'#aboutme'} scroll={true}>
          <m.p className='header-link'
            variants={item}
          >
            About Me
          </m.p>
        </Link>
        <Link href={'#robotics'} scroll={true}>
          <m.p className='header-link'
            variants={item}
          >
            Robotics
          </m.p>
        </Link>
        <Link href={'#projects'} scroll={true}>
          <m.p className='header-link'
            variants={item}
          >
            Projects
          </m.p>
        </Link>
        <Link href={'#skills'} scroll={true}>
          <m.p className='header-link'
            variants={item}
          >
            Skills
          </m.p>
        </Link>
      </m.div>
    );
};