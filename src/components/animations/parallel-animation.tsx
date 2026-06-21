// builtin

// external
import { cloneElement, type ReactElement, useEffect, useState } from "react";

// internal
import type { TimedAnimation } from "./timed-animation";


interface ParallelAnimationProps extends TimedAnimation {
    children: ReactElement<TimedAnimation>[];
}

export default function ParallelAnimation({ children, onComplete }: ParallelAnimationProps) {
    const [finished, setFinished] = useState(0);

    useEffect(() => {
        if (finished === children.length) {
            onComplete?.();
        }
    }, [finished, children.length, onComplete])

    return (
        <div>
            {
                children.map((child) => {
                    const parallelProps: Partial<TimedAnimation> = {
                        key: child.props.id,
                        onComplete: () => {
                            if (finished < children.length - 1) {
                                setFinished(prev => prev + 1);
                            }
                        }
                    }

                    return cloneElement(child, parallelProps);
                })
            }
        </div>
    );
}