// builtin

// external
import { TegakiRenderer } from "tegaki";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";
import { useContext } from "react";
import { TegakiContext } from "@/lib/animation/tegaki-context";


interface TegakiTextProps extends TimedAnimation, ForwardingComponent {
    children: string;
}

export default function TegakiText({ children, className, style, onComplete }: TegakiTextProps) {
    const context = useContext(TegakiContext);

    return (
        <TegakiRenderer
            font={context.font}
            time={context.time}
            effects={context.effects}
            className={className}
            style={style}
            onComplete={onComplete}
        >
            {children}
        </TegakiRenderer>
    );
}