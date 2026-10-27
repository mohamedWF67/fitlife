import { styled } from "nativewind";
import Reanimated from "react-native-reanimated";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import NutritionCard from "@/Features/Nutration/Presentation/components/NutritionCard";
import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
import CalorieCircle from "@/Features/Nutration/Presentation/components/CalorieCircle";
import {BottomSheet, Button, Column, Host, Text} from "@expo/ui";
import {useState} from "react";
import {FlatList, useColorScheme} from "react-native";

const SafeAreaView = styled(RNSafeAreaView);

export default function NutritionScreen() {
    const {totals, progress, goals} = useNutrition();

    const [isPresented, setIsPresented] = useState(false);
    const colorScheme = useColorScheme();
  return (
    <Reanimated.View className="flex-1 pl-4 pr-4 bg-[#18152b]">
        <GlobalGradientBackground/>
        <SafeAreaView className="flex-1 gap-2">
            <CalorieCircle totals={totals} goals={goals} progress={progress}/>
            <NutritionCard totals={totals} goals={goals} progress={progress}/>
        </SafeAreaView>
    </Reanimated.View>
  );
}
