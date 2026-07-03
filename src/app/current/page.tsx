'use client'
// builtin

// external
import { useEffect, useState } from 'react';

// internal
import { TextChangeDelay } from '@/lib/animation/animation-utils';
import SequentialAnimation from '@/components/animations/sequential-animation';
import TegakiText from '@/components/animations/tegaki/tegaki-text';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';

export default function CurrentPage() {
    const [index, setIndex] = useState(0);

    // biome-ignore lint/correctness/useExhaustiveDependencies: length of current is effectively constant
    useEffect(() => {
        const swap = () => {
            setTimeout(() => {
                setIndex(prev => (prev + 1) % current.length);
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
        { text: 'I\'ve slowly picked up Scala. And it has grown on me.' },
        { text: 'I\'ve been enjoying summer break! (I even travelled this time around)' },
        { text: 'I\'ve been catching up on sleep, this time for real' },
        { text: 'I\'ve gotten the chance to work with Terraform and AWS infra... which is fun-ish?' },
        { text: 'I\'ve played a good bit of Mahjong w/ friends/family' },
    ];

    return (
        <div className='w-full h-full'>
            <div
                className='sm:pt-12 sm:pl-8 sm:space-y-6 md:pt-24 md:pl-16 md:space-y-12 lg:pt-36 lg:px-18 lg:space-y-24'
            >
                <SequentialAnimation id='currently' context={{
                    time: { mode: 'uncontrolled', delay: 0.4, speed: 2.5 }
                }}>
                    <TegakiText
                        id='intro'
                        className='sm:text-4xl md:text-6xl  lg:text-7xl'
                    >
                        As of recently,
                    </TegakiText>
                    <RewritingTegakiText
                        id='activity'
                        orient='orient-top-left'
                        className='sm:text-3xl md:text-4xl lg:text-5xl'
                    >
                        {current[index].text}
                    </RewritingTegakiText>
                </SequentialAnimation>
            </div>
        </div>
    );
}