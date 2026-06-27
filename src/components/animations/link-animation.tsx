// builtin

// external
import { cloneElement, type ReactElement } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import Link from "next/link";


interface LinkAnimationProps extends TimedAnimation {
    children: ReactElement<TimedAnimation>;
    href: string;
}

export default function LinkAnimationProps({ children, href, onComplete }: LinkAnimationProps) {

    return (
        <Link href={href}>
            {
                cloneElement(children, {
                    onComplete
                })
            }
        </Link>
    );
}