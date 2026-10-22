import { StyleSheet, Text, View } from 'react-native';
export default function WaterReminder() {
    return <View style={styles.screen}>
        <Text style={styles.body}>Water Reminder Page.</Text>
    </View>;
}
const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f8fafc' },
    body: { color: '#334155', fontSize: 16, marginTop: 18, lineHeight: 24 },
    link: { color: '#2563eb', fontWeight: '700', fontSize: 16, marginTop: 24 },
});
