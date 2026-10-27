import {View, Text, Pressable} from "react-native";
import {router} from "expo-router";
import {BottomSheet, Column } from "@expo/ui";
import {useState} from "react";

type props = {
    totals: {calories: number, proteins: number, carbs: number, fats: number},
    goals: {calories: number, proteins: number, carbs: number, fats: number},
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function CalorieCircle({totals, goals, progress}:props) {
    const [isPresented, setIsPresented] = useState(false);
    return(
        <View className={"flex-1 p-5 gap-2 rounded-3xl bg-[#26263b]"}>
            <Text className={"text-white text-4xl font-bold text-center"}>Calories</Text>
            <View className="flex-1 justify-center items-center">
                <Text className={"text-white text-4xl font-bold text-center"}>{totals.calories}</Text>
                <View className={"h-1 w-28 bg-white rounded-full"}/>
                <Text className={"text-white text-4xl font-bold text-center"}>{goals.calories}</Text>
                <Pressable
                    onPress={() => router.push("/(tabs)/nutrition/add-entry")}
                    className="bg-gray-700 rounded-2xl p-4">
                    <Text className={"text-white text-2xl font-bold text-center"}>Meal Log</Text>
                </Pressable>
                <BottomSheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}>
                    <Column spacing={12}>
                        <Text>Sheet contents</Text>
                        <Text>Drag down or tap the overlay to dismiss.</Text>
                    </Column>
                </BottomSheet>
            </View>
        </View>
    )
}
