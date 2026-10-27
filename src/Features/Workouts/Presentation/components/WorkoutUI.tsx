import type { ReactNode } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
  type TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Match the existing hydration feature without changing the app's global theme.
export const colors = {
  background: '#144577', card: '#151b2c', inset: '#0f172a', border: '#334155',
  text: '#ffffff', muted: '#cbd5e1', accent: '#60a5fa', accentText: '#0f172a',
  success: '#86efac', danger: '#fda4af',
};

export function WorkoutScreen({ title, subtitle, back = false, children }: {
  title: string; subtitle: string; back?: boolean; children: ReactNode;
}) {
  return (
    <View style={ui.screen}>
      <LinearGradient colors={[colors.background, colors.inset]} style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['top', 'left', 'right']} style={ui.flex}>
        <KeyboardAvoidingView style={ui.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={ui.content}>
            {back ? (
              <Pressable accessibilityRole="button" onPress={() => router.canGoBack() ? router.back() : router.replace('/workouts')} style={ui.back}>
                <Text style={ui.link}>‹  Workouts</Text>
              </Pressable>
            ) : <Text style={ui.eyebrow}>FITLIFE / TRAINING</Text>}
            <View style={ui.header}>
              <Text accessibilityRole="header" style={ui.title}>{title}</Text>
              <Text style={ui.subtitle}>{subtitle}</Text>
            </View>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View style={ui.card}>{children}</View>;
}

export function ActionButton({ label, onPress, secondary = false, disabled = false }: {
  label: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" aria-disabled={disabled} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [ui.button, secondary && ui.secondaryButton, (pressed || disabled) && ui.dimmed]}>
      <Text style={[ui.buttonText, secondary && ui.secondaryButtonText]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" aria-selected={selected} onPress={onPress}
      style={({ pressed }) => [ui.chip, selected && ui.selectedChip, pressed && ui.dimmed]}>
      <Text style={[ui.chipText, selected && ui.selectedChipText]}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={ui.field}>
      <Text style={ui.label}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor="#94a3b8" selectionColor={colors.accent}
        {...props} style={[ui.input, props.style]} />
    </View>
  );
}

export function Message({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <Text accessibilityRole={error ? 'alert' : undefined} accessibilityLiveRegion="polite"
    style={[ui.message, error && ui.error]}>{children}</Text>;
}

export function Stepper({ label, exerciseName, value, min, max, onChange }: {
  label: string; exerciseName: string; value: number; min: number; max: number; onChange: (value: number) => void;
}) {
  return (
    <View style={ui.stepperGroup}>
      <Text style={ui.caption}>{label}</Text>
      <View style={ui.stepper}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Decrease ${label} for ${exerciseName}`} disabled={value <= min}
          aria-disabled={value <= min} onPress={() => onChange(value - 1)} style={[ui.stepButton, value <= min && ui.dimmed]}>
          <Text style={ui.link}>−</Text>
        </Pressable>
        <Text style={ui.label}>{value}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${label} for ${exerciseName}`} disabled={value >= max}
          aria-disabled={value >= max} onPress={() => onChange(value + 1)} style={[ui.stepButton, value >= max && ui.dimmed]}>
          <Text style={ui.link}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function DumbbellMark() {
  return <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={ui.dumbbell}>
    <View style={ui.plate} /><View style={ui.bar} /><View style={ui.plate} />
  </View>;
}

export const ui = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingTop: Platform.OS === 'web' ? 80 : 12, paddingBottom: 40, gap: 18, width: '100%', maxWidth: 640, alignSelf: 'center' },
  header: { gap: 8, marginBottom: 4 },
  eyebrow: { color: '#bfdbfe', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginTop: 12 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  heading: { color: colors.text, fontSize: 21, fontWeight: '800' },
  label: { color: colors.text, fontSize: 15, fontWeight: '700' },
  caption: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  card: { backgroundColor: colors.card, borderRadius: 22, padding: 20, gap: 14 },
  inset: { backgroundColor: colors.inset, padding: 14, borderRadius: 16, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  section: { gap: 12 },
  grow: { flex: 1, minWidth: 0 },
  button: { backgroundColor: colors.accent, minHeight: 50, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.accentText, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  secondaryButton: { backgroundColor: colors.inset, borderColor: colors.border, borderWidth: 1 },
  secondaryButtonText: { color: colors.accent },
  dimmed: { opacity: 0.45 },
  chip: { minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.inset, paddingHorizontal: 13, paddingVertical: 11, justifyContent: 'center' },
  selectedChip: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  selectedChipText: { color: colors.accentText },
  field: { gap: 8 },
  input: { backgroundColor: colors.inset, borderWidth: 1, borderColor: colors.border, borderRadius: 12, minHeight: 50, paddingHorizontal: 14, paddingVertical: 12, color: colors.text, fontSize: 16 },
  message: { color: colors.success, fontSize: 14, lineHeight: 21 },
  error: { color: colors.danger },
  link: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  back: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
  badge: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: colors.border },
  stepperGroup: { gap: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.inset, borderRadius: 12 },
  dumbbell: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#1e3a5f', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-25deg' }] },
  plate: { width: 7, height: 24, backgroundColor: colors.accent, borderRadius: 3 },
  bar: { width: 15, height: 5, backgroundColor: colors.accent },
});
