/** biome-ignore-all lint/a11y/noStaticElementInteractions: Needed for this type of interaction */
// builtin

// external

// internal
import { type SheetTransform, sheetTransformToCSS } from "@/lib/layout/sheet-transform";
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import "./sheet-panel.css"
import Link from "next/link";


interface SheetPanelProps {
    index: number;
    section: NavigationSection;
    sheetTransform: SheetTransform;
    onHover: () => void;
    transformActive: boolean;
    isMain: boolean;
    children?: React.ReactNode;
}

export default function SheetPanel({ index, section, sheetTransform, onHover, transformActive, isMain, children }: SheetPanelProps) {
    if (isMain) {
        return (
            <div
                className="section-title p-10 absolute w-full h-full text-left top-0 bg-gray-100 border-2"
                onMouseEnter={onHover}
                style={{ ...sheetTransformToCSS(sheetTransform, transformActive), zIndex: index }}
            >
                <div className="normal-writing text-left w-full h-full">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <Link
            className="section-title p-3 absolute w-full h-full text-left top-0 z-30 bg-gray-100 border-2"
            onMouseEnter={onHover}
            href={section.endpoint}
            style={{ ...sheetTransformToCSS(sheetTransform, transformActive), zIndex: index }}
        >
            <h3 className="text-3xl">{section.name}</h3>
        </Link>
    )
}