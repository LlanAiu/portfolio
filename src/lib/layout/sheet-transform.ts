// builtin

// external

// internal


interface SheetTransform {
    rotate_degs: number;
    translate_up: number;
    translate_left: number;
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
