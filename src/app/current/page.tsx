'use client'
// builtin

// external
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';

// internal
import Navigation from '../components/nav-bar';
import { TextChangeDelay, TextInitialY, TextSwapFade } from '../util/animUtil';

export default function CurrentPage() {
    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: length of current is effectively constant
    useEffect(() => {
        const swap = () => {
            setSwap(prev => !prev);
            setTimeout(() => {
                setIndex(prev => (prev + 1) % current.length);
                setSwap(prev => !prev);
            }, TextChangeDelay * 1000);
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                swap();
            }
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (!(e.target instanceof HTMLSpanElement)) {
                swap();
            }
        }

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('touchstart', handleTouchStart);
        }
    }, [index]);

    const current = [
        { text: 'putting the finish touches on the fall semester' },
        { text: 'looking for a new book to read' },
        { text: 'revisiting reinforcement learning again' },
        { text: 'discovering just how nice Arcs and Mutexes are in Rust' },
        { text: 'trying (and somewhat failing) to avoid the cold' },
        { text: 'looking forward to winter break and the new year!' }
    ];

    const text = TextInitialY;
    const textFade = TextSwapFade;

    return (
        <div className='w-full h-full'>
            <Navigation path='current' bg='#B5B0BF' text='white' bttn='#1B4076' hlght='#266DD3' />
            <motion.div animate={{ backgroundColor: '#266DD3', color: 'white' }} className='w-full h-full'>
                <motion.div
                    className='sm:pt-12 sm:pl-8 sm:space-y-6 md:pt-24 md:pl-16 md:space-y-12 lg:pt-36 lg:px-18 lg:space-y-24'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.p
                        className='sm:text-4xl md:text-6xl  lg:text-7xl'
                        variants={text}
                    >
                        <b>Currently, I am...</b>
                    </motion.p>
                    <motion.div variants={text}>
                        <motion.p
                            className='sm:text-3xl md:text-4xl lg:text-5xl'
                            animate={clsx({
                                'in': !swap,
                                'out': swap
                            })}
                            variants={textFade}
                        >
                            {current[index].text}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}