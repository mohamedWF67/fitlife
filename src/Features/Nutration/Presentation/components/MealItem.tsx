import {View,Text} from "react-native";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";

type props = {
    item: NutritionEntry
}

export default function MealItem({item}:props) {
    return(
        <View className={"flex flex-row p-5 mb-3 justify-around rounded-3xl bg-[#26263b]"}>
            <View className={"flex flex-col justify-center"}>
                <Text className={"text-white text-2xl font-bold text-center"}>Calories</Text>
                <Text className={"text-white text-2xl font-bold text-center"}>{item.calories}</Text>
            </View>
            <View className={"flex flex-col justify-center"}>
                <Text className={"text-white text-2xl font-bold text-center"}>Protein</Text>
                <Text className={"text-white text-2xl font-bold text-center"}>{item.proteins}</Text>
            </View>
            <View className={"flex flex-col justify-center"}>
                <Text className={"text-white text-2xl font-bold text-center"}>Carbs</Text>
                <Text className={"text-white text-2xl font-bold text-center"}>{item.carbs}</Text>
            </View>
            <View className={"flex flex-col justify-center"}>
                <Text className={"text-white text-2xl font-bold text-center"}>Calories</Text>
                <Text className={"text-white text-2xl font-bold text-center"}>{item.fats}</Text>
            </View>
        </View>
    )
}
