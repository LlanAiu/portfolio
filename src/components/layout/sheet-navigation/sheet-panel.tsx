/** biome-ignore-all lint/a11y/noStaticElementInteractions: Needed for this type of interaction */
// builtin

// external

// internal
import { type SheetTransform, sheetTransformToCSS } from "@/lib/layout/sheet-transform";
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import "./sheet-panel.css"


interface SheetPanelProps {
    section: NavigationSection;
    sheetTransform: SheetTransform;
    onHover: () => void;
    transformActive: boolean;
    isMain: boolean;
    children?: React.ReactNode;
}

export default function SheetPanel({ section, sheetTransform, onHover, transformActive, isMain, children }: SheetPanelProps) {
    return (
        <div
            className="section-title absolute w-full h-full text-left top-0 z-30 bg-gray-100 border-2"
            onMouseEnter={onHover}
            style={sheetTransformToCSS(sheetTransform, transformActive)}
        >
            {
                isMain ?
                    <div className="normal-writing text-left w-full h-full">
                        {children}
                    </div> :
                    <h3>{section.name}</h3>
            }
        </div>
    )
}