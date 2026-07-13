// builtin

// external
import { cloneElement, type ReactElement, useContext, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface ParallelAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function ParallelAnimation({ children, id, index, groupIndex, onReset, onComplete, context }: ParallelAnimationProps) {
    const [finished, setFinished] = useState<boolean[]>(new Array(children.length).fill(false));
    const [shouldPlay, setShouldPlay] = useState(-1);

    const above: TegakiSettings = useContext(TegakiContext);
    const merged: TegakiSettings = mergeWithDefault(context ?? above);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Just for logging
    useEffect(() => {
        console.log(`ID ${id}: index - ${index}; groupIndex - ${groupIndex}; shouldPlay: ${shouldPlay}`)
        if (index !== undefined && groupIndex !== undefined) {
            if (groupIndex < index) {
                setShouldPlay(-1);
            } else {
                console.log(`Playing parellel because ${groupIndex} >= ${index}`)
                setShouldPlay(1);
            }
        } else {
            console.log("playing parallel due to non-existance");
            setShouldPlay(1);
        }
    }, [index, groupIndex])

    // biome-ignore lint/correctness/useExhaustiveDependencies: Not correct
    useEffect(() => {
        if (finished.every(val => val)) {
            onComplete?.();
        }
    }, [finished])


    return (
        <TegakiContext value={merged ?? {}}>
            {
                children.map((child, index) => {
                    const parallelProps: Partial<TimedAnimation> = {
                        key: child.props.id,
                        index: 1,
                        groupIndex: shouldPlay,
                        onReset: () => {
                            if (finished.every(val => val)) {
                                onReset?.();
                            }
                            setFinished((prev) => {
                                const copy = [...prev]
                                copy[index] = false;
                                return copy;
                            });
                        },
                        onComplete: () => {
                            setFinished((prev) => {
                                const copy = [...prev]
                                copy[index] = true;
                                return copy;
                            });
                        }
                    }

                    return cloneElement(child, parallelProps);
                })
            }
        </TegakiContext>
    );
}