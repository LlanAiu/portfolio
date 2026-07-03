"use client"
// builtin

// external
import { useState } from "react";

// internal
import ParallelAnimation from "@/components/animations/parallel-animation";
import SequentialAnimation from "@/components/animations/sequential-animation";
import RewritingTegakiText from "@/components/animations/tegaki/rewriting-tegaki-text";
import TegakiText from "@/components/animations/tegaki/tegaki-text";


export default function TestPage() {

    const [flip, setFlip] = useState(false);

    const display = flip ? "what is this?" : "what am I?";

    return (
        <div>
            <SequentialAnimation id='first' context={{ time: { mode: 'uncontrolled', speed: 2.4 } }}>
                <TegakiText id="first-text">Hello</TegakiText>
                <ParallelAnimation id='parellel'>
                    <RewritingTegakiText id="rewrite-one" orient="orient-top-left">{display}</RewritingTegakiText>
                    <TegakiText id="second-text">Nothing much</TegakiText>
                </ParallelAnimation>
                <SequentialAnimation id="sequence-two">
                    <RewritingTegakiText id="rewrite-two" orient="orient-top-left">{display}</RewritingTegakiText>
                    <TegakiText id="third-text">Oops again?</TegakiText>
                </SequentialAnimation>
            </SequentialAnimation>

            <button type="button" onClick={() => setFlip(prev => !prev)}>Toggle</button>
        </div>
    );
}