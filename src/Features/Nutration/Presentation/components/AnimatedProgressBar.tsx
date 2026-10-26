import {Text, View} from "react-native";
import Animated from "react-native-reanimated";

type props = {Label: string, value: number, current: number, target: number,color?: string}

export default function AnimatedProgressBar({Label, value, current, target,color="#704bfc"}: props){
    return(
        <View>
            <Text className={"text-gray-100 font-bold text-lg"}>{Label}</Text>
            <View className={"flex flex-row justify-between items-center h-7 overflow-hidden"}>
                <Animated.View className={"bg-[#303049] absolute w-full h-full rounded-2xl"} />
                <Animated.View
                    className={"h-full rounded-2xl absolute"}
                    style={{
                        backgroundColor: color,
                        width: `${value * 100}%`,
                        transitionProperty: 'width',
                        transitionDuration: 400,
                        transitionTimingFunction: 'ease-in-out'
                }}
                />
                <Text className={"font-semibold text-gray-200 text-lg pl-2"}>{current}</Text>
                <Text className={"font-semibold text-gray-200 text-lg pr-2"}>{target}</Text>
            </View>
        </View>
    );
};