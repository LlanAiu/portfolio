// builtin

// external
import { cloneElement, type ReactElement, useContext } from "react";

// internal
import { mergeWithDefault, TegakiContext, type TegakiSettings, type TegakiContextProvider } from "@/lib/animation/tegaki-context";
import type { TimedAnimation } from "@/lib/animation/timed-animation";


interface TegakiWrapperProps extends TimedAnimation, TegakiContextProvider {
    children: ReactElement<TimedAnimation>;
}

export default function TegakiWrapper({ children, index, groupIndex, onReset, onComplete, context }: TegakiWrapperProps) {
    const above = useContext(TegakiContext);
    const merged: TegakiSettings = mergeWithDefault({ ...above, ...context });

    return (
        <TegakiContext value={merged ?? {}}>
            {
                cloneElement(children, {
                    index,
                    groupIndex,
                    onReset,
                    onComplete
                })
            }
        </TegakiContext>
    );
}
