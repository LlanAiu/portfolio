'use client';
import ParallelAnimation from "@/components/animations/parallel-animation";
// builtin

// external

// internal
import SequentialAnimation from "@/components/animations/sequential-animation";
import TegakiList from "@/components/animations/tegaki/tegaki-list";
import TegakiText from "@/components/animations/tegaki/tegaki-text";


const listItems = [
    "First animated point",
    "Second animated point",
];


const listItems2 = [
    "1st animated point",
];

export default function TestPage() {

    return (
        <SequentialAnimation id="sequence1">
            <ParallelAnimation id="parallel1">
                <TegakiList id="list1" items={listItems} />
                <TegakiList id="list2" items={listItems2} />
            </ParallelAnimation>
            <TegakiText id="text">
                Yay all done!
            </TegakiText>
        </SequentialAnimation>
    )
}