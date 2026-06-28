// builtin

// external
import type { Metadata } from "next";
import { Caveat, Nothing_You_Could_Do } from "next/font/google";

// internal
import "./globals.css";
import SheetNavigation from "@/components/layout/sheet-navigation/sheet-navigation";
import type { NavigationSection } from "@/lib/layout/navigation-sections";

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"]
})

const nothingYouCouldDo = Nothing_You_Could_Do({
    variable: "--font-nothing-you-could-do",
    weight: "400",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Alan Liu",
    description: "Hi y'all! Welcome to my solo exposition",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
            name: "Current",
            endpoint: "/current"
        },
        {
            name: "About",
            endpoint: "/about"
        },
    ]

    return (
        <html lang="en">
            <body
                className={`${caveat.variable} ${nothingYouCouldDo.variable} antialiased`}
            >
                <SheetNavigation sections={sections}>
                    {children}
                </SheetNavigation>
            </body>
        </html>
    );
}
