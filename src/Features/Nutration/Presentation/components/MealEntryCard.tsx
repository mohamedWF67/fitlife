import {View, Text, Pressable} from "react-native";
import {useState} from "react";
import MealEntryItem from "@/Features/Nutration/Presentation/components/MealEntryItem";
import {Macros} from "@/Features/Nutration/Presentation/models/useNutrition";

type props = {
    addMeal: (meal: Macros) => void,
}

export default function MealEntryCard({addMeal}:props){
    const [calories, setCalories] = useState("");
    const [proteins, setProteins] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");

    const saveMeal = () => {
        addMeal({calories: Number(calories), proteins: Number(proteins), carbs: Number(carbs), fats: Number(fats)});
        setCalories("");
        setProteins("");
        setCarbs("");
        setFats("");
    }

    return(
        <View className={"p-5 rounded-3xl bg-blue-950"}>
            <Text className={"font-bold text-xl"}>{calories} {proteins}</Text>
            <MealEntryItem Title={"Calories"} value={calories} onChangeText={setCalories}/>
            <MealEntryItem Title={"Proteins"} value={proteins} onChangeText={setProteins}/>
            <MealEntryItem Title={"Carbs"} value={carbs} onChangeText={setCarbs}/>
            <MealEntryItem Title={"Fats"} value={fats} onChangeText={setFats}/>
            <Pressable onPress={saveMeal} disabled={calories === ""} className={"bg-blue-500 rounded-xl p-2"}><Text>Save</Text></Pressable>
        </View>
    );
}