// builtin

// external
import { useState } from "react";
import { TegakiRenderer, type TegakiRendererProps, type TegakiEffectConfigs } from "tegaki";

// internal
import "./tegaki-preview.css";


type PreviewTegakiRendererProps = Omit<TegakiRendererProps<"div", TegakiEffectConfigs>, "children"> & {
    children: string;
    inkActive: boolean;
};

export default function PreviewTegakiRenderer({
    children,
    inkActive,
    onComplete,
    ...props
}: PreviewTegakiRendererProps) {
    const [preview, setPreview] = useState({ text: children, inkActive, complete: false });

    if (preview.text !== children || preview.inkActive !== inkActive) {
        setPreview({ text: children, inkActive, complete: false });
    }

    return (
        <TegakiRenderer
            {...props}
            data-handwriting-preview
            data-ink-active={inkActive}
            data-ink-complete={preview.complete}
            onComplete={() => {
                if (inkActive) {
                    setPreview({ text: children, inkActive, complete: true });
                    onComplete?.();
                }
            }}
        >
            {children}
        </TegakiRenderer>
    );
}
