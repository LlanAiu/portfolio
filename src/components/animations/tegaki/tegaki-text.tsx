// builtin

// external
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki";
import { useContext, useEffect, useRef } from "react";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";
import { TegakiContext } from "@/lib/animation/tegaki-context";


interface TegakiTextProps extends TimedAnimation, ForwardingComponent {
    children: string;
}

export default function TegakiText({ children, id, className, style, index, groupIndex, onComplete }: TegakiTextProps) {
    const context = useContext(TegakiContext);
    const ref = useRef<TegakiRendererHandle>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Just for logging
    useEffect(() => {
        console.log(`${id}: index ${index}; groupIndex ${groupIndex}`);
        if (index !== undefined && groupIndex !== undefined) {
            if (groupIndex < index) {
                ref.current?.engine?.seek(0);
                ref.current?.engine?.pause();
            } else if (groupIndex === index) {
                ref.current?.engine?.seek(0);
                ref.current?.engine?.play();
            } else {
                ref.current?.engine?.play();
            }
        } else {
            ref.current?.engine?.play();
        }
    }, [index, groupIndex])

    return (
        <TegakiRenderer
            ref={ref}
            font={context.font}
            time={context.time}
            effects={context.effects}
            className={className}
            style={{ ...style, opacity: ((groupIndex ?? 0) >= (index ?? 0)) ? 1 : 0 }}
            onComplete={onComplete}
        >
            {children}
        </TegakiRenderer>
    );
}