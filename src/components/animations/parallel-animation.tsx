// builtin

// external
import { cloneElement, type ReactElement, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface ParallelAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function ParallelAnimation({ children, index, groupIndex, onReset, onComplete, context }: ParallelAnimationProps) {
    const [finished, setFinished] = useState<boolean[]>(new Array(children.length).fill(false));
    const [shouldPlay, setShouldPlay] = useState(false);

    useEffect(() => {
        if (index && groupIndex) {
            if (groupIndex < index) {
                setShouldPlay(false);
            } else {
                setShouldPlay(true);
            }
        } else {
            setShouldPlay(true);
        }
    }, [index, groupIndex])

    // biome-ignore lint/correctness/useExhaustiveDependencies: Not correct
    useEffect(() => {
        if (finished.every(val => val)) {
            onComplete?.();
        }
    }, [finished])


    const merged: TegakiSettings = mergeWithDefault(context);

    return (
        <TegakiContext value={merged ?? {}}>
            {
                children.map((child, index) => {
                    const parallelProps: Partial<TimedAnimation> = {
                        key: child.props.id,
                        index: 1,
                        groupIndex: shouldPlay ? 1 : 0,
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