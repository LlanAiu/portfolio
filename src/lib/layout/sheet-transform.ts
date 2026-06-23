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
            rotate: "0deg",
            translate: "0px 0px 0px"
        }
    }
    return {
        rotate: `${-transform.rotate_degs}deg`,
        translate: `${-transform.translate_left}px ${transform.translate_up}px 0px`
    }
}

export function buildBaseTransformSet(pages: number): SheetTransform[] {
    const transforms: SheetTransform[] = [];

    for (let i = 0; i < pages; i++) {
        transforms.push({
            rotate_degs: 1.2 * i,
            translate_up: i * (2 * Math.random() - 1),
            translate_left: 15 * i
        });
    }

    return transforms;
}

export function reviseTransformSetForHover(transforms: SheetTransform[], hoverIndex: number): SheetTransform[] {
    const newTransforms = structuredClone(transforms);

    for (let i = hoverIndex + 1; i < transforms.length; i++) {
        newTransforms[i] = {
            ...transforms[i],
            translate_left: transforms[i].translate_left + 15
        };
    }

    return newTransforms;
}
