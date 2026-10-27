import {LinearGradient} from "expo-linear-gradient";

export default function GlobalGradientBackground() {
    return (<LinearGradient
        style={{position: 'absolute',bottom: 0, left: 0, right: 0, height: '100%'}}
        colors={['transparent', '#252549']}
        pointerEvents="none"
    />);
}