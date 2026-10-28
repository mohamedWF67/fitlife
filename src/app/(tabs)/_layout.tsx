import { Icon, Label } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
        minimizeBehavior="automatic"
        tintColor="#5864f5"
        iconColor={{
            default: "#808080",
            selected: "#382461",
        }}
        labelStyle={{
            default: { color: "#808080" },
            selected: { color: "#382461" },
        }}>
        <NativeTabs.Trigger name="index">
            <Icon
                sf={{ default: 'house', selected: 'house.fill' }}
                md={{ default: 'home', selected: 'home_filled' }}
            />
            <Label>Home</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="workouts">
            <Icon
                sf={{ default: 'dumbbell', selected: 'dumbbell.fill' }}
                md={{ default: 'exercise', selected: "exercise" }}
            />
            <Label>Workouts</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="nutrition">
            <Icon
                sf={{ default: 'leaf', selected: 'leaf.fill' }}
                md={{ default: 'nutrition', selected: 'nutrition' }}
            />
            <Label>Nutrition</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="waterReminder">
            <Icon
                sf={{ default: 'drop', selected: 'drop.fill' }}
                md={{ default: 'water_drop', selected: 'water_drop' }}
            />
            <Label>Hydration</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="sleep">
            <Icon
                sf={{ default: 'bed.double', selected: 'bed.double.fill' }}
                md={{ default: 'bed', selected: 'bed' }}
            />
            <Label>Sleep</Label>
        </NativeTabs.Trigger>
    </NativeTabs>
  );
}
