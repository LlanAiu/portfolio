// builtin

// external

// internal


export interface TimedAnimation {
    id: string;
    key?: string;
    index?: number;
    groupIndex?: number;
    onReset?: () => void;
    onComplete?: () => void;
}