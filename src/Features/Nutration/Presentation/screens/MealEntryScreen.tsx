import {FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useHeaderHeight} from "expo-router/react-navigation";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import MealEntryCard from "@/Features/Nutration/Presentation/components/MealEntryCard";
import MealItem from "@/Features/Nutration/Presentation/components/MealItem";

const SafeAreaView = styled(RNSafeAreaView);

export default function MealLogScreen() {
    const {addMeal,removeMeal,removeLastMeal} = useNutrition();
    const headerHeight = useHeaderHeight();
    return(
        <SafeAreaView edges={["bottom", "left", "right"]} className={"flex-1"}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View className={"flex-1"}/>
                <MealEntryCard addMeal={addMeal}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
