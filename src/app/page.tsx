'use client'
// builtin

// external
import { useEffect, useState, useRef } from 'react';

// internal
import SequentialAnimation from '@/components/animations/sequential-animation';
import TegakiText from '@/components/animations/tegaki/tegaki-text';
import RewritingTegakiText from '@/components/animations/tegaki/rewriting-tegaki-text';
import LinkAnimation from '@/components/animations/link-animation';


export default function Home() {
    const [display, setDisplay] = useState(3);
    const [initialText, setInitialText] = useState('Press [Space]');
    const linkRef = useRef<HTMLAnchorElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Only used for keyboard/touchscreen controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' && !(linkRef.current?.contains(event.target as Node))) {
                setDisplay(prev => (prev + 1) % (links.length - 1));
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (!(linkRef.current?.contains(event.target as Node))) {
                setDisplay(prev => (prev + 1) % (links.length - 1));
            }
        };

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setInitialText('Tap on screen');
        }

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [display]);

    const links = [
        { text: 'take a look at some projects?', link: './projects' },
        { text: 'introduce ourselves? (or just me)', link: './about' },
        { text: 'catch up on how life\'s going?', link: './current' },
        { text: initialText, link: './' }
    ];

    return (
        <div className='pt-6 text-center space-y-10 md:space-y-16'>
            <SequentialAnimation id='home' context={{
                time: { mode: 'uncontrolled', speed: 3 }
            }}>
                <TegakiText id='hello'>Hello There!</TegakiText>
                <TegakiText id='name'>I'm Alan Liu.</TegakiText>
                <TegakiText id='suggestion'>Since you're here already, why don't we</TegakiText>
                <LinkAnimation id='link' href={links[display].link} ref={linkRef}>
                    <RewritingTegakiText id='link-text' className='m-auto'>{links[display].text}</RewritingTegakiText>
                </LinkAnimation>
            </SequentialAnimation>
        </div>
    );
}
