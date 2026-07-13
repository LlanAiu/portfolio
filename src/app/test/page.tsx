"use client"
// builtin

// external
import { useState } from "react";

// internal
import ParallelAnimation from "@/components/animations/parallel-animation";
import SequentialAnimation from "@/components/animations/sequential-animation";
import RewritingTegakiText from "@/components/animations/tegaki/rewriting-tegaki-text";
import TegakiText from "@/components/animations/tegaki/tegaki-text";
import FadeBlockAnimation from "@/components/animations/motion/fade-block";


export default function TestPage() {

    const [flip, setFlip] = useState(false);

    const display = flip ? "what is this?" : "what am I?";

    return (
        <div>
            <SequentialAnimation id='outer' context={{ time: { mode: 'uncontrolled', speed: 2.4 } }}>
                <TegakiText id="standalone-text">Hello</TegakiText>
                <ParallelAnimation id='parellel'>
                    <RewritingTegakiText id="parellel-rewrite" orient="orient-top-left">{display}</RewritingTegakiText>
                    <TegakiText id="parallel-text">Nothing much</TegakiText>
                </ParallelAnimation>
                <SequentialAnimation id="sequence">
                    <RewritingTegakiText id="sequence-rewrite" orient="orient-top-left">{display}</RewritingTegakiText>
                    <TegakiText id="sequence-text">Oops again?</TegakiText>
                </SequentialAnimation>
                <FadeBlockAnimation id="fade-block" orientation="vertical">
                    <div>
                        Hello there
                    </div>
                </FadeBlockAnimation>
            </SequentialAnimation>

            <button type="button" onClick={() => setFlip(prev => !prev)}>Toggle</button>
        </div>
    );
}