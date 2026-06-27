// builtin

// external
import { createContext } from "react";
import type { TegakiBundle, TegakiEffectConfigs, TimeControlProp } from "tegaki";
import bundle from "tegaki/fonts/caveat";

// internal

export interface TegakiSettings {
    font?: string | TegakiBundle;
    time?: TimeControlProp;
    effects?: TegakiEffectConfigs
}

export interface TegakiContextProvider {
    context?: TegakiSettings;
}

export const TegakiContext = createContext<TegakiSettings>({
    font: bundle
});