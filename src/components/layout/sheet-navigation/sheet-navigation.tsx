/** biome-ignore-all lint/a11y/noStaticElementInteractions: Needed for custom functionality */
"use client"
// builtin

// external
import { useEffect, useMemo, useState } from "react";

// internal
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import { buildBaseTransformSet, reviseTransformSetForHover, type SheetTransform } from "@/lib/layout/sheet-transform";
import SheetPanel from "./sheet-panel";
import { usePathname } from "next/navigation";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";


interface SheetNavigationProps {
    sections: NavigationSection[];
    children: React.ReactNode;
}


export default function SheetNavigation({ sections, children }: SheetNavigationProps) {
    const activeEndpoint = usePathname();
    const isTouchDevice = useIsTouchDevice();
    const [isActive, setIsActive] = useState(false);
    const baseTransforms = useMemo<SheetTransform[]>(() => buildBaseTransformSet(sections.length, isTouchDevice), [sections.length, isTouchDevice]);
    const [transforms, setTransform] = useState<SheetTransform[]>(baseTransforms);
    const displaySections = useMemo<NavigationSection[]>(() => {
        const sectionCopy = [
            ...sections.filter(section => section.endpoint !== activeEndpoint)
        ];
        const activeSection = sections.find(section => section.endpoint === activeEndpoint);
        if (activeSection) {
            sectionCopy.push(activeSection);
        }
        return sectionCopy;
    }, [sections, activeEndpoint])

    // biome-ignore lint/correctness/useExhaustiveDependencies: close on endpoint change
    useEffect(() => {
        setIsActive(_ => false);
    }, [activeEndpoint]);

    function setFocusedSection(index: number) {
        if (!isTouchDevice) {
            setTransform(_ => reviseTransformSetForHover(baseTransforms, index));
        }
    }

    return (
        <div className="relative h-full">
            <button
                type="button"
                className="absolute bottom-1 right-1 z-40 bg-blue-300 p-2 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsActive(prev => !prev);
                }}
                onTouchStart={(e) => {
                    e.stopPropagation();
                }}
            >
                Toggle
            </button>

            <div onMouseLeave={() => setTransform(_ => baseTransforms)}>
                {
                    displaySections.map((section, index) => {
                        if (index === sections.length - 1) {
                            return (
                                <SheetPanel
                                    key={section.name}
                                    index={index}
                                    section={section}
                                    sheetTransform={transforms[index]}
                                    onHover={() => setFocusedSection(index)}
                                    closePanel={() => setIsActive(_ => false)}
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
                                index={index}
                                section={section}
                                sheetTransform={transforms[index]}
                                onHover={() => setFocusedSection(index)}
                                closePanel={() => setIsActive(_ => false)}
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