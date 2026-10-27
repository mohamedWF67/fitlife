import {View,Text} from "react-native";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";
import AttribuiteItem from "@/Features/Nutration/Presentation/components/AttribuiteItem";

type props = {
    item: NutritionEntry
    goals: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function MealItem({item,goals}:props) {
    return(
        <View className={"flex flex-row p-4 mb-3 justify-between rounded-3xl bg-[#26263b]"}>
            <AttribuiteItem color={"#b56e26"} name={"Calories"} progress={goals.calories} item={item.calories}/>
            <AttribuiteItem color={"#b56e26"} name={"Proteins"} progress={goals.proteins} item={item.proteins}/>
            <AttribuiteItem color={"#50b1a2"} name={"Carbs"} progress={goals.carbs} item={item.carbs}/>
            <AttribuiteItem color={"#9b3b4f"} name={"Fats"} progress={goals.fats} item={item.fats}/>
        </View>
    )
}
