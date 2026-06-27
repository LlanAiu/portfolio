// builtin

// external
import { cloneElement, type Ref, type ReactElement } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import Link from "next/link";


interface LinkAnimationProps extends TimedAnimation {
    children: ReactElement<TimedAnimation>;
    href: string;
    ref?: Ref<HTMLAnchorElement>;
}

export default function LinkAnimation({ children, href, ref, onComplete }: LinkAnimationProps) {

    return (
        <Link href={href} ref={ref}>
            {
                cloneElement(children, {
                    onComplete
                })
            }
        </Link>
    );
}