import {Animated, StyleSheet, View} from 'react-native';
import HydrationProgress from "@/Features/WaterTracker/Presentation/components/HydrationProgress";
import {useHydration} from "@/Features/WaterTracker/Presentation/models/useHydration";
import {SafeAreaView} from "react-native-safe-area-context";
import HydrationEntryItem from "@/Features/WaterTracker/Presentation/components/HydrationEntryItem";
import FlatList = Animated.FlatList;
import {LinearGradient} from "expo-linear-gradient";
import {useRef} from "react";


export default function hydrationScreen() {
    const {entries,goal,total, progress, addWater, removeWater,removeLastWater} = useHydration();
    const listRef = useRef<FlatList>(null);


    return <SafeAreaView style={styles.screen}>
        <LinearGradient
            colors={['transparent', '#0f172a']}
            pointerEvents="none"
            style={styles.fade}
        />
        <FlatList
            contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            }}
            ref={listRef}
            onContentSizeChange={() => {
                listRef.current?.scrollToEnd({ animated: false });
            }}
            data={entries} keyExtractor={(item) => item.id} renderItem={({item}) =>
            <View style={{paddingBottom: 10}}>
            <HydrationEntryItem key={item.id} id={item.id} amount={item.amountMl} time={item.time}
                                removeWater={() => removeWater(item.id)} />
            </View>
        }/>
        <HydrationProgress entries={entries} removeLastWater={() => removeLastWater()} addWater={addWater} total={total} progress={progress} goal={goal} />
    </SafeAreaView>;
}
const styles = StyleSheet.create({
    screen: { flex: 1, padding: 16, justifyContent: 'flex-end', backgroundColor: "#144577" },
    body: { color: '#334155', fontSize: 16, marginTop: 18, lineHeight: 24 },
    link: { color: '#2563eb', fontWeight: '700', fontSize: 16, marginTop: 24 },
    fade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
    },
});