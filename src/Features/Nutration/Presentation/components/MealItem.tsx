import {View,Text} from "react-native";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";
import AttribuiteItem from "@/Features/Nutration/Presentation/components/AttribuiteItem";

type props = {
    item: NutritionEntry
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function MealItem({item,progress}:props) {
    return(
        <View className={"flex flex-row p-4 mb-3 justify-between rounded-3xl bg-[#26263b]"}>
            <AttribuiteItem color={"#b56e26"} name={"Calories"} progress={progress.calories} item={item.calories}/>
            <AttribuiteItem color={"#b56e26"} name={"Proteins"} progress={progress.proteins} item={item.proteins}/>
            <AttribuiteItem color={"#50b1a2"} name={"Carbs"} progress={progress.carbs} item={item.carbs}/>
            <AttribuiteItem color={"#9b3b4f"} name={"Fats"} progress={progress.fats} item={item.fats}/>
        </View>
    )
}
