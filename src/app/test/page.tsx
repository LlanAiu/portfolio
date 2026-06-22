'use client';
// builtin

// external
import { useRef, useState } from 'react';
import { TegakiRenderer, type TegakiRendererHandle } from 'tegaki';
import bundle from 'tegaki/fonts/caveat';

// internal

export default function PerfectFadingPage() {
    const ref1 = useRef<TegakiRendererHandle>(null);
    const ref2 = useRef<TegakiRendererHandle>(null);

    const [text1, setText1] = useState("Count: 0");
    const [text2, setText2] = useState("Count: 0");

    const [count, setCount] = useState(0);
    const [playFirst, setPlayFirst] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    async function computeNewTimeline() {
        if (isTransitioning || !ref1.current?.engine || !ref2.current?.engine) {
            return;
        }
        setIsTransitioning(true);

        const nextCount = count + 1;
        const nextDisplay = `Count: ${nextCount}`;

        const currentEngine = playFirst ? ref1.current.engine : ref2.current.engine;
        const targetEngine = playFirst ? ref2.current.engine : ref1.current.engine;

        currentEngine.pause();
        targetEngine.pause();

        const currentTimeline = currentEngine.timeline.entries;
        const newTimeline = targetEngine.computeTimeline(nextDisplay).entries;

        let index = 0;
        while (index < currentTimeline.length && index < newTimeline.length) {
            if (currentTimeline[index].char !== newTimeline[index].char) {
                break;
            } else {
                index += 1;
            }
        }

        targetEngine.seek(newTimeline[index]?.offset || 0);

        if (playFirst) {
            setText2(nextDisplay);
        } else {
            setText1(nextDisplay);
        }

        setPlayFirst(prev => !prev);

        await new Promise(resolve => setTimeout(resolve, 300));

        targetEngine.play();

        setCount(nextCount);
        setIsTransitioning(false);
    }

    return (
        <>
            <div style={{ position: 'relative', height: 80 }}>
                <TegakiRenderer
                    ref={ref1}
                    font={bundle}
                    time={{ mode: 'uncontrolled', speed: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        fontSize: 48,
                        zIndex: playFirst ? 2 : 1,
                        opacity: playFirst ? 1 : 0,
                        transition: playFirst ? 'none' : 'opacity 0.3s ease-in-out',
                        pointerEvents: playFirst ? 'auto' : 'none'
                    }}
                >
                    {text1}
                </TegakiRenderer>

                <TegakiRenderer
                    ref={ref2}
                    font={bundle}
                    time={{ mode: 'uncontrolled', speed: 1 }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        fontSize: 48,
                        zIndex: playFirst ? 1 : 2,
                        opacity: playFirst ? 0 : 1,
                        transition: playFirst ? 'opacity 0.3s ease-in-out' : 'none',
                        pointerEvents: playFirst ? 'none' : 'auto'
                    }}
                >
                    {text2}
                </TegakiRenderer>
            </div>

            <div style={{ marginTop: 20 }}>
                <button type="button" disabled={isTransitioning} onClick={computeNewTimeline}>+1</button>
            </div>
        </>
    );
}