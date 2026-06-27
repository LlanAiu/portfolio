// builtin

// external
import { cloneElement, type ReactElement } from "react";

// internal
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";
import type { TimedAnimation } from "@/lib/animation/timed-animation";


interface TegakiWrapperProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>;
}

export default function TegakiWrapper({ children, onComplete, context }: TegakiWrapperProps) {

    const merged: TegakiSettings = mergeWithDefault(context);

    return (
        <TegakiContext value={merged ?? {}}>
            {
                cloneElement(children, {
                    onComplete
                })
            }
        </TegakiContext>
    );
}