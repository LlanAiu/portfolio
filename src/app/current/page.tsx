'use client'

import { useEffect, useState } from 'react';
import Navigation from '../components/nav-bar';
import { color, motion } from 'framer-motion';
import { TextChangeDelay, TextInitialY, TextSwapFade } from '../util/animUtil';
import clsx from 'clsx';

export default function Page() {

    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if(e.code === 'Space'){
                setSwap(prev => !prev);
                setTimeout(() => {
                    setIndex(prev => (prev + 1) % current.length);
                    setSwap(prev => !prev);
                }, TextChangeDelay * 1000);
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [index]);

    const current = [
        {text: 'learning API development using FastAPI'},
        {text: 'working on an ingredients-to-recipe API'},
        {text: 'developing a personal portfolio website (as you can tell)'},
        {text: 'reading through \"An Introduction to Statistical Learning, 2nd Edition\" (James, et al.)'},
        {text: 'struggling with competitive programming problems...'},
        {text: 'patiently waiting for winter break'}
    ];

    const text = TextInitialY;
    const textFade = TextSwapFade;

    return (
        <div className='w-full h-full'>
            <Navigation path='current' bg='#B5B0BF' text='white' bttn='#1B4076' hlght='#266DD3'/>
            <motion.div animate={{backgroundColor: '#266DD3', color: '101319'}} className='w-full h-full'>
                <motion.div 
                    className='pt-36 pl-32 space-y-24'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.p 
                        className='text-5xl'
                        variants={text}
                    >
                        <b>Currently, I am...</b>
                    </motion.p>
                    <motion.div variants={text}>
                        <motion.p 
                            className='text-4xl'
                            animate={clsx({
                                'in' : !swap,
                                'out' : swap
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