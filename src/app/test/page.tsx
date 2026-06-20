'use client';
// builtin

// external

// internal
import { TegakiRenderer } from "tegaki";
import bundle from "tegaki/fonts/caveat";


export default function TestPage() {
    return (
        <TegakiRenderer
            font={bundle}
            time={{ mode: 'uncontrolled', speed: 1, loop: true }}
            style={{ fontSize: 48 }}
        >
            Hello World
        </TegakiRenderer>
    );
}