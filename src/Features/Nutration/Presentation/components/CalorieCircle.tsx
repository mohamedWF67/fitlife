import {View, Text, Pressable} from "react-native";
import {router} from "expo-router";

type props = {
    totals: {calories: number, proteins: number, carbs: number, fats: number},
    goals: {calories: number, proteins: number, carbs: number, fats: number},
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function CalorieCircle({totals, goals, progress}:props) {
    return(
        <View className={"flex-1 p-5 gap-2 rounded-3xl bg-[#26263b]"}>
            <Text className={"text-white text-4xl font-bold text-center"}>Calories</Text>
            <View className="flex-1">
                <View className={"flex-1 justify-center items-center"}>
                    <Text className={"text-white text-4xl font-bold text-center"}>{totals.calories}</Text>
                    <View className={"h-1 w-28 bg-white rounded-full"}/>
                    <Text className={"text-white text-4xl font-bold text-center"}>{goals.calories}</Text>
                </View>
                <View className={"flex-row flex items-center justify-around"}>
                    <Pressable
                        onPress={() => router.push("/(tabs)/nutrition/MealEntry")}
                        className="bg-gray-700 rounded-2xl p-4">
                        <Text className={"text-white text-2xl font-bold text-center"}>Add Meal</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push("/(tabs)/nutrition/MealLog")}
                        className="bg-gray-700 rounded-2xl p-4">
                        <Text className={"text-white text-2xl font-bold text-center"}>Meal Log</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
