import {View,Text} from "react-native";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";
import AttribuiteItem from "@/Features/Nutration/Presentation/components/AttribuiteItem";

type props = {
    item: NutritionEntry
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function MealItem({item,progress}:props) {
    const [hours, min] = item.time.split(":").map(Number);
    const hours12 = (hours % 12 || 12).toString().padStart(2,'0');
    const formatedmin = min.toString().padStart(2,'0');
    const ampm = hours < 12 ? "AM" : "PM";

    return(
        <View className={"flex flex-col p-4 mb-3 rounded-3xl bg-[#26263b]"}>
            <View className={"flex flex-row w-full pb-2 justify-between"}>
                <Text className={"text-white text-xl font-bold"}>{`${hours12}:${formatedmin} ${ampm}`}</Text>
            </View>
            <View className={"flex flex-row w-full justify-between"}>
            <AttribuiteItem color={"#b56e26"} name={"Calories"} progress={progress.calories} item={item.calories}/>
            <AttribuiteItem color={"#b56e26"} name={"Proteins"} progress={progress.proteins} item={item.proteins}/>
            <AttribuiteItem color={"#50b1a2"} name={"Carbs"} progress={progress.carbs} item={item.carbs}/>
            <AttribuiteItem color={"#9b3b4f"} name={"Fats"} progress={progress.fats} item={item.fats}/>
        </View>
        </View>
    )
}
