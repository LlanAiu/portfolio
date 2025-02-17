'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '../components/nav-bar';
import { TextChangeDelay, TextInitialX, TextSwapFade } from '../util/animUtil';
import { motion } from 'motion/react';
import clsx from 'clsx';

export default function Page() {

    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);
    const [textSwap, setTextSwap] = useState(false);

    useEffect(() => {
        const handlePress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                setSwap(prev => !prev);
                setTimeout(() => {
                    setTextSwap(prev => !prev);
                }, TextChangeDelay * 500);
                setTimeout(() => {
                    setSwap(prev => !prev);
                }, TextChangeDelay * 1000);
                setTimeout(() => {
                    setTextSwap(prev => !prev);
                    setIndex((index + 1) % projects.length);
                }, TextChangeDelay * 1500);
            }
        };

        window.addEventListener('keydown', handlePress);

        return () => {
            window.removeEventListener('keydown', handlePress);
        }
    }, [index]);

    const projects = [
        {
            title: 'PengDa',
            description: 'A lightweight custom reinforcement learning model built using Java to play Mahjong complete with a scrappy (and crappy) UI',
            link: 'https://github.com/LlanAiu/PengDa'
        },
        {
            title: 'Tuesday Once More',
            description: 'A web application designed to hold study problems used to review and retain class material',
            link: 'https://github.com/LlanAiu/tuesday-once-more'
        },
        {
            title: 'Crescendo Software',
            description: 'Robot Code for our team\'s 2024 robot. Yes, it\'s not my project, but this has much sentimental value',
            link: 'https://github.com/Team-4795/2024-Crescendo'
        },
        {
            title: 'LoggedRL',
            description: 'A (kinda) hackathon project. The reinforcement learning framework itself is buggy as it stands, the logging looks fine',
            link: 'https://github.com/LlanAiu/LoggedRL'
        },
        {
            title: 'Recipe-API',
            description: 'An API that will return possible recipes that you can make from a list of ingredients that you have',
            link: 'https://github.com/LlanAiu/recipe-api'
        }
    ];

    const text = TextInitialX;
    const textFade = TextSwapFade;

    return (
        <div className='w-full h-full'>
            <Navigation path='projects' bg='#D1E5F0' text='black' bttn='#9BE9DB' hlght='#48BEFF' />
            <motion.div
                className='h-full'
                animate={{ backgroundColor: '#206F62', color: '#C2FDFF' }}
            >
                <motion.div
                    className='space-y-24 pt-24 pl-24'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.div variants={text}>
                        <motion.h1
                            className='text-5xl'
                            animate={clsx({
                                'in': !swap,
                                'out': swap
                            })}
                            variants={textFade}
                        >
                            <b>{projects[index].title}</b>
                        </motion.h1>
                    </motion.div>
                    <motion.div variants={text}>
                        <motion.p
                            className='text-4xl'
                            animate={clsx({
                                'in': !textSwap,
                                'out': textSwap
                            })}
                            variants={textFade}
                        >
                            {projects[index].description}
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className='w-max h-max rounded-md p-2' 
                        animate={{backgroundColor: '#143732'}}
                        variants={text}
                    >
                        <Link href={projects[index].link}>
                            <p className='text-3xl'>Project Link</p>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}