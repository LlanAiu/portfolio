// builtin

// external
import { useEffect, useState } from "react";

// internal

export function useIsTouchDevice(): boolean {
    const query = "(hover: none)";

    const [isTouch, setIsTouch] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        console.log("isTouch: ", window.matchMedia(query).matches);
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            console.log("isTouch: ", event.matches);
            setIsTouch(event.matches);
        };

        mediaQueryList.addEventListener("change", handleChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, []);

    return isTouch;
}