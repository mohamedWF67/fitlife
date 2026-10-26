import {Icon, Label} from 'expo-router';
import type { SFSymbol } from 'sf-symbols-typescript'
import {
    NativeTabs
} from 'expo-router/native-tabs';

const icon: SFSymbol = "waterbottle"
const icon2: SFSymbol = "magnifyingglass"

export default function TabLayout() {
  return <NativeTabs>
    <NativeTabs.Trigger name="index">
      <Icon sf={"house.fill"} />
      <Label>Home</Label>
    </NativeTabs.Trigger>
    <NativeTabs.Trigger name="nutrition">
      <Icon sf={icon2} />
      <Label>Nutrition</Label>
    </NativeTabs.Trigger>
    <NativeTabs.Trigger name="waterReminder">\
      <Icon sf={icon} />
      <Label>Water</Label>
    </NativeTabs.Trigger>
  </NativeTabs>;
}
