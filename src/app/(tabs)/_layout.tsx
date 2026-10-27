import { Icon, Label } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";
import type { SFSymbol } from "sf-symbols-typescript";

const icon: SFSymbol = "waterbottle";
const icon2: SFSymbol = "music.microphone.circle.fill";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={"house.fill"} />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="nutrition">
        <Icon sf={icon2} />
        <Label>Nutrition</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="waterReminder">
        <Icon sf={icon} />
        <Label>Water</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
