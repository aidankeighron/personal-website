// TODO
'use client'

import Link from 'next/link';
import Content from './content.mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sheet Scraper"
}

export default function Home() {
  return(
    <div className='bg-d-main flex flex-col items-center pt-40'>
      <Link href='/'><p className='header-link w-fit absolute z-10 items-end justify-end top-10 left-20'>Home</p></Link>
      <div className='content'>
        <Content />
      </div>
    </div>
  );
}