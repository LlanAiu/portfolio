// builtin

// external
import { cloneElement, type ReactElement, useContext, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface SequentialAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function SequentialAnimation({ children, id, index, groupIndex, onReset, onComplete, context }: SequentialAnimationProps) {
    const [playedCount, setPlayedCount] = useState(-1);
    const above: TegakiSettings = useContext(TegakiContext);
    const merged: TegakiSettings = mergeWithDefault(context ?? above);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Just for logging
    useEffect(() => {
        console.log(`ID ${id}: index - ${index}; groupIndex - ${groupIndex}; playedCount: ${playedCount}`)
        if (index !== undefined && groupIndex !== undefined) {
            if (groupIndex < index) {
                setPlayedCount(-1);
            } else if (groupIndex === index) {
                setPlayedCount(0);
            } else {
                setPlayedCount(prev => Math.max(prev, 0));
            }
        } else {
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