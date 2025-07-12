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
        function swap() {
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

        function handlePress(e: KeyboardEvent) {
            swap();
        };

        function handleTouchStart(e: TouchEvent) {
            if (!(e.target instanceof HTMLSpanElement)) {
                swap();
            }
        }

        window.addEventListener('keydown', handlePress);
        window.addEventListener('touchstart', handleTouchStart);

        return () => {
            window.removeEventListener('keydown', handlePress);
            window.removeEventListener('touchstart', handleTouchStart);
        }
    }, [index]);

    const projects = [
        {
            title: 'Mourning Ember',
            description: 'A 2D, top-down dungeon-crawling game, giving you a chance to enact fiery vengeance on the demons that have wronged you. Built using a custom game engine via JavaFX.',
            link: 'https://gitfront.io/r/Llan/pCi6b29FZTMV/mourning-ember/'
        },
        {
            title: 'Let You Cook',
            description: 'An application for suggested recipes that you can make from a list of ingredients that you have',
            link: 'https://github.com/LlanAiu/recipe-api'
        },
        {
            title: 'Solo Mafia',
            description: 'A project that gives you a platform to play Mafia even if you have no friends with you right now (Built for HackDuke \'25)',
            link: 'https://github.com/LlanAiu/HD2025'
        },
        {
            title: 'Auto-Transcriber',
            description: 'A desktop application that allows you to transcribes an audio file into sheet music (WIP)',
            link: 'https://github.com/LlanAiu/music-transcriber'
        },
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
                    className='space-y-24 pt-24 px-6 md:space-y-12 md:pt-12 md:pl-12 sm:pt-6 sm:pl-6'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.div variants={text}>
                        <motion.h1
                            className='text-5xl md:text-4xl sm:text-3xl'
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
                            className='text-4xl md:text-3xl sm:text-2xl'
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
                        animate={{ backgroundColor: '#143732' }}
                        variants={text}
                    >
                        <Link href={projects[index].link}>
                            <span className='text-3xl md:text-2xl sm:text-xl'>Project Link</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}