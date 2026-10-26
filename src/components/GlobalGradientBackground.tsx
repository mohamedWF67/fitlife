import {LinearGradient} from "expo-linear-gradient";

export default function GlobalGradientBackground() {
    return (<LinearGradient
        className={"absolute left-0 right-0 bottom-0 h-1/3"}
        colors={['transparent', '#252549']}
        pointerEvents="none"
    />);
}