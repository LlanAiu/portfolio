'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {

  const [display, setDisplay] = useState(3);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setDisplay((display + 1) % (links.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  const links = [
    {text: 'read my sparse autobiographyy', link: './about'},
    {text: 'attend my project gallery', link: './projects'},
    {text: 'contemplate a day in my life', link: './current'},
    {text: 'Press [Space]', link: './'}
  ];

  return (
    <div className='mt-24 text-center'>
      <h1 className='text-5xl m-10'>Hello There</h1>
      <h1 className='text-4xl m-20'>I'm Alan Liu</h1>
      <p className='text-xl m-10'>Since you're here already, why don't you...</p>
      <Link href={links[display].link}>
        <p className='text-2xl m-10'>{links[display].text}</p>
      </Link>
    </div>
  );
}
