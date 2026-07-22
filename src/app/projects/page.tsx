'use client'
// builtin

// external
import { useEffect, useState } from 'react';
import Link from 'next/link';

// internal
import { TextChangeDelay } from '@/lib/animation/animation-utils';
import SequentialAnimation from '@/components/animations/sequential-animation';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';
import FadeBlockAnimation from '@/components/animations/motion/fade-block';
import ParallelAnimation from '@/components/animations/parallel-animation';
import { useOnScreenSize } from '@/hooks/useOnScreenSize';

export default function ProjectsPage() {
    const [index, setIndex] = useState(0);
    const titleHeight = useOnScreenSize(40, 40, 50, 50);
    const textHeight = useOnScreenSize(160, 140, 100, 120);

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
            title: 'Mourning Ember',
            description: 'Dungeon-crawler + turn-based combat + cards + JavaFX = ...something, uh..., interesting?',
            link: 'https://gitfront.io/r/Llan/pCi6b29FZTMV/mourning-ember/'
        },
        {
            title: 'Neural Networks in Rust',
            description: 'An implementation of some content in \'Deep Learning\' (since no in-book practice problems)',
            link: 'https://github.com/LlanAiu/rusted-networks'
        },
        {
            title: 'Trivate',
            description: 'Protobowl, but like 1-on-1 and with ELO, because ELO makes everything better (...yes?)',
            link: 'https://github.com/pranavkosuri97/hacknctriviaapp'
        },
        {
            title: 'Gomoku-RL',
            description: 'For an intro to RL workshop, meaning you get to train (pretty dumb) models from scratch',
            link: 'https://github.com/LlanAiu/Gomoku-RL'
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
                className='space-y-8 pt-6 md:space-y-12 md:pt-12 lg:space-y-20 lg:pt-24'
            >
                <SequentialAnimation id='projects' context={{
                    time: { mode: 'uncontrolled', delay: 0.4, speed: 2.5 }
                }}>
                    <RewritingTegakiText
                        id='title'
                        orient='orient-top-left'
                        height={titleHeight}
                        className='text-3xl md:text-4xl lg:text-5xl'
                    >
                        {projects[index].title}
                    </RewritingTegakiText>

                    <ParallelAnimation id='details' context={{
                        time: { mode: 'uncontrolled', delay: 0.4, speed: 4 }
                    }}>
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
                            <div className='rounded-md px-3 py-2.5 bg-blue-100 hover:bg-blue-300'>
                                <Link href={projects[index].link}>
                                    <span className='sm:text-xl md:text-2xl'>Project Link</span>
                                </Link>
                            </div>
                        </FadeBlockAnimation>
                    </ParallelAnimation>
                </SequentialAnimation>
            </div>
        </div>
    );
}