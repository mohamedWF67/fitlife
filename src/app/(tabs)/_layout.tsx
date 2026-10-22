import { Icon,Label } from 'expo-router';
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
      <Icon sf={"circle.fill"} />
      <Label>Explore</Label>
    </NativeTabs.Trigger>
  </NativeTabs>;
}
