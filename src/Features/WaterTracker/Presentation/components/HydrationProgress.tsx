import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {Host, Button, Picker, Row, Spacer} from '@expo/ui';
import {useState} from "react";

type props = {total: number, goal: number, progress: number, addWater: (amount: number) => void, removeLastWater: () => void, entries: any[]}
const QuickAmounts = [100,200, 300, 400, 500, 600, 700, 800, 900, 1000];

export default function HydrationProgress({total, goal, progress, addWater,removeLastWater,entries}: props) {
    const [quickAmount, setQuickAmount] = useState(200);

    return(
        <View style={styles.card}>
            <Text style={styles.title}>{total} / {goal} ml</Text>
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
            <Text style={styles.subtitle}>{Math.round(progress * 100)}% of daily goal</Text>
            <View style={{height: 10}}>
                <View style={{width: `${progress * 100}%`, backgroundColor: '#2563eb',height: '100%',borderRadius: 7}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#151b2c', borderRadius: 22, padding: 28 },
    emoji: { fontSize: 40 },
    title: { color: 'white', fontSize: 29, fontWeight: '800', marginTop: 0 },
    pickerContainer: { height: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between', margin: 10,backgroundColor: '#ff0000' },
    subtitle: { color: '#cbd5e1', fontSize: 16, marginTop: 8 } });
