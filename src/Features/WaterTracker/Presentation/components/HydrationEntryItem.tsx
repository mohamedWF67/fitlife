import {View} from "react-native";
import {Host, Button, Text, Spacer, Row, Column} from '@expo/ui';

type props = {amount: number, id: string, time: string, removeWater: (id: string) => void}

export default function HydrationEntryItem({amount, id, time,removeWater}: props) {
    const [hours, min] = time.split(":").map(Number);
    const hours12 = (hours % 12 || 12).toString().padStart(2,'0');
    const formatedmin = min.toString().padStart(2,'0');
    const ampm = hours < 12 ? "AM" : "PM";
    return(
        <View className="flex-col p-4 rounded-3xl bg-[#26263b]">
            <Host   matchContents={{ horizontal: false, vertical: true }}
                    style={{ width: '100%'}}>
                <Row alignment={"center"}>
                    <Column spacing={0} alignment="start">
                        <Text textStyle={{fontSize: 29,fontWeight: "800"}}>{amount.toString() + "ml"}</Text>
                        <Text textStyle={{color: "#6b726b"}}>{hours12 + ":" + formatedmin + " " + ampm}</Text>
                    </Column>
                    <Spacer flexible/>
                    <Button variant="outlined" onPress={() => removeWater(id)} label={"Remove"}/>
                </Row>
            </Host>
        </View>
    )
}
