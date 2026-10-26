import {Animated, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import HydrationProgress from "@/Features/WaterTracker/Presentation/components/HydrationProgress";
import {useHydration} from "@/Features/WaterTracker/Presentation/models/useHydration";
import {SafeAreaView} from "react-native-safe-area-context";
import HydrationEntryItem from "@/Features/WaterTracker/Presentation/components/HydrationEntryItem";
import FlatList = Animated.FlatList;
import Reanimated from "react-native-reanimated";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
export default function HydrationScreen() {
    const {entries,cups,goal,total, progress, addWater, removeWater,removeLastWater, resetHydration} = useHydration();

    return <View className="flex-1 pl-4 pr-4 bg-[#18152b]">
        <GlobalGradientBackground/>
        <Reanimated.View className={"absolute left-0 right-0 rounded-tl-3xl rounded-tr-3xl bottom-0 bg-blue-400"}
                         style={{height: `${progress * 100}%`,transitionProperty: 'height',
                             transitionDuration: 300,transitionTimingFunction: 'ease-in-out'}}/>
        <SafeAreaView style={styles.content}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <FlatList
                data={entries} keyExtractor={(item) => item.id} renderItem={({item}) =>
                <View className="mb-2">
                    <HydrationEntryItem
                        key={item.id} id={item.id} amount={item.amountMl} time={item.time}
                        removeWater={() => removeWater(item.id)} />
                </View>
            }/>
            <View style={styles.bottomPanel}>
                <HydrationProgress cups={cups} entries={entries} removeLastWater={() => removeLastWater()} addWater={addWater} resetHydration={() => resetHydration()} total={total} progress={progress} goal={goal} />
            </View>

        </KeyboardAvoidingView>
        </SafeAreaView>
        </View>
}
const styles = StyleSheet.create({
    screen: { flex: 1, paddingHorizontal: 16, backgroundColor: "#18152b" },
    body: { color: '#334155', fontSize: 16, marginTop: 18, lineHeight: 24 },
    link: { color: '#2563eb', fontWeight: '700', fontSize: 16, marginTop: 24 },
    content: {
        flex: 1,
    },
    bottomPanel: {
        paddingTop: 12,
        paddingBottom: 12,
    },
});