// builtin

// external
import { useEffect, useState } from "react";

// internal
import { ScreenSize } from "@/lib/util/screen-size";


export function useOnScreenSize<T>(
    tiny: T,
    small: T,
    medium: T,
    large: T
): T {

    const [isMounted, setIsMounted] = useState(false);
    const [value, setValue] = useState<T>(tiny);

    useEffect(() => {
        setIsMounted(true);

        function handleResize() {
            const width = window.innerWidth
            const nextValue = width >= ScreenSize.LARGE ? large :
                width >= ScreenSize.MEDIUM ? medium :
                    width >= ScreenSize.SMALL ? small :
                        tiny;
            setValue(nextValue);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [large, medium, small, tiny]);

    return isMounted ? value : tiny;
}