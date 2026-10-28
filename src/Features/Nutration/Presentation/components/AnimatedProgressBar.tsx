import {Text, View} from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { IoniconsIconName } from "@react-native-vector-icons/ionicons";

type props = {
    Label: string,
    icon?: IoniconsIconName,
    value: number,
    current: number,
    target: number,
    color?: string}

export default function AnimatedProgressBar({Label, value, current, target,color="#704bfc",icon="add"}: props){
    return(
        <View>
            <View className={"flex-row items-center p-1"}>
                <Ionicons name={icon} size={26} color={color} />
                <Text className={"text-gray-500 font-bold text-lg ml-1"}>
                    {Label}
                </Text>
            </View>
            <View className={"flex w-full flex-row items-center justify-between h-7 rounded-2xl overflow-hidden"}>
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