// builtin

// external
import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

// internal
import { TextInitialX } from "@/lib/animation/animation-utils";
import type { TimedAnimation } from "@/lib/animation/timed-animation";


interface DropFadeBlockProps extends TimedAnimation {
    children: ReactNode;
}

export default function DropFadeBlock({ children, index, groupIndex, onComplete }: DropFadeBlockProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (index !== undefined && groupIndex !== undefined) {
            if (groupIndex >= index) {
                setIsPlaying(true);
            }
        }
    })

    const text = TextInitialX;

    return (
        <motion.div
            className='w-max h-max rounded-md px-3 py-2.5'
            animate={(isPlaying) ? "visible" : "hidden"}
            initial="hidden"
            variants={text}
            style={{ opacity: ((groupIndex ?? 0) >= (index ?? 0)) ? 1 : 0 }}
            onAnimationComplete={onComplete}
        >
            {children}
        </motion.div>
    );
}