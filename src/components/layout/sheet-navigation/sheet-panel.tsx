// builtin


// external

// internal
import { type SheetTransform, sheetTransformToCSS } from "@/lib/layout/sheet-transform";
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import "./sheet-panel.css"


interface SheetPanelProps {
    section: NavigationSection;
    sheetTransform: SheetTransform;
    transformActive: boolean;
    isMain: boolean;
    children?: React.ReactNode;
}

export default function SheetPanel({ section, sheetTransform, transformActive, isMain, children }: SheetPanelProps) {
    return (
        <div
            className="section-title absolute w-full h-full text-left top-0 z-30 bg-gray-100"
            style={sheetTransformToCSS(sheetTransform, transformActive)}
        >
            {
                isMain ?
                    children :
                    <h3>{section.name}</h3>
            }
        </div>
    )
}