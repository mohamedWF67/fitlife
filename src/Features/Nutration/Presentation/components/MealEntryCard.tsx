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

    const isDisabled = calories === "" || proteins === "" || carbs === "" || fats === "";

    return(
        <View className={"flex p-5 mb-3 gap-2 rounded-3xl bg-[#26263b]"}>
            <MealEntryItem
                Title={"Calories"}
                value={calories}
                onChangeText={setCalories}
            />
            <MealEntryItem
                Title={"Proteins"}
                value={proteins}
                onChangeText={setProteins}
            />
            <MealEntryItem
                Title={"Carbs"}
                value={carbs}
                onChangeText={setCarbs}
            />
            <MealEntryItem
                Title={"Fats"}
                value={fats}
                onChangeText={setFats}
            />
            <Pressable
                onPress={saveMeal}
                disabled={isDisabled}
                aria-label={"Save"}
                className={`rounded-2xl p-4
                 ${isDisabled ? "bg-[#303049]" : "bg-[#5438be]"}`}
            >
                <Text
                    className={`font-bold text-xl text-center
                     ${isDisabled ? "text-gray-500" : "text-white"}`}
                >
                    Add Meal
                </Text>
            </Pressable>
        </View>
    );
}