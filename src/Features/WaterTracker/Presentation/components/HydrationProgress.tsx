import { Pressable, StyleSheet, Text, View} from "react-native";
import {Host, Button, Picker, Row, Spacer} from '@expo/ui';
import {useState} from "react";
import Animated, { FadeIn,} from "react-native-reanimated";
import {TextInput} from "react-native"

type props = {total: number,cups: number, goal: number, progress: number,resetHydration: () => void, addWater: (amount: number) => void, removeLastWater: () => void, entries: any[]}
const QuickAmounts = [250,500,750];

export default function HydrationProgress({total,cups, goal, progress, addWater,removeLastWater,entries}: props) {
    const [quickAmount, setQuickAmount] = useState<number | "Custom">(QuickAmounts[0]);
    const [customAmount, setCustomAmount] = useState("");
    const isCustomAmount = quickAmount === "Custom";

    return(
        <Animated.View entering={FadeIn.duration(200)} style={styles.card}>
            <View className={"flex-row justify-between"}>
                <View>
                    <Animated.Text
                        key={total}
                        entering={FadeIn.duration(100)}
                        style={styles.title}>{total}</Animated.Text>
                    <Pressable onLongPress={() => console.log("Long press")}>
                    <Animated.Text
                        className="text-gray-500 text-left"
                        entering={FadeIn.duration(100)}>{cups} Cups</Animated.Text>
                    </Pressable>
                    </View>
                <View>
                    <Pressable onLongPress={() => console.log("Long press")}>
                        <Animated.Text
                            entering={FadeIn.duration(100)}
                            style={styles.title}>{goal} ml</Animated.Text>
                    </Pressable>
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
                        <Picker.Item key={"Custom"} label={"Custom"} value={"Custom"} />
                    </Picker>
                    <Spacer flexible />
                    <Button variant="outlined" disabled={customAmount == "" && isCustomAmount} onPress={() => {
                    if (!isCustomAmount)addWater(quickAmount)
                        else
                    {
                        addWater(Number(customAmount))
                        setCustomAmount("")
                    }
                    }} label={"+"}/>
                </Row>
            </Host>
            {isCustomAmount && (
                    <TextInput
                        className={"w-full rounded-2xl border border-gray-500 p-2 mt-2 mb-2 text-white"}
                        autoFocus={true}
                        placeholder="Enter custom number"
                        keyboardType="numeric"
                        value={customAmount}
                        onChangeText={setCustomAmount}
                    />
            )}
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
