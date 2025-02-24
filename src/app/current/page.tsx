'use client'

import { useEffect, useState } from 'react';
import Navigation from '../components/nav-bar';
import { motion } from 'motion/react';
import { TextChangeDelay, TextInitialY, TextSwapFade } from '../util/animUtil';
import clsx from 'clsx';

export default function Page() {

    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);

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
        { text: 'learning Rust (it\'s been fun, would recommend)' },
        { text: 'working on a desktop application to transcribe piano audio' },
        { text: 'sitting through my classes (as per usual)' },
        { text: 'reading \"Deep Learning\" (Goodfellow, et. al)' },
        { text: 'shocked that it snowed three times this year!!' }
    ];

    const text = TextInitialY;
    const textFade = TextSwapFade;

    return (
        <div className='w-full h-full'>
            <Navigation path='current' bg='#B5B0BF' text='white' bttn='#1B4076' hlght='#266DD3' />
            <motion.div animate={{ backgroundColor: '#266DD3', color: '101319' }} className='w-full h-full'>
                <motion.div
                    className='pt-36 px-6 space-y-24 md:pt-24 md:pl-16 md:space-y-12 sm:pt-12 sm:pl-8 sm:space-y-6'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.p
                        className='text-5xl md:text-4xl sm:text-3xl'
                        variants={text}
                    >
                        <b>Currently, I am...</b>
                    </motion.p>
                    <motion.div variants={text}>
                        <motion.p
                            className='text-4xl md:text-3xl sm:text-2xl'
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