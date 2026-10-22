import {Icon, Label, VectorIcon} from 'expo-router';
import type { SFSymbol } from 'sf-symbols-typescript'

const icon: SFSymbol = "waterbottle"
const icon2: SFSymbol = "magnifyingglass"
import {
    NativeTabs
} from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return <NativeTabs>
    <NativeTabs.Trigger name="index">
      <Icon sf={"house.fill"} />
      <Label>Home</Label>
    </NativeTabs.Trigger>
    <NativeTabs.Trigger name="explore">
      <Icon sf={icon2} />
      <Label>Explore</Label>
    </NativeTabs.Trigger>
    <NativeTabs.Trigger name="waterReminder">\
      <Icon sf={icon} />
      <Label>Water</Label>
    </NativeTabs.Trigger>
  </NativeTabs>;
}
