import {View, Text, TextInput} from "react-native";
import {Host} from "@expo/ui";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";

type props = {
    Title: string,
    value: string,
    onChangeText: (text: string) => void,
}

export default function MealEntryItem({Title, value, onChangeText}:props){
    const placeholder = `Enter ${Title} Intake `;
    return(
        <View className={"flex"}>
            <Text className={"text-white pl-2 text-lg font-bold"}>{Title}</Text>
                <TextInput
                    className={"w-full rounded-2xl border border-gray-600 p-4 text-gray-200 font-semibold items-center"}
                    placeholder={placeholder}
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChangeText}
                />
        </View>
    );
}