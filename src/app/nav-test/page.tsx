'use client'

import { useState } from "react"

// builtin

// external

// internal
import "./page.css"


export default function NavTestPage() {
    const [active, setActive] = useState(false);

    return (
        <div className="relative h-full">
            <button
                type="button"
                className="absolute bottom-1 right-1 z-40"
                onClick={() => setActive(prev => !prev)}
            >
                Toggle
            </button>
            <div
                className="section-title absolute w-full h-full text-left top-0 z-30 bg-amber-200"
                style={{ rotate: active ? "-3deg" : "0deg", translate: active ? "-45px 8px 0px" : "" }}
            >
                <p>What</p>
            </div>
            <div
                className="section-title absolute w-full h-full text-left top-0 z-20 bg-blue-200"
                style={{ rotate: active ? "-2deg" : "0deg", translate: active ? "-30px -2px 0px" : "" }}
            >
                A
            </div>
            <div
                className="section-title absolute w-full h-full text-left top-0 z-10 bg-gray-200"
                style={{ rotate: active ? "-1deg" : "0deg", translate: active ? "-15px 3px 0px" : "" }}
            >
                Wild
            </div>
            <div className="section-title absolute w-full h-full text-left top-0 z-0 bg-green-200">
                Moment
            </div>
        </div>
    );
}