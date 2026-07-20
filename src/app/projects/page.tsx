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

export default function ProjectsPage() {
    const [index, setIndex] = useState(0);

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
    ];

    return (
        <div className='w-full h-full'>
            <div
                className='space-y-6 md:space-y-12 md:pt-12 md:pl-12 lg:space-y-20 lg:pt-24 lg:px-6'
            >
                <SequentialAnimation id='projects' context={{
                    time: { mode: 'uncontrolled', delay: 0.4, speed: 2.5 }
                }}>
                    <RewritingTegakiText
                        id='title'
                        orient='orient-top-left'
                        height={50}
                        className='text-3xl md:text-4xl lg:text-5xl'
                    >
                        {projects[index].title}
                    </RewritingTegakiText>

                    <ParallelAnimation id='details' context={{
                        time: { mode: 'uncontrolled', delay: 0.4, speed: 4.5 }
                    }}>
                        <RewritingTegakiText
                            id='description'
                            orient='orient-top-left'
                            className='sm:text-2xl md:text-3xl lg:text-4xl'
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