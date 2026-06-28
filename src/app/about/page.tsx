'use client'
// builtin

// external
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import clsx from 'clsx';

// internal
import defaultImage from '../../../public/ProfileImage2.jpg';
import FRCImage from '../../../public/FRC.jpg';
import bellTowerImage from '../../../public/BellTower.jpg';
import kouryImage from '../../../public/Koury.jpg';
import roboticsImage from '../../../public/Robotics.jpg';
import cardsImage from '../../../public/Cards.jpg';
import Navigation from '@/components/layout/nav-bar';
import { TextChangeDelay, TextInitialX, TextSwapFade } from '@/lib/animation/animation-utils';
import SequentialAnimation from '@/components/animations/sequential-animation';
import TegakiText from '@/components/animations/tegaki/tegaki-text';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';

export default function AboutPage() {
    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: descriptions length is effectively constant
    useEffect(() => {
        const swap = () => {
            setSwap(prev => !prev);
            setTimeout(() => {
                setIndex(prev => (prev + 1) % descriptions.length);
                setSwap(prev => !prev);
            }, TextChangeDelay * 1000);
        }

        const handlePress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                swap();
            }
        };

        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const handleTouchStart = (e: TouchEvent) => {
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

    const descriptions = [
        {
            text: 'I am a stat and CS major',
            image: defaultImage,
            dim: { width: 500, height: 600 }
        },
        {
            text: 'I am a student @ UNC-CH',
            image: bellTowerImage,
            dim: { width: 300, height: 500 }
        },
        {
            text: 'I love playing cards with friends and family',
            image: cardsImage,
            dim: { width: 375, height: 350 }
        },
        {
            text: 'I am an FRC Alum',
            image: FRCImage,
            dim: { width: 450, height: 300 }
        },
        {
            text: 'I am interested in machine learning and robotics',
            image: roboticsImage,
            dim: { width: 400, height: 300 }
        },
        {
            text: 'I am a retired swimmer',
            image: kouryImage,
            dim: { width: 275, height: 300 }
        }
    ];

    const text = TextInitialX;
    const fade = TextSwapFade;

    return (
        <div
            className='w-full h-full flex flex-col md:flex-row'
        >
            <div className='pt-8 px-4 md:inline-block flex-initial content-start space-y-8 md:space-y-24 text-center md:text-left'>
                <SequentialAnimation id='about' context={{
                    time: { mode: 'uncontrolled', delay: 0.4, speed: 2.5 }
                }}>
                    <TegakiText
                        id='title'
                        className='text-4xl md:text-6xl'
                    >
                        Mini Autobiography
                    </TegakiText>
                    <RewritingTegakiText
                        id='fact'
                        className='text-3xl md:text-5xl'
                    >
                        {descriptions[index].text}
                    </RewritingTegakiText>
                </SequentialAnimation>
            </div>
            <motion.div
                className='p-10 h-full w-full md:w-1/2 flex-auto content-start text-center md:text-left'
                variants={text}
            >
                <motion.div
                    animate={clsx({
                        'out': swap,
                        'in': !swap
                    })}
                    variants={fade}
                >
                    <div className='max-h-full h-full'>
                        {!isMobile &&
                            <Image
                                src={descriptions[index].image}
                                alt='About me image'
                                loading='eager'
                                className='object-contain rounded-3xl'
                            />
                        }

                        {isMobile &&
                            <Image
                                src={descriptions[index].image}
                                alt='About me image'
                                className='rounded-3xl'
                            />
                        }
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}