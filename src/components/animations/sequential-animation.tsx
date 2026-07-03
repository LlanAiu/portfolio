// builtin

// external
import { cloneElement, type ReactElement, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface SequentialAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function SequentialAnimation({ children, index, groupIndex, onReset, onComplete, context }: SequentialAnimationProps) {
    const [playedCount, setPlayedCount] = useState(-1);

    const merged: TegakiSettings = mergeWithDefault(context);

    useEffect(() => {
        if (index && groupIndex) {
            if (groupIndex < index) {
                setPlayedCount(-1);
            } else {
                setPlayedCount(0);
            }
        } else {
            console.log("Starting sequential group")
            setPlayedCount(0);
        }
    }, [index, groupIndex])

    return (
        <TegakiContext value={merged ?? {}}>
            {children.map((child, childIndex) => {
                const sequenceProps: Partial<TimedAnimation> = {
                    key: child.props.id,
                    index: childIndex,
                    groupIndex: playedCount,
                    onReset: () => {
                        if (playedCount >= children.length - 1) {
                            onReset?.();
                        }
                        setPlayedCount(prev => Math.min(prev, childIndex));
                    },
                    onComplete: () => {
                        console.log(`On complete called from child: ${childIndex}`)
                        if (playedCount === childIndex) {
                            if (playedCount < children.length - 1) {
                                setPlayedCount(childIndex + 1);
                            } else {
                                onComplete?.();
                            }
                        }
                    }
                }

                return cloneElement(child, sequenceProps)
            })}
        </TegakiContext>
    );
}