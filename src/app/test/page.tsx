'use client';

// builtin

// external
import { useRef, useState } from 'react';
import { TegakiRenderer, type TegakiRendererHandle } from 'tegaki';
import bundle from 'tegaki/fonts/caveat';

// internal

export default function TestPage() {
    const ref = useRef<TegakiRendererHandle>(null);
    const ref2 = useRef<TegakiRendererHandle>(null);

    const [count, setCount] = useState(0);
    const [playFirst, setPlayFirst] = useState(true);

    async function computeNewTimeline() {
        if (!ref.current?.engine || !ref2.current?.engine) {
            return;
        }
        ref.current.engine.pause();
        ref2.current.engine.pause();
        const engine = (playFirst) ? ref2.current.engine : ref.current.engine;

        const newDisplay = `Count: ${count + 1}`;
        const currentTimeline = engine.timeline.entries;
        const newTimeline = engine.computeTimeline(newDisplay).entries;

        let index = 0;
        while (index < currentTimeline.length && index < newTimeline.length) {
            if (currentTimeline[index].char !== newTimeline[index].char) {
                break;
            } else {
                index += 1;
            }
        }

        engine.seek(newTimeline[index].offset);
        setPlayFirst(prev => !prev);
        await new Promise(resolve => setTimeout(resolve, 300));
        setCount(s => s + 1);
        engine.play();
    }

    function debugTimeline() {
        console.log(ref.current?.engine?.timeline.entries)
    }

    const displayString = `Count: ${count}`;
    return (
        <>
            <div>
                <TegakiRenderer
                    ref={ref}
                    font={bundle}
                    time={{ mode: 'uncontrolled', speed: 1 }}
                    style={{ fontSize: 48, transition: 'opacity 0.3s ease-in-out', opacity: (playFirst) ? 1 : 0 }}
                >
                    {displayString}
                </TegakiRenderer>

                <TegakiRenderer
                    ref={ref2}
                    font={bundle}
                    time={{ mode: 'uncontrolled', speed: 1 }}
                    style={{ position: "absolute", top: 0, fontSize: 48, transition: 'opacity 0.3s ease-in-out', opacity: (playFirst) ? 0 : 1 }}
                >
                    {displayString}
                </TegakiRenderer>

            </div>

            <button type="button" onClick={computeNewTimeline}>+1</button>
            <button type="button" onClick={debugTimeline}>Debug</button>
        </>
    );
}