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
        {text: 'Learning Express.js and API development'},
        {text: 'Working on an ingredients-to-recipe API (for our pledge project...)'},
        {text: 'Reading through \"An Introduction to Statistical Learning, 2nd Edition\" (James, et al.)'},
        {text: 'Struggling with competitive programming problems'},
        {text: 'on fall break (thankfully)!'}
    ];

    return (
        <div>
            <Navigation path='current' />
            <div>
                <p>Currently I am...</p>
                <p>{current[index].text}</p>
            </div>
        </div>
    );
}