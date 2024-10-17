'use client'

import { useEffect, useState } from 'react';
import Navigation from '../components/nav-bar';

export default function Page() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if(e.code === 'Space'){
                setIndex((index + 1) % current.length);
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [index]);

    const current = [
        {text: 'learning Express.js and API development'},
        {text: 'working on an ingredients-to-recipe API (for our pledge project)'},
        {text: 'reading through \"An Introduction to Statistical Learning, 2nd Edition\" (James, et al.)'},
        {text: 'struggling with competitive programming problems...'},
        {text: 'on fall break (thankfully)!'}
    ];

    return (
        <div className='w-full h-full'>
            <Navigation path='current' />
            <div className='pt-36 pl-32 space-y-24'>
                <p className='text-5xl'><b>Currently, I am...</b></p>
                <p className='text-4xl'>{current[index].text}</p>
            </div>
        </div>
    );
}