'use client'

import Header from '../components/Header';
import Content from './content.mdx';

export default function Home() {
  return(
    <div className='main'>
      <Header />
      <div className='content'>
        <Content />
      </div>
    </div>
  );
}