'use client'
// builtin

// external
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';

// internal
import { TextChangeDelay, TextInitialY, TextSwapFade } from './util/animUtil';


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

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [display]);

    const links = [
        { text: 'contemplate a day in my life', link: './current' },
        { text: 'read my sparse autobiography', link: './about' },
        { text: 'attend my project gallery', link: './projects' },
        { text: initialText, link: './' }
    ];

    const text = TextInitialY;

    const linkVar = TextSwapFade;

    return (
        <motion.div
            className='w-screen h-screen'
            animate={{ backgroundColor: '#F5F0F6', color: '#2B4162' }}
        >
            <motion.div
                className='pt-24 text-center space-y-10 md:space-y-16'
                initial='hidden'
                animate='visible'
                variants={text}
            >
                <motion.h1 className='text-4xl md:text-7xl' variants={text}><b>Hello There!</b></motion.h1>
                <motion.h1 className='text-3xl md:text-6xl' variants={text}>I'm Alan Liu</motion.h1>
                <motion.p className='text-xl md:text-3xl' variants={text}>Since you're here already, why don't you...</motion.p>
                <motion.div className='my-5 md:my-10' variants={text}>
                    <Link href={links[display].link} ref={linkRef}>
                        <motion.p
                            className='text-xl md:text-4xl absolute w-full text-center'
                            animate={clsx({
                                'in': anim,
                                'out': !anim
                            })}
                            variants={linkVar}
                        >
                            {links[display].text}
                        </motion.p>
                        <motion.p
                            className='text-xl md:text-4xl absolute w-full text-center'
                            animate={clsx({
                                'out': anim,
                                'in': !anim
                            })}
                            variants={linkVar}
                        >
                            {links[display].text}
                        </motion.p>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
