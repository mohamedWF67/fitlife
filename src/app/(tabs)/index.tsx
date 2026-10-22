import { StyleSheet, Text, View } from 'react-native';
import { WelcomeCard } from '@/components/WelcomeCard';

export default function HomeScreen() {
  return <View style={styles.screen}>
    <WelcomeCard />
    <Text style={styles.body}>A complete starting point for Expo SDK 57 with Expo Router and TypeScript.</Text>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f8fafc' },
  body: { color: '#334155', fontSize: 16, marginTop: 18, lineHeight: 24 },
  link: { color: '#2563eb', fontWeight: '700', fontSize: 16, marginTop: 24 },
});
