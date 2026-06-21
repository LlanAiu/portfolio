// builtin

// external
import { cloneElement, type ReactElement, useState } from "react";

// internal
import type { TimedAnimation } from "./timed-animation";


interface SequentialAnimationProps extends TimedAnimation {
    children: ReactElement<TimedAnimation>[];
}

export default function SequentialAnimation({ children, onComplete }: SequentialAnimationProps) {
    const [playedCount, setPlayedCount] = useState(1);

    return (
        <div>
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
        </div>
    );
}