'use client'
// builtin

// external
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';

// internal
import { TextChangeDelay } from '@/lib/animation/animation-utils';
import SequentialAnimation from '@/components/animations/sequential-animation';
import TegakiText from '@/components/animations/tegaki/tegaki-text';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';


export default function Home() {
    const [display, setDisplay] = useState(3);
    const [anim, setAnimate] = useState(true);
    const [initialText, setInitialText] = useState('Press [Space]');
    const linkRef = useRef<HTMLAnchorElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Only used for keyboard/touchscreen controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' && !(linkRef.current?.contains(event.target as Node))) {
                setTimeout(() => {
                    setDisplay(prev => (prev + 1) % (links.length - 1));
                }, TextChangeDelay * 1000);
                setAnimate(prev => !prev);
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (!(linkRef.current?.contains(event.target as Node))) {
                setTimeout(() => {
                    setDisplay(prev => (prev + 1) % (links.length - 1));
                }, TextChangeDelay * 1000);
                setAnimate(prev => !prev);
            }
        };

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setInitialText('Tap on screen');
        }

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [display]);

    const links = [
        { text: 'introduce ourselves? (or just me)', link: './about' },
        { text: 'catch up on how life\'s going?', link: './current' },
        { text: 'take a look at some projects?', link: './projects' },
        { text: initialText, link: './' }
    ];

    return (
        <div className='w-full h-full'>

            <SequentialAnimation id='home'>
                <TegakiText id='hello'>Hello There!</TegakiText>
                <TegakiText id='name'>I'm Alan Liu.</TegakiText>
                <TegakiText id='suggestion'>Since you're here already, why don't we</TegakiText>
                <RewritingTegakiText id='link'>{links[display].text}</RewritingTegakiText>
            </SequentialAnimation>
        </div>
    );
}
