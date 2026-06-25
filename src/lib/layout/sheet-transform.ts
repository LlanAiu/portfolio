// builtin

// external
import type { CSSProperties } from "react";

// internal


export interface SheetTransform {
    rotate_degs: number;
    translate_up: number;
    translate_left: number;
}

export function sheetTransformToCSS(transform: SheetTransform, active: boolean): CSSProperties {
    if (active) {
        return {
            rotate: `${-transform.rotate_degs}deg`,
            translate: `${-transform.translate_left}px ${transform.translate_up}px 0px`
        }
    }
    return {
        rotate: "0deg",
        translate: "0px 0px 0px"
    }
}

export function buildBaseTransformSet(pages: number): SheetTransform[] {
    const transforms: SheetTransform[] = [];

    for (let i = 0; i < pages; i++) {
        transforms.push({
            rotate_degs: 1.3 * i,
            translate_up: 5 + 2.4 * i * (- 1) ** i,
            translate_left: 20 * i
        });
    }

    return transforms;
}

export function reviseTransformSetForHover(baseTransforms: SheetTransform[], hoverIndex: number): SheetTransform[] {
    const newTransforms = structuredClone(baseTransforms);

    for (let i = hoverIndex + 1; i < baseTransforms.length; i++) {
        newTransforms[i] = {
            ...baseTransforms[i],
            translate_left: baseTransforms[i].translate_left + 35
        };
    }

    return newTransforms;
}
