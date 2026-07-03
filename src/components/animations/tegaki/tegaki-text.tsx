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

export default function TegakiText({ children, className, style, index, groupIndex, onComplete }: TegakiTextProps) {
    const context = useContext(TegakiContext);
    const ref = useRef<TegakiRendererHandle>(null);

    useEffect(() => {
        if (index && groupIndex) {
            if (groupIndex < index) {
                ref.current?.engine?.seek(0);
                ref.current?.engine?.pause();
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
            style={style}
            onComplete={onComplete}
        >
            {children}
        </TegakiRenderer>
    );
}