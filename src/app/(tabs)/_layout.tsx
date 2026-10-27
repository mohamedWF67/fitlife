import { Icon, Label } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";
import type { SFSymbol } from "sf-symbols-typescript";

const icon2: SFSymbol = "leaf.fill";

export default function TabLayout() {
  return (
    <NativeTabs>
        <NativeTabs.Trigger name="index">
            <Icon sf={"house.fill"} />
            <Label>Home</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="workouts">
            <Icon sf="dumbbell.fill" />
            <Label>Workouts</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="nutrition">
            <Icon sf="leaf.fill" />
            <Label>Nutrition</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="waterReminder">
            <Icon sf="waterbottle.fill" />
            <Label>Hydration</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="sleep">
            <Icon sf="bed.double.fill" />
            <Label>Sleep</Label>
        </NativeTabs.Trigger>
    </NativeTabs>
  );
}
