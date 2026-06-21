// builtin

// external
import { useState } from "react";
import { TegakiRenderer } from "tegaki";
import bundle from "tegaki/fonts/caveat";

// internal
import type { TimedAnimation } from "../timed-animation";


export interface TegakiListProps extends TimedAnimation {
    items: string[];
}

export default function TegakiList({ items, onComplete }: TegakiListProps) {
    const [visibleCount, setVisibleCount] = useState(1);

    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '48px' }}>
            {items.map((text, index) => {
                if (index >= visibleCount) return null;

                return (
                    <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>•</span>
                        <TegakiRenderer
                            font={bundle}
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