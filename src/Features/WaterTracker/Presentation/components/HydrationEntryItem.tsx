import {StyleSheet, View} from "react-native";
import {Host, Button, Text, Spacer, Row, Column} from '@expo/ui';

type props = {amount: number, id: string, time: string, removeWater: (id: string) => void}

export default function HydrationEntryItem({amount, id, time,removeWater}: props) {
    return(
        <View style={styles.card}>
            <Host   matchContents={{ horizontal: false, vertical: true }}
                    style={{ width: '100%'}}>
                <Row alignment={"center"}>
                    <Column spacing={0} alignment="start">
                        <Text textStyle={{fontSize: 29,fontWeight: "800"}}>{amount.toString() + "ml"}</Text>
                        <Text>{time}</Text>
                    </Column>
                    <Spacer flexible/>
                    <Button variant="outlined" onPress={() => removeWater(id)} label={"Remove"}/>
                </Row>
            </Host>
        </View>
    )
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#151b2c', borderRadius: 22, padding: 16, flexDirection: 'column' },
    emoji: { fontSize: 40 },
    title: { color: 'white', fontSize: 29, fontWeight: '800', marginTop: 0 },
    pickerContainer: { height: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between', margin: 10,backgroundColor: '#ff0000' },
    subtitle: { color: '#cbd5e1', fontSize: 16 } });
