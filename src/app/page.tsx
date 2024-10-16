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
    {text: 'About Me', link: './about'},
    {text: 'Projects', link: './projects'},
    {text: 'Currently Working On', link: './current'},
    {text: '(Hit Space)', link: './'}
  ];

  return (
    <div className='text-center'>
      <p>Hello There.</p>
      <p>I'm Alan Liu</p>
      <Link href={links[display].link}>
        <p>{links[display].text}</p>
      </Link>
    </div>
  );
}
