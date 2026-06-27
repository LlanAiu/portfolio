// builtin

// external
import { cloneElement, type ReactElement, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { TegakiContext, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface SequentialAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function SequentialAnimation({ children, onComplete, context }: SequentialAnimationProps) {
    const [playedCount, setPlayedCount] = useState(1);

    return (
        <TegakiContext value={context ?? {}}>
            {children.map((child, index) => {
                if (index >= playedCount) return null;

                const sequenceProps: Partial<TimedAnimation> = {
                    key: child.props.id,
                    onComplete: () => {
                        if (playedCount === index + 1) {
                            if (playedCount < children.length) {
                                setPlayedCount(prev => prev + 1);
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