// builtin

// external
import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

// internal
import { TextInitialX, TextInitialY } from "@/lib/animation/animation-utils";
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";


interface FadeBlockAnimationProps extends TimedAnimation, ForwardingComponent {
    children: ReactNode;
    orientation: 'vertical' | 'horizontal';
}

export default function FadeBlockAnimation({ children, orientation, index, groupIndex, onComplete, className, style }: FadeBlockAnimationProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (index !== undefined && groupIndex !== undefined) {
            if (groupIndex >= index) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        } else {
            setIsPlaying(false);
        }
    })

    const text = (orientation === 'horizontal') ? TextInitialX : TextInitialY;

    return (
        <motion.div
            className={className}
            animate={(isPlaying) ? "visible" : "hidden"}
            initial="hidden"
            variants={text}
            style={{ ...style, opacity: ((groupIndex ?? 0) >= (index ?? 0)) ? 1 : 0 }}
            onAnimationComplete={() => {
                if (isPlaying) {
                    onComplete?.()
                }
            }}
        >
            {children}
        </motion.div>
    );
}