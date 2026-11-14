'use client'
// builtin

// external
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

// internal
import { TextChangeDelay } from '@/lib/animation/animation-utils';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';
import FadeBlockAnimation from '@/components/animations/motion/fade-block';
import ParallelAnimation from '@/components/animations/parallel-animation';
import { useOnScreenSize } from '@/hooks/useOnScreenSize';
import TegakiWrapper from '@/components/animations/tegaki/tegaki-wrapper';

const linkColorSchemes = [
    'bg-red-100 hover:bg-red-300',
    'bg-green-100 hover:bg-green-300',
    'bg-blue-100 hover:bg-blue-300',
];

export default function ProjectsPage() {
    const [index, setIndex] = useState(0);
    const reducedMotion = useReducedMotion();
    const titleHeight = useOnScreenSize(40, 40, 50, 50);
    const textHeight = useOnScreenSize(105, 105, 100, 120);

    useEffect(() => {
        function swap() {
            setTimeout(() => {
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
            title: 'Gomoku-RL',
            description: 'For an intro to RL workshop, meaning you get to train (pretty dumb) models from scratch',
            link: 'https://github.com/LlanAiu/Gomoku-RL'
        },
        {
            title: 'Rusted Networks',
            description: 'A rust implementation of content from \'Deep Learning\' (since no in-book practice problems)',
            link: 'https://github.com/LlanAiu/rusted-networks'
        },
        {
            title: 'VIN-NBV V2',
            description: 'IsaacLab simulator support for training view introspection networks that tell drones where to fly',
            link: 'https://gitfront.io/r/Llan/KK6bbhNTS893/VIN-IsaacLab-2.3/'
        },
        {
            title: 'Mourning Ember',
            description: 'Dungeon-crawler + turn-based combat + cards + JavaFX = ...something, uh..., interesting?',
            link: 'https://gitfront.io/r/Llan/pCi6b29FZTMV/mourning-ember/'
        },
        {
            title: 'Trivate',
            description: 'Protobowl, but like 1-on-1 and with ELO, because ELO makes everything better (...yes?)',
            link: 'https://github.com/pranavkosuri97/hacknctriviaapp'
        },
        {
            title: 'Solo Mafia',
            description: 'Mafia, but for when none of your friends feel like showing up to play',
            link: 'https://github.com/LlanAiu/HD2025'
        },
    ];

    return (
        <div className='w-full h-full'>
            <div
                className='space-y-12 pt-6 md:space-y-18 md:pt-12 lg:space-y-24 lg:pt-24'
            >
                <ParallelAnimation id='projects' context={{
                    time: { mode: 'uncontrolled', speed: 4 }
                }}>
                    <TegakiWrapper id='title-timing' context={{
                        time: { mode: 'uncontrolled', speed: 2.5 }
                    }}>
                        <RewritingTegakiText
                            id='title'
                            orient='orient-top-left'
                            height={titleHeight}
                            className='text-3xl md:text-4xl lg:text-5xl'
                        >
                            {projects[index].title}
                        </RewritingTegakiText>
                    </TegakiWrapper>
                    <RewritingTegakiText
                        id='description'
                        orient='orient-top-left'
                        height={textHeight}
                        className='text-2xl md:text-3xl lg:text-4xl'
                    >
                        {projects[index].description}
                    </RewritingTegakiText>
                    <FadeBlockAnimation
                        id='project-link'
                        orientation='horizontal'
                        className='w-max h-max'
                    >
                        <AnimatePresence mode='wait' initial={false}>
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, pointerEvents: 'none' }}
                                transition={{ duration: reducedMotion ? 0 : TextChangeDelay }}
                            >
                                <Link
                                    href={projects[index].link}
                                    className={`block rounded-md px-3 py-2.5 ${linkColorSchemes[index % linkColorSchemes.length]}`}
                                >
                                    <span className='sm:text-xl md:text-2xl'>Project Link</span>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </FadeBlockAnimation>
                </ParallelAnimation>
            </div>
        </div >
    );
}
