import { StyleSheet, Text, View } from 'react-native';

export function WelcomeCard() {
  return <View style={styles.card}>
    <Text style={styles.emoji}>🚀</Text>
    <Text style={styles.title}>Expo SDK 57</Text>
    <Text style={styles.subtitle}>Your app is ready to customize.</Text>
  </View>;
}
const styles = StyleSheet.create({ card: { backgroundColor: '#0f172a', borderRadius: 22, padding: 28 }, emoji: { fontSize: 40 }, title: { color: 'white', fontSize: 29, fontWeight: '800', marginTop: 16 }, subtitle: { color: '#cbd5e1', fontSize: 16, marginTop: 8 } });
