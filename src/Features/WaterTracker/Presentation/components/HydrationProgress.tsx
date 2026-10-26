import {StyleSheet, Text, View} from "react-native";
import {Host, Button, Picker, Row, Spacer} from '@expo/ui';
import {useState} from "react";
import Animated, { FadeIn,} from "react-native-reanimated";

type props = {total: number,cups: number, goal: number, progress: number, addWater: (amount: number) => void, removeLastWater: () => void, entries: any[]}
const QuickAmounts = [100,200, 300, 400, 500, 600, 700, 800, 900, 1000];

export default function HydrationProgress({total,cups, goal, progress, addWater,removeLastWater,entries}: props) {
    const [quickAmount, setQuickAmount] = useState(200);

    return(
        <Animated.View entering={FadeIn.duration(200)} style={styles.card}>
            <View className={"flex-row justify-between"}>
                <View>
                    <Animated.Text
                        key={total}
                        entering={FadeIn.duration(100)}
                        style={styles.title}>{total}</Animated.Text>
                    <Animated.Text
                        className="text-gray-500 text-left"
                        entering={FadeIn.duration(100)}>{cups} Cups</Animated.Text>
                </View>
                <View>
                    <Animated.Text
                        entering={FadeIn.duration(100)}
                        style={styles.title}>{goal} ml</Animated.Text>
                    <Animated.Text
                        className="text-gray-500 text-right"
                        entering={FadeIn.duration(100)}>{Math.max(goal - total,0)} ml left</Animated.Text>
                </View>
            </View>
            <Host matchContents={{ vertical: true}} style={{marginTop: 10,marginBottom: 10}}>
                <Row>
                    <Button variant="outlined" disabled={entries.length == 0} onPress={() => removeLastWater()} label={"-"}/>
                    <Spacer flexible />
                    <Picker selectedValue={quickAmount} onValueChange={setQuickAmount}>
                        {QuickAmounts.map(f => (
                            <Picker.Item key={f} label={f.toString()} value={f} />
                        ))}
                    </Picker>
                    <Spacer flexible />
                    <Button variant="outlined" onPress={() => addWater(quickAmount)} label={"+"}/>
                </Row>
            </Host>
            <Text className={"text-gray-500 mb-0.5"}>{Math.round(progress * 100)}% of daily goal</Text>
            <View style={{height: 10}}>
                <Animated.View className={"bg-gray-700 absolute"} style={{width: `100%`,transitionProperty: 'width',
                    transitionDuration: 300,height: '100%',borderRadius: 7}} />
                <Animated.View className={"bg-blue-400"} style={{width: `${progress * 100}%`,transitionProperty: 'width',
                    transitionDuration: 300,height: '100%',borderRadius: 7}} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#151b2c', borderRadius: 22, padding: 28, overflow: 'hidden' },
    emoji: { fontSize: 40 },
    title: { color: 'white', fontSize: 29, fontWeight: '800', marginTop: 0 },
    pickerContainer: { height: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between', margin: 10,backgroundColor: '#ff0000' },
    subtitle: { color: '#cbd5e1', fontSize: 16, marginTop: 8 } });
