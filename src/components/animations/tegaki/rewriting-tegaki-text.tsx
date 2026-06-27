// builtin

// external

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { useEffect, useRef, useState } from "react";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki";
import bundle from "tegaki/fonts/caveat";


interface RewritingTegakiTextProps extends TimedAnimation {
    children: string;
}

export default function RewritingTegakiText({ children: current }: RewritingTegakiTextProps) {
    const ref1 = useRef<TegakiRendererHandle>(null);
    const ref2 = useRef<TegakiRendererHandle>(null);

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    const [playFirst, setPlayFirst] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: plain incorrect
    useEffect(() => {
        computeNewTimeline()
    }, [current])

    async function computeNewTimeline() {
        if (isTransitioning || !ref1.current?.engine || !ref2.current?.engine) {
            return;
        }
        setIsTransitioning(true);

        const currentEngine = playFirst ? ref1.current.engine : ref2.current.engine;
        const targetEngine = playFirst ? ref2.current.engine : ref1.current.engine;

        currentEngine.pause();
        targetEngine.pause();

        const currentTimeline = currentEngine.timeline.entries;
        const newTimeline = targetEngine.computeTimeline(current).entries;

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
            setText2(current);
        } else {
            setText1(current);
        }

        setPlayFirst(prev => !prev);

        await new Promise(resolve => setTimeout(resolve, 300));

        targetEngine.play();
        if (playFirst) {
            setText2(current);
        } else {
            setText1(current);
        }
        setIsTransitioning(false);
    }

    return (
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
                    transition: playFirst ? 'opacity 0.3s' : 'opacity 0.3s ease-in-out',
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
                    transition: playFirst ? 'opacity 0.3s ease-in-out' : 'opacity 0.3s',
                    pointerEvents: playFirst ? 'none' : 'auto'
                }}
            >
                {text2}
            </TegakiRenderer>
        </div >
    );
}