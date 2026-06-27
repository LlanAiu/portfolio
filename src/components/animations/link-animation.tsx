// builtin

// external
import Link from "next/link";
import { cloneElement, type Ref, type ReactElement } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";


interface LinkAnimationProps extends TimedAnimation, ForwardingComponent {
    children: ReactElement<TimedAnimation>;
    href: string;
    ref?: Ref<HTMLAnchorElement>;
}

export default function LinkAnimation({ children, href, ref, onComplete, style, className }: LinkAnimationProps) {

    return (
        <Link href={href} ref={ref} className={className} style={style}>
            {
                cloneElement(children, {
                    onComplete
                })
            }
        </Link>
    );
}