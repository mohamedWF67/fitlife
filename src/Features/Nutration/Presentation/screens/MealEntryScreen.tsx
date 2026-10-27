import {FlatList, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import MealEntryCard from "@/Features/Nutration/Presentation/components/MealEntryCard";

export default function MealLogScreen() {
    const {addMeal,removeMeal,removeLastMeal} = useNutrition();
    return(
        <View className={"flex-1 pl-4 pr-4"}>
            <KeyboardAvoidingView className={"flex-1"}>
                <View className={"flex-1"}/>
                <MealEntryCard addMeal={addMeal}/>
            </KeyboardAvoidingView>
        </View>
    )
}
