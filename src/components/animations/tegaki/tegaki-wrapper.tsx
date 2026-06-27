// builtin

// external
import { cloneElement, type ReactElement } from "react";

// internal
import { TegakiContext, type TegakiContextProvider } from "@/lib/animation/tegaki-context";
import type { TimedAnimation } from "@/lib/animation/timed-animation";


interface TegakiWrapperProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>;
}

export default function TegakiWrapper({ children, onComplete, context }: TegakiWrapperProps) {

    return (
        <TegakiContext value={context ?? {}}>
            {
                cloneElement(children, {
                    onComplete
                })
            }
        </TegakiContext>
    );
}