import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import MealItem from "@/Features/Nutration/Presentation/components/MealItem";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function MealLogScreen() {
    const {entries, getEntryProgress} = useNutrition();
    return(
        <View className={"flex-1"}>
            <FlatList
                className={"flex-1 pl-4 pr-4"}
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <MealItem item={item.item} progress={getEntryProgress(item.item)} />
                }/>
        </View>
    )
}
