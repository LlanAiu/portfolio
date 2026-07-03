// builtin
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Plain incorrect in the two cases */

// external
import { useContext, useEffect, useRef, useState } from "react";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki";

// internal
import "./rewriting-tegaki-text.css"
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";
import { TegakiContext } from "@/lib/animation/tegaki-context";


interface RewritingTegakiTextProps extends TimedAnimation, ForwardingComponent {
    children: string;
    orient: "orient-center" | "orient-center-left" | "orient-top-left";
}

export default function RewritingTegakiText({
    children: current,
    orient,
    index,
    groupIndex,
    onReset,
    onComplete,
    style,
    className
}: RewritingTegakiTextProps) {
    const context = useContext(TegakiContext);
    const ref1 = useRef<TegakiRendererHandle>(null);
    const ref2 = useRef<TegakiRendererHandle>(null);

    const [text1, setText1] = useState(current);
    const [text2, setText2] = useState(current);

    const [isLoaded, setIsLoaded] = useState(false);
    const [playFirst, setPlayFirst] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);


    useEffect(() => {
        const currentEngine = playFirst ? ref1.current?.engine : ref2.current?.engine;
        if (index && groupIndex) {
            if (groupIndex < index) {
                ref1.current?.engine?.seek(0);
                ref1.current?.engine?.pause();
                ref2.current?.engine?.seek(0);
                ref2.current?.engine?.pause();
            } else {
                currentEngine?.play();
            }
        } else {
            currentEngine?.play();
        }
    }, [index, groupIndex])

    useEffect(() => {
        if (isLoaded) {
            onReset?.();
            computeNewTimeline();
        } else {
            setIsLoaded(_ => true);
        }
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
            setTimeout(() => setText1(current), 300);
        } else {
            setText1(current);
            setTimeout(() => setText2(current), 300);
        }

        setPlayFirst(prev => !prev);

        await new Promise(resolve => setTimeout(resolve, 300));

        targetEngine.play();
        currentEngine.seek(1);
        setIsTransitioning(false);
    }

    return (
        <div className={className} style={{ ...style, position: 'relative', height: 80 }}>
            <TegakiRenderer
                ref={ref1}
                font={context.font}
                time={context.time}
                effects={context.effects}
                onComplete={onComplete}
                className={orient}
                style={{
                    width: "max-content",
                    position: "absolute",
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
                font={context.font}
                time={context.time}
                effects={context.effects}
                onComplete={onComplete}
                className={orient}
                style={{
                    width: "max-content",
                    position: "absolute",
                    zIndex: playFirst ? 1 : 2,
                    opacity: playFirst ? 0 : 1,
                    transition: playFirst ? 'opacity 0.3s ease-in-out' : 'opacity 0.3s',
                    pointerEvents: playFirst ? 'none' : 'auto'
                }}
            >
                {text2}
            </TegakiRenderer>
        </div>
    );
}