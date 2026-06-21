// builtin

// external
import { TegakiRenderer } from "tegaki";
import bundle from "tegaki/fonts/caveat";

// internal
import type { TimedAnimation } from "../timed-animation";


interface TegakiTextProps extends TimedAnimation {
    children: string;
}

export default function TegakiText({ children, onComplete }: TegakiTextProps) {

    return (
        <TegakiRenderer
            font={bundle}
            onComplete={onComplete}
        >
            {children}
        </TegakiRenderer>
    );
}