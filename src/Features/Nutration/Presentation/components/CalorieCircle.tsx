import {View, Text, Pressable} from "react-native";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import Svg, {Circle} from "react-native-svg";
import Animated, {Easing, useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const ringWidth = 24;

type props = {
    totals: {calories: number, proteins: number, carbs: number, fats: number},
    goals: {calories: number, proteins: number, carbs: number, fats: number},
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function CalorieCircle({totals, goals, progress}:props) {
    const [size, setSize] = useState(0);
    const radius = (size - ringWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const animatedProgress = useSharedValue(progress.calories);

    useEffect(() => {
        animatedProgress.set(withTiming(progress.calories, {duration: 400, easing: Easing.inOut(Easing.ease)}));
    }, [animatedProgress, progress.calories]);

    const ringProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - animatedProgress.get()),
    }));

    return(
        <View className={"flex-1 p-5 gap-2 rounded-3xl bg-[#26263b]"}>
            <Text className={"text-white text-4xl font-bold text-center"}>Calories</Text>
            <View className="flex-1">
                <View
                    className={"flex-1 mb-4 justify-center items-center"}
                    onLayout={(e) => {
                        const {width, height} = e.nativeEvent.layout;
                        if (width > 0 && height > 0) setSize(Math.min(width, height));
                    }}>
                    {size > 0 && (
                        <View className={"absolute top-0 bottom-0 left-0 right-0 justify-center items-center"}>
                            <Svg width={size} height={size} style={{transform: [{rotate: "-90deg"}]}}>
                                <Circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke={"#303046"}
                                    strokeWidth={ringWidth}
                                    fill={"none"}/>
                                <AnimatedCircle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke={"#5438be"}
                                    strokeWidth={ringWidth}
                                    strokeLinecap={"round"}
                                    strokeDasharray={circumference}
                                    fill={"none"}
                                    animatedProps={ringProps}/>
                            </Svg>
                        </View>
                    )}
                    <Text className={"text-white text-4xl font-bold text-center"}>
                        {Math.max(goals.calories - totals.calories,0).toString().padStart(4,'0')} Kcal
                    </Text>
                    <Text className={"text-white text-3xl font-bold text-center"}>Remaining</Text>
                    <Text className={"text-gray-300 text-2xl font-bold text-center"}>{totals.calories} / {goals.calories}</Text>
                </View>
                <View className={"flex-row flex items-center justify-around"}>
                    <Pressable
                        onPress={() => router.push("/(tabs)/nutrition/MealEntry")}
                        className="rounded-2xl p-4">
                        <Text className={"text-white text-2xl font-bold text-center"}>Add Meal</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push("/(tabs)/nutrition/MealLog")}
                        className="rounded-2xl p-4">
                        <Text className={"text-white text-2xl font-bold text-center"}>Meal Log</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
