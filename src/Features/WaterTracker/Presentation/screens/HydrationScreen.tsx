import {Animated, KeyboardAvoidingView, Platform, View, Text} from 'react-native';
import HydrationProgress from "@/Features/WaterTracker/Presentation/components/HydrationProgress";
import {useHydration} from "@/Features/WaterTracker/Presentation/models/useHydration";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import HydrationEntryItem from "@/Features/WaterTracker/Presentation/components/HydrationEntryItem";
import FlatList = Animated.FlatList;
import Reanimated from "react-native-reanimated";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
import {Ionicons} from "@react-native-vector-icons/ionicons";

const SafeAreaView = styled(RNSafeAreaView);

export default function HydrationScreen() {
    const {entries,cups,goal,total, progress, addWater, removeWater,removeLastWater, resetHydration} = useHydration();
    const isEntriesEmpty = entries.length === 0;

    return <View className="flex-1 pl-4 pr-4 bg-[#18152b]">
        <GlobalGradientBackground/>
        <Reanimated.View className={"absolute left-0 right-0 rounded-tl-3xl rounded-tr-3xl bottom-0 bg-blue-400"}
                         style={{height: `${progress * 100}%`,transitionProperty: 'height',
                             transitionDuration: 300,transitionTimingFunction: 'ease-in-out'}}/>
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                { !isEntriesEmpty ?
                    <FlatList
                        data={entries} keyExtractor={(item) => item.id} renderItem={({item}) =>
                        <View className="mb-2">
                            <HydrationEntryItem
                                key={item.id} id={item.id} amount={item.amountMl} time={item.time}
                                removeWater={() => removeWater(item.id)} />
                        </View>
                    }/>
                    :
                    <View className={"flex-1 items-center"}>
                    <Ionicons name={"water-outline"} size={36} color={"gray"}/>
                    <Text className="flex-1 text-3xl font-bold text-center text-gray-500 mt-4">
                        Start drinking water!
                    </Text>
                    </View>
                }
            <View className="pt-3 pb-3">
                <HydrationProgress cups={cups} entries={entries} removeLastWater={() => removeLastWater()} addWater={addWater} resetHydration={() => resetHydration()} total={total} progress={progress} goal={goal} />
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
        </View>
}