import {View} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
import SleepChart from "@/Features/Sleep/Presentation/components/SleepChart";
import {useSleep} from "@/Features/Sleep/Presentation/models/useSleep";

const SafeAreaView = styled(RNSafeAreaView);

export default function SleepScreen() {
    const {bars, timeLabels, avgHours, avgMinutes, dateRange} = useSleep();

    return <View className="flex-1 pl-4 pr-4 bg-[#18152b]">
        <GlobalGradientBackground/>
        <SafeAreaView className="flex-1">
            <SleepChart bars={bars} timeLabels={timeLabels} avgHours={avgHours} avgMinutes={avgMinutes} dateRange={dateRange}/>
        </SafeAreaView>
    </View>
}
