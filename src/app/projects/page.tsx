'use client'
// builtin

// external
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import clsx from 'clsx';

// internal
import Navigation from '../components/nav-bar';
import { TextChangeDelay, TextInitialX, TextSwapFade } from '../util/animUtil';

export default function ProjectsPage() {
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

        function handlePress(_e: KeyboardEvent) {
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
            description: 'A 2D, top-down dungeon-crawling game merging a point-and-click exploration system with turn-based combat and a card-based move set. Built using a custom game engine via JavaFX.',
            link: 'https://gitfront.io/r/Llan/pCi6b29FZTMV/mourning-ember/'
        },
        {
            title: 'Neural Networks in Rust',
            description: 'Self explanatory, but a side library built in accordance with and as practice for \'Deep Learning\' (2017)',
            link: 'https://github.com/LlanAiu/rusted-networks'
        },
        {
            title: 'Trivate',
            description: 'A online head-to-head platform combining Protobowl\'s trivia focus with online Chess platform\'s 1-on-1 and rating concepts',
            link: 'https://github.com/pranavkosuri97/hacknctriviaapp'
        },
        {
            title: 'Solo Mafia',
            description: 'A project that gives you a platform to play Mafia even if you have no friends with you right now (Built for HackDuke \'25)',
            link: 'https://github.com/LlanAiu/HD2025'
        },
        {
            title: 'Let You Cook',
            description: 'An application for suggested recipes that you can make from a list of ingredients that you have',
            link: 'https://github.com/LlanAiu/recipe-api'
        },
        {
            title: 'PengDa',
            description: 'A lightweight custom reinforcement learning model built using Java to play Mahjong (UI warning)',
            link: 'https://github.com/LlanAiu/PengDa'
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
                    className='sm:pt-6 sm:pl-6 md:space-y-12 md:pt-12 md:pl-12 lg:space-y-20 lg:pt-24 lg:px-6'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.div variants={text}>
                        <motion.h1
                            className='sm:text-3xl md:text-4xl lg:text-5xl'
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
                            className='sm:text-2xl md:text-3xl lg:text-4xl'
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
                        className='w-max h-max rounded-md px-3 py-2.5'
                        animate={{ backgroundColor: '#143732' }}
                        variants={text}
                    >
                        <Link href={projects[index].link}>
                            <span className='sm:text-xl md:text-2xl'>Project Link</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}