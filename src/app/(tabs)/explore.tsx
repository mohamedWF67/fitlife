import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return <View style={styles.screen}>
    <Text style={styles.heading}>Explore</Text>
    <Text style={styles.text}>Edit src/app/(tabs)/explore.tsx to build your next feature.</Text>
  </View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f8fafc' }, heading: { fontSize: 30, fontWeight: '800', color: '#0f172a' }, text: { marginTop: 12, color: '#475569', fontSize: 16 } });
