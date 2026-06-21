'use client';
// builtin

// external

// internal
import SequentialAnimation from "./sequential-animation";
import TegakiList from "./tegaki-list";


const listItems = [
    "First animated point",
    "Second animated point",
    "Third animated point"
];


const listItems2 = [
    "1st animated point",
    "2nd animated point",
    "3rd animated point"
];

export default function TestPage() {

    return (
        <SequentialAnimation id="sequence1">
            <TegakiList id="list1" items={listItems} />
            <TegakiList id="list2" items={listItems2} />
        </SequentialAnimation>
    )
}