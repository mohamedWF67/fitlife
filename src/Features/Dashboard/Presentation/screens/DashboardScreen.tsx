import {ScrollView, Text, View} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
import DashboardCard from "@/Features/Dashboard/Presentation/components/DashboardCard";
import {useDashboard} from "@/Features/Dashboard/Presentation/models/useDashboard";

const SafeAreaView = styled(RNSafeAreaView);

// Same macro colours as NutritionCard.
const macros = [
    {key: "proteins", name: "Proteins", color: "bg-[#b56e26]"},
    {key: "carbs", name: "Carbs", color: "bg-[#50b1a2]"},
    {key: "fats", name: "Fats", color: "bg-[#9b3b4f]"},
] as const;

export default function DashboardScreen() {
    const {today, workouts, nutrition, hydration, sleep} = useDashboard();

    return <View className="flex-1 pl-4 pr-4 bg-[#18152b]">
        <GlobalGradientBackground/>
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="gap-2 pb-4" showsVerticalScrollIndicator={false}>
                <View className="pt-3 pb-1">
                    <Text className="text-white text-4xl font-extrabold">Today</Text>
                    <Text className="text-gray-500">{today}</Text>
                </View>

                <DashboardCard
                    title="Workouts" value={workouts.done} unit={`of ${workouts.goal} this week`}
                    caption={`${workouts.sets} sets · ${workouts.volume.toLocaleString()} kg volume`}
                    progress={workouts.progress} barColor="bg-blue-400"/>

                <DashboardCard
                    title="Nutrition" value={nutrition.totals.calories} unit={`/ ${nutrition.goals.calories} kcal`}
                    caption={`${nutrition.meals} meals today`}
                    progress={nutrition.progress.calories} barColor="bg-[#5438be]">
                    <View className="flex-row gap-3">
                        {macros.map(macro => (
                            <View key={macro.key} className="flex-1 gap-1">
                                <Text className="text-gray-500">{macro.name}</Text>
                                <Text className="text-white font-bold">{nutrition.totals[macro.key]} / {nutrition.goals[macro.key]} g</Text>
                                <View className="h-2 rounded-2xl overflow-hidden bg-[#303049]">
                                    <View className={`h-full rounded-2xl ${macro.color}`}
                                          style={{width: `${nutrition.progress[macro.key] * 100}%`}}/>
                                </View>
                            </View>
                        ))}
                    </View>
                </DashboardCard>

                <DashboardCard
                    title="Water" value={hydration.total} unit={`/ ${hydration.goal} ml`}
                    caption={`${hydration.cups} cups today`}
                    progress={hydration.progress} barColor="bg-blue-400"/>

                <DashboardCard
                    title="Sleep" value={`${sleep.avgHours}h ${sleep.avgMinutes}m`} unit="avg"
                    caption={sleep.dateRange}>
                    <View className="h-32 flex-row">
                        {sleep.bars.map(bar => (
                            <View key={bar.id} className="flex-1">
                                <View className="absolute left-2 right-2 rounded-3xl bg-[#5438be]"
                                      style={{top: `${bar.top}%`, height: `${bar.height}%`}}/>
                            </View>
                        ))}
                    </View>
                    <View className="flex-row">
                        {sleep.bars.map(bar => (
                            <Text key={bar.id} className="flex-1 text-center text-xs text-gray-500">{bar.day}</Text>
                        ))}
                    </View>
                </DashboardCard>
            </ScrollView>
        </SafeAreaView>
    </View>
}
