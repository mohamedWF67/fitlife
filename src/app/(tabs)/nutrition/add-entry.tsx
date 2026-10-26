import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import MealItem from "@/Features/Nutration/Presentation/components/MealItem";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";

const SafeAreaView = styled(RNSafeAreaView);

export default function addEntry() {
    const {entries} = useNutrition();
    return <View className="flex-1 bg-[#18152b]">
        <GlobalGradientBackground/>
        <SafeAreaView className="flex-1 gap-2 pr-4 pl-4">
            <FlatList data={entries} keyExtractor={(item) => item.id} renderItem={(item) => <MealItem item={item.item} />} />
        </SafeAreaView>
    </View>
}
