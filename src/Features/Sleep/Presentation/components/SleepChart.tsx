import {Text, View} from "react-native";
import Animated, {FadeIn} from "react-native-reanimated";

type props = {
    bars: {id: string, day: string, top: number, height: number}[],
    timeLabels: string[],
    avgHours: number,
    avgMinutes: number,
    dateRange: string,
}

export default function SleepChart({bars, timeLabels, avgHours, avgMinutes, dateRange}: props) {
    return(
        <Animated.View entering={FadeIn.duration(500)} className="p-5 gap-2 rounded-3xl bg-[#26263b]">
            <View>
                <Text className="text-gray-500 font-bold">AVG. TIME ASLEEP</Text>
                <Text className="text-white text-4xl font-extrabold">
                    {avgHours}<Text className="text-gray-500 text-xl"> hr </Text>
                    {avgMinutes}<Text className="text-gray-500 text-xl"> min</Text>
                </Text>
                <Text className="text-gray-500">{dateRange}</Text>
            </View>
            <View className="h-80 mt-4">
                <View className="absolute top-0 bottom-0 left-0 right-14 flex-row border-r border-[#303049] z-20">
                    {bars.map(bar => (
                        <View key={bar.id} className="flex-1 border-l border-[#303049]">
                            <View
                                className="absolute left-2 right-2 rounded-3xl bg-[#5438be]"
                                style={{top: `${bar.top}%`, height: `${bar.height}%`}}/>
                        </View>
                    ))}
                </View>
                <View className="absolute top-0 bottom-0 left-0 right-0 justify-between z-10">
                    {timeLabels.map(label => (
                        <View key={label} className="flex-row items-center">
                            <View className="flex-1 h-px bg-[#303049]"/>
                            <Text className={"w-14 pl-2 text-xs text-gray-500"}>{label}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View className="flex-row pr-14">
                {bars.map(bar => (
                    <Text key={bar.id} className="flex-1 text-center text-xs text-gray-500">{bar.day}</Text>
                ))}
            </View>
        </Animated.View>
    )
}
