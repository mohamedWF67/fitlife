import {View,Text} from "react-native";
import Animated, {interpolateColor} from "react-native-reanimated";
import {useState} from "react";
type props = {
    progress: number
    item: number
    name: string
    color: string
}

export default function AttribuiteItem({item,progress,name,color}:props) {
    const progressPercent = `${item / progress * 100}%`;
    const percentage = item / progress

    return(
        <View className={"flex flex-col w-24 justify-center"}>
            <Text className={"text-white text-xl font-bold text-center"}>{name}</Text>
            <Text className={"text-gray-300 text-xl font-semibold text-center"}>{item}</Text>
            <View className={"h-2"}>
                <Animated.View className={"bg-[#303049] absolute w-full h-full rounded-2xl"} />
                <Animated.View
                    className={"h-full rounded-2xl absolute"}
                    style={{
                        backgroundColor: interpolateColor(
                            percentage,
                            [0, 0.5, 1],
                            ["#EF4444", "#F59E0B", "#22C55E"]
                        ),
                        width: progressPercent,
                        transitionProperty: 'width',
                        transitionDuration: 400,
                        transitionTimingFunction: 'ease-in-out'
                    }}
                />
            </View>
        </View>
    )
}
