/** biome-ignore-all lint/a11y/noStaticElementInteractions: Needed for custom functionality */
// builtin

// external
import { useMemo, useState } from "react";

// internal
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import { buildBaseTransformSet, reviseTransformSetForHover, type SheetTransform } from "@/lib/layout/sheet-transform";
import SheetPanel from "./sheet-panel";


interface SheetNavigationProps {
    activeEndpoint: string;
    sections: NavigationSection[];
    children: React.ReactNode;
}


export default function SheetNavigation({ activeEndpoint, sections, children }: SheetNavigationProps) {
    const [isActive, setIsActive] = useState(false);
    const baseTransforms = useMemo<SheetTransform[]>(() => buildBaseTransformSet(sections.length), [sections.length]);
    const [transforms, setTransform] = useState<SheetTransform[]>(baseTransforms);

    const sectionCopy = [
        ...sections.filter(section => section.endpoint !== activeEndpoint)
    ];
    const activeSection = sections.find(section => section.endpoint === activeEndpoint);
    if (activeSection) {
        sectionCopy.push(activeSection);
    }

    function setFocusedSection(index: number) {
        setTransform(_ => reviseTransformSetForHover(baseTransforms, index));
    }

    return (
        <div className="relative h-full">
            <button
                type="button"
                className="absolute bottom-1 right-1 z-40 bg-blue-300 p-2 rounded-md"
                onClick={() => setIsActive(prev => !prev)}
            >
                Toggle
            </button>

            <div onMouseLeave={() => setTransform(_ => baseTransforms)}>
                {
                    sectionCopy.map((section, index) => {
                        if (index === sections.length - 1) {
                            return (
                                <SheetPanel
                                    key={section.name}
                                    section={section}
                                    sheetTransform={transforms[index]}
                                    onHover={() => setFocusedSection(index)}
                                    transformActive={isActive}
                                    isMain={true}
                                >
                                    {children}
                                </SheetPanel>
                            )
                        }
                        return (
                            <SheetPanel
                                key={section.name}
                                section={section}
                                sheetTransform={transforms[index]}
                                onHover={() => setFocusedSection(index)}
                                transformActive={isActive}
                                isMain={false}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}