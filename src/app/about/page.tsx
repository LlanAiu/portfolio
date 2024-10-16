'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from './ProfileImage2.jpg';

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
            <h1>About Me</h1>
            <p> I... </p>
            <p>{descriptions[index].text}</p>
            <Image src={descriptions[index].image} alt='Image of Me' width={200} height={200}/>
        </div>
    );
}