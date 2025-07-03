'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from './images/ProfileImage2.jpg';
import FRCImage from './images/FRC.jpg';
import bellTowerImage from './images/BellTower.jpg';
import kouryImage from './images/Koury.jpg';
import roboticsImage from './images/Robotics.jpg';
import cardsImage from './images/Cards.jpg';
import Navigation from '../components/nav-bar';
import { motion } from 'motion/react';
import { TextChangeDelay, TextInitialX, TextSwapFade } from '../util/animUtil';
import clsx from 'clsx';

export default function Page() {
    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
            text: 'am a stat and CS major',
            image: defaultImage,
            dim: { width: 1581, height: 1702 },
        },
        {
            text: 'am a student @ UNC-CH',
            image: bellTowerImage,
            dim: { width: 300, height: 500 }
        },
        {
            text: 'love playing cards with friends and family',
            image: cardsImage,
            dim: { width: 375, height: 350 }
        },
        {
            text: 'am an FRC Alum',
            image: FRCImage,
            dim: { width: 450, height: 300 }
        },
        {
            text: 'am interested in machine learning and robotics',
            image: roboticsImage,
            dim: { width: 400, height: 300 }
        },
        {
            text: 'am a retired swimmer',
            image: kouryImage,
            dim: { width: 275, height: 300 }
        }
    ];

    const text = TextInitialX;
    const fade = TextSwapFade;

    return (
        <div className='h-full w-full'>
            <Navigation path='about' bg='#C4D7F2' text='#211C1F' bttn='#D1DBDA' hlght='#F0F7EE' />
            <motion.div
                className='w-full h-full'
                animate={{ backgroundColor: '#AFDEDC', color: '#211C1F' }}
            >
                <motion.div
                    className='w-full h-full flex flex-col md:flex-row'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.div className='pt-8 md:pt-32 px-4 md:pl-32 md:inline-block flex-initial content-start space-y-8 md:space-y-24 text-center md:text-left'>
                        <motion.h1
                            className='text-4xl md:text-6xl'
                            variants={text}
                        >
                            <b>Mini Autobiography</b>
                        </motion.h1>
                        <motion.p
                            className='text-4xl md:text-6xl max-w-full md:max-w-124'
                            variants={text}
                        >
                            <b>I...</b>
                            <span className='w-2 md:w-10'> </span>
                            <motion.span
                                className='text-3xl md:text-5xl leading-relaxed'
                                animate={clsx({
                                    'out': swap,
                                    'in': !swap
                                })}
                                variants={fade}
                            >
                                {descriptions[index].text}
                            </motion.span>
                        </motion.p>
                    </motion.div>
                    <motion.div
                        className='px-4 py-8 md:px-10 md:py-28 w-full md:w-2/5 flex-auto content-start text-center md:text-left'
                        variants={text}
                    >
                        <motion.div
                            animate={clsx({
                                'out': swap,
                                'in': !swap
                            })}
                            variants={fade}
                        >
                            {!isMobile &&
                                <Image
                                    src={descriptions[index].image}
                                    alt='About me image'
                                    priority={true}
                                    className='inline-block rounded-3xl'
                                />
                            }

                            {isMobile &&
                                <Image
                                    src={descriptions[index].image}
                                    alt='About me image'
                                    priority={true}
                                    className='rounded-3xl'
                                />
                            }
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}