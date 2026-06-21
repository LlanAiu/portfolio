// builtin

// external
import { TegakiRenderer } from "tegaki";
import bundle from "tegaki/fonts/caveat";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";


interface TegakiTextProps extends TimedAnimation, ForwardingComponent {
    children: string;
}

export default function TegakiText({ children, className, style, onComplete }: TegakiTextProps) {

    return (
        <TegakiRenderer
            font={bundle}
            className={className}
            style={style}
            onComplete={onComplete}
        >
            {children}
        </TegakiRenderer>
    );
}