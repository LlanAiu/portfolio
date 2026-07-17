// builtin

// external
import { useEffect, useState } from "react";

// internal

export function useIsTouchDevice(): boolean {
    const query = "(hover: none)";

    const [isMounted, setIsMounted] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const mediaQueryList = window.matchMedia(query);
        setIsTouch(mediaQueryList.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setIsTouch(event.matches);
        };

        mediaQueryList.addEventListener("change", handleChange);
        return () => mediaQueryList.removeEventListener("change", handleChange);
    }, []);

    return isMounted ? isTouch : false;
}