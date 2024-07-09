"use client";

import Header from '../components/Header';
import Content from './content.mdx';

export default function Page() {
  return (
    <div className='main'>
      <Header />
      <div className='content'>
        <Content />
      </div>
    </div>
  );
}