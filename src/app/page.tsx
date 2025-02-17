'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { TextChangeDelay, TextInitialY, TextSwapFade } from './util/animUtil';

export default function Home() {

	const [display, setDisplay] = useState(3);
	const [anim, setAnimate] = useState(true);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				setTimeout(() => {
					setDisplay(prev => (prev + 1) % (links.length - 1));
				}, TextChangeDelay * 1000);
				setAnimate(prev => !prev);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [display]);

	const links = [
		{ text: 'contemplate a day in my life', link: './current' },
		{ text: 'read my sparse autobiography', link: './about' },
		{ text: 'attend my project gallery', link: './projects' },
		{ text: 'Press [Space]', link: './' }
	];

	const text = TextInitialY;

	const linkVar = TextSwapFade;

	return (
		<motion.div
			className='w-screen h-screen'
			animate={{backgroundColor: '#F5F0F6', color: '#2B4162'}}
		>
			<motion.div
				className='pt-24 text-center space-y-20'
				initial='hidden'
				animate='visible'
				variants={text}
			>
				<motion.h1 className='text-7xl' variants={text}><b>Hello There</b></motion.h1>
				<motion.h1 className='text-5xl' variants={text}>I'm Alan Liu</motion.h1>
				<motion.p className='text-2xl' variants={text}>Since you're here already, why don't you...</motion.p>
				<motion.div className='my-10' variants={text}>
					<Link href={links[display].link}>
						<motion.p
							className='text-3xl absolute w-full text-center'
							animate={clsx({
								'in': anim,
								'out': !anim
							})}
							variants={linkVar}
						>
							{links[display].text}
						</motion.p>
						<motion.p
							className='text-3xl absolute w-full text-center'
							animate={clsx({
								'out': anim,
								'in': !anim
							})}
							variants={linkVar}
						>
							{links[display].text}
						</motion.p>
					</Link>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
