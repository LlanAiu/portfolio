// builtin

// external
import { useState } from "react";

// internal
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import { buildBaseTransformSet, type SheetTransform } from "@/lib/layout/sheet-transform";
import SheetPanel from "./sheet-panel";


interface SheetNavigationProps {
    activeEndpoint: string;
    sections: NavigationSection[];
    children: React.ReactNode;
}


export default function SheetNavigation({ activeEndpoint, sections, children }: SheetNavigationProps) {
    const [isActive, setIsActive] = useState(false);
    const [transforms, setTransform] = useState<SheetTransform[]>(buildBaseTransformSet(sections.length));

    const sectionCopy = [
        ...sections.filter(section => section.endpoint !== activeEndpoint)
    ];
    const active = sections.find(section => section.endpoint === activeEndpoint);
    if (active) {
        sectionCopy.push(active);
    }

    return (
        <div className="relative h-full">
            <button
                type="button"
                className="absolute bottom-1 right-1 z-40"
                onClick={() => setIsActive(prev => !prev)}
            >
                Toggle
            </button>

            {
                sectionCopy.map((section, index) => {
                    if (index === sections.length - 1) {
                        return (
                            <SheetPanel
                                key={section.name}
                                section={section}
                                sheetTransform={transforms[index]}
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
                            transformActive={isActive}
                            isMain={false}
                        />
                    );
                })
            }
        </div>
    );
}