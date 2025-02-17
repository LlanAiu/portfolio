'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from './ProfileImage2.jpg';
import FRCImage from './FRC.jpg';
import bellTowerImage from './BellTower.jpg';
import Navigation from '../components/nav-bar';
import { motion } from 'motion/react';
import { TextChangeDelay, TextInitialX, TextSwapFade } from '../util/animUtil';
import clsx from 'clsx';

export default function Page() {
    const [index, setIndex] = useState(0);
    const [swap, setSwap] = useState(false);

    useEffect(() => {
        const handlePress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                setSwap(prev => !prev);
                setTimeout(() => {
                    setIndex(prev => (prev + 1) % descriptions.length);
                    setSwap(prev => !prev);
                }, TextChangeDelay * 1000);
            }
        };

        window.addEventListener('keydown', handlePress);

        return () => {
            window.removeEventListener('keydown', handlePress);
        }
    }, [index]);

    const descriptions = [
        {
            text: 'am I stat and (pre) CS major',
            image: defaultImage,
            dim: { width: 300, height: 300 }
        },
        {
            text: 'am a student @ UNC-CH',
            image: bellTowerImage,
            dim: { width: 300, height: 500 }
        },
        {
            text: 'love playing cards with friends and family',
            image: defaultImage,
            dim: { width: 300, height: 300 }
        },
        {
            text: 'play the piano, although mostly as a meditation substitute',
            image: defaultImage,
            dim: { width: 300, height: 300 }
        },
        {
            text: 'am an FRC Alum',
            image: FRCImage,
            dim: { width: 450, height: 300 }
        },
        {
            text: 'am interested in machine learning and robotics',
            image: defaultImage,
            dim: { width: 300, height: 300 }
        },
        {
            text: 'am a retired swimmer',
            image: defaultImage,
            dim: { width: 300, height: 300 }
        }
    ];

    const text = TextInitialX;
    const fade = TextSwapFade;

    return (
        <div className='h-full w-full'>
            <Navigation path='about' bg='#C4D7F2' text='#211C1F' bttn='#D1DBDA' hlght='#F0F7EE' />
            <motion.div
                className='w-full h-full'
                animate={{backgroundColor: '#AFDEDC', color: '#211C1F'}}
            >
                <motion.div
                    className='w-full h-full flex'
                    animate='visible'
                    initial='hidden'
                    variants={text}
                >
                    <motion.div className='pt-32 pl-32 inline-block flex-auto content-start space-y-24'>
                        <motion.h1
                            className='text-6xl'
                            variants={text}
                        >
                            <b>Mini Autobiography</b>
                        </motion.h1>
                        <motion.p
                            className='text-6xl max-w-124'
                            variants={text}
                        >
                            <b>I...</b>
                            <span className='w-10'> </span>
                            <motion.span
                                className='text-5xl leading-relaxed'
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
                        className='px-10 py-28 w-2/5 flex-initial content-start'
                        variants={text}
                    >
                        <motion.div
                            animate={clsx({
                                'out': swap,
                                'in': !swap
                            })}
                            variants={fade}
                        >
                            <Image
                                src={descriptions[index].image}
                                alt='About me image'
                                width={descriptions[index].dim.width}
                                height={descriptions[index].dim.height}
                                className='inline-block rounded-3xl'
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}