'use client'
// builtin

// external

// internal
import type { NavigationSection } from "@/lib/layout/navigation-sections";
import SheetNavigation from "@/components/layout/sheet-navigation/sheet-navigation";
import TegakiText from "@/components/animations/tegaki/tegaki-text";


export default function NavTestPage() {
    const sections: NavigationSection[] = [
        {
            name: "Home",
            endpoint: "/",
        },
        {
            name: "Projects",
            endpoint: "/projects",
        },
        {
            name: "About",
            endpoint: "/about"
        },
        {
            name: "Current",
            endpoint: "/current"
        }
    ]

    return (
        <SheetNavigation
            activeEndpoint={"/"}
            sections={sections}
        >
            <TegakiText id="main" className="text-4xl">Why Hello There!</TegakiText>
        </SheetNavigation>
    );
}