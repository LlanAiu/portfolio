// builtin

// external
import { cloneElement, type ReactElement, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import { TegakiContext, type TegakiContextProvider } from "@/lib/animation/tegaki-context";


interface ParallelAnimationProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>[];
}

export default function ParallelAnimation({ children, onComplete, context }: ParallelAnimationProps) {
    const [finished, setFinished] = useState(0);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Not correct
    useEffect(() => {
        if (finished === children.length) {
            onComplete?.();
        }
    }, [finished])

    return (
        <TegakiContext value={context ?? {}}>
            {
                children.map((child) => {
                    const parallelProps: Partial<TimedAnimation> = {
                        key: child.props.id,
                        onComplete: () => {
                            if (finished < children.length) {
                                setFinished(prev => prev + 1);
                            }
                        }
                    }

                    return cloneElement(child, parallelProps);
                })
            }
        </TegakiContext>
    );
}