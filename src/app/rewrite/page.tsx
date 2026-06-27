"use client"
// builtin

// external
import { useState } from "react";

// internal
import RewritingTegakiText from "@/components/animations/tegaki/rewriting-tegaki-text";


export default function RewritePage() {

    const [first, setFirst] = useState(false);

    const current = "What is this?";
    const next = "What am I?";

    return (
        <>
            <RewritingTegakiText id="rewrite1">
                {first ? current : next}
            </RewritingTegakiText>

            <button type="button" onClick={() => setFirst(prev => !prev)}>Toggle</button>
        </>
    );
}