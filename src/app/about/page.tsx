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
        <div>
            <Navigation path='about'/>
            <div className='w-full h-full'>
                <div className='p-32 inline-block w-3/5 h-full'>
                    <h1 className='text-5xl mb-20'><b>About Me</b></h1>
                    <p className='text-4xl my-10'><b>I...</b></p>
                    <p className='text-3xl my-10'>{descriptions[index].text}</p>
                </div>
                <div className='p-10 inline-block w-2/5'>
                    <Image 
                        src={descriptions[index].image} 
                        alt='About me image' 
                        width={200} 
                        height={200}
                        className='inline-block'
                    />
                </div>
                
            </div>
        </div>
    );
}