import {ReactNode} from "react";
import {Text, View} from "react-native";

type props = {
    title: string,
    value: string | number,
    unit: string,
    caption: string,
    progress?: number,
    barColor?: string,
    children?: ReactNode,
}

export default function DashboardCard({title, value, unit, caption, progress, barColor, children}: props) {
    return(
        <View className="p-5 gap-2 rounded-3xl bg-[#26263b]">
            <Text className="text-white text-2xl font-bold">{title}</Text>
            <View>
                <Text className="text-white text-4xl font-extrabold">
                    {value}<Text className="text-gray-500 text-xl"> {unit}</Text>
                </Text>
                <Text className="text-gray-500">{caption}</Text>
            </View>
            {progress !== undefined && (
                <View className="flex-row items-center h-7 rounded-2xl overflow-hidden bg-[#303049]">
                    <View className={`absolute h-full rounded-2xl ${barColor}`} style={{width: `${progress * 100}%`}}/>
                    <Text className="text-gray-200 font-semibold pl-2">
                        {progress < 1 ? Math.round(progress * 100) + "% of goal" : "Goal reached"}
                    </Text>
                </View>
            )}
            {children}
        </View>
    )
}
