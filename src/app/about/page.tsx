'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from './ProfileImage2.jpg';
import Navigation from '../components/nav-bar';

export default function Page(){
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handlePress = (e: KeyboardEvent) => {
            if(e.code === 'Space'){
                setIndex((index + 1) % descriptions.length);
            }
        };

        window.addEventListener('keydown', handlePress);

        return () => {
            window.removeEventListener('keydown', handlePress);
        }
    }, [index]);



    const descriptions = [
        {text: 'am I stat and (pre-)CS major', image: defaultImage},
        {text: 'am a student @ UNC-CH', image: defaultImage},
        {text: 'am a believer that problem-solving is an art form', image: defaultImage},
        {text: 'love playing cards with friends and family', image: defaultImage},
        {text: 'play the piano, although mostly as a meditation substitute', image: defaultImage},
        {text: 'am an FRC Alum', image: defaultImage},
        {text: 'am interested in machine learning and robotics', image: defaultImage},
        {text: 'am a retired swimmer', image: defaultImage}
    ];

    return (
        <div className='h-full w-full'>
            <Navigation path='about'/>
            <div className='w-full h-full flex'>
                <div className='pt-32 pl-32 inline-block flex-auto content-start space-y-24'>
                    <h1 className='text-6xl'><b>Mini Autobiography</b></h1>
                    <p className='text-6xl max-w-124'>
                        <b>I...</b>
                        <span className='w-10'> </span>
                        <span className='text-5xl leading-relaxed'>{descriptions[index].text}</span>
                    </p>
                </div>
                <div className='px-10 py-28 w-2/5 flex-initial content-start'>
                    <Image 
                        src={descriptions[index].image} 
                        alt='About me image' 
                        width={300} 
                        height={300}
                        className='inline-block'
                    />
                </div>
            </div>
        </div>
    );
}