'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '../components/nav-bar';

export default function Page(){

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handlePress = (e: KeyboardEvent) => {
            if(e.code === 'Space'){
                setIndex((index + 1) % projects.length);
            }
        };

        window.addEventListener('keydown', handlePress);

        return () => {
            window.removeEventListener('keydown', handlePress);
        }
    }, [index]);

    const projects = [
        {
            title: 'PengDa', 
            description: 'A lightweight custom reinforcement learning model built using Java to play Mahjong complete with a scrappy (and crappy) UI', 
            link: 'https://github.com/LlanAiu/PengDa'
        },
        {
            title: 'Tuesday Once More',
            description: 'A web application designed to hold study problems used to review and retain class material',
            link: 'https://github.com/LlanAiu/tuesday-once-more'
        },
        {
            title: 'Crescendo Software',
            description: 'Robot Code for our team\'s 2024 robot. Yes, it\'s not my project, but this has much sentimental value',
            link: 'https://github.com/Team-4795/2024-Crescendo'
        },
        {
            title: 'LoggedRL',
            description: 'A trial-by-fire project for hackathons. The reinforcement learning framework itself is buggy as it stands, the logging looks fine',
            link: 'https://github.com/LlanAiu/LoggedRL'
        }
    ];

    return (
        <div className='w-full h-full'>
            <Navigation path='projects' />
            <div className='space-y-24 pt-24 pl-24'>
                <h1 className='text-5xl'><b>{projects[index].title}</b></h1>
                <p className='text-4xl'>{projects[index].description}</p>
                <div className='w-max h-max rounded-md p-2 bg-slate-200'>
                    <Link href={projects[index].link}>
                        <p className='text-3xl'>Project Link</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}