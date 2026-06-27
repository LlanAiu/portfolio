// builtin

// external
import { useContext, useState } from "react";
import { TegakiRenderer } from "tegaki";

// internal
import type { TimedAnimation } from "@/lib/animation/timed-animation";
import type { ForwardingComponent } from "@/lib/util/forwarding-component";
import { TegakiContext } from "@/lib/animation/tegaki-context";


export interface TegakiListProps extends TimedAnimation, ForwardingComponent {
    items: string[];
}

export default function TegakiList({ items, onComplete, style, className }: TegakiListProps) {
    const context = useContext(TegakiContext);
    const [visibleCount, setVisibleCount] = useState(1);

    return (
        <ul className={className} style={{ ...style, listStyleType: 'none', paddingLeft: 0, fontSize: '48px' }}>
            {items.map((text, index) => {
                if (index >= visibleCount) return null;

                return (
                    <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>•</span>
                        <TegakiRenderer
                            font={context.font}
                            time={context.time}
                            effects={context.effects}
                            onComplete={() => {
                                if (visibleCount === index + 1) {
                                    if (visibleCount < items.length) {
                                        setVisibleCount(prev => prev + 1);
                                    } else {
                                        onComplete?.();
                                    }
                                }
                            }}
                        >
                            {text}
                        </TegakiRenderer>
                    </li>
                );
            })}
        </ul>
    );
}