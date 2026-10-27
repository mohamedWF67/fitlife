import type { ReactNode } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View,
  type TextInputProps,
} from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

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
    <View className="flex-1 bg-[#144577]">
      <LinearGradient colors={[colors.background, colors.inset]} className="absolute top-0 right-0 bottom-0 left-0" />
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled"
            contentContainerClassName="w-full max-w-2xl self-center gap-4 px-4 pt-3 pb-10 web:pt-20">
            {back ? (
              <Pressable accessibilityRole="button" onPress={() => router.canGoBack() ? router.back() : router.replace('/workouts')}
                className="min-h-11 justify-center self-start">
                <Text className={ui.link}>‹  Workouts</Text>
              </Pressable>
            ) : <Text className="mt-3 text-xs font-extrabold tracking-widest text-blue-200">FITLIFE / TRAINING</Text>}
            <View className="mb-1 gap-2">
              <Text accessibilityRole="header" className="text-3xl font-extrabold tracking-tight text-white">{title}</Text>
              <Text className={ui.subtitle}>{subtitle}</Text>
            </View>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View className="gap-3.5 rounded-3xl bg-[#151b2c] p-5">{children}</View>;
}

export function ActionButton({ label, onPress, secondary = false, disabled = false }: {
  label: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" aria-disabled={disabled} disabled={disabled} onPress={onPress}
      className={`min-h-12 items-center justify-center rounded-xl px-4 py-3.5 active:opacity-45 ${secondary ? 'border border-slate-700 bg-slate-900' : 'bg-blue-400'} ${disabled ? 'opacity-45' : ''}`}>
      <Text className={`text-center text-base font-extrabold ${secondary ? 'text-blue-400' : 'text-slate-900'}`}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" aria-selected={selected} onPress={onPress}
      className={`min-h-11 justify-center rounded-xl border px-3 py-2.5 active:opacity-45 ${selected ? 'border-blue-400 bg-blue-400' : 'border-slate-700 bg-slate-900'}`}>
      <Text className={`text-sm font-bold ${selected ? 'text-slate-900' : 'text-slate-300'}`}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View className="gap-2">
      <Text className={ui.label}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor="#94a3b8" selectionColor={colors.accent}
        {...props} className="min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 text-base text-white" />
    </View>
  );
}

export function Message({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <Text accessibilityRole={error ? 'alert' : undefined} accessibilityLiveRegion="polite"
    className={`text-sm ${error ? 'text-rose-300' : 'text-green-300'}`}>{children}</Text>;
}

export function Stepper({ label, exerciseName, value, min, max, onChange }: {
  label: string; exerciseName: string; value: number; min: number; max: number; onChange: (value: number) => void;
}) {
  return (
    <View className="gap-1">
      <Text className={ui.caption}>{label}</Text>
      <View className="flex-row items-center gap-2.5">
        <Pressable accessibilityRole="button" accessibilityLabel={`Decrease ${label} for ${exerciseName}`} disabled={value <= min}
          aria-disabled={value <= min} onPress={() => onChange(value - 1)}
          className={`min-h-11 min-w-11 items-center justify-center rounded-xl bg-slate-900 ${value <= min ? 'opacity-45' : ''}`}>
          <Text className={ui.link}>−</Text>
        </Pressable>
        <Text className={ui.label}>{value}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${label} for ${exerciseName}`} disabled={value >= max}
          aria-disabled={value >= max} onPress={() => onChange(value + 1)}
          className={`min-h-11 min-w-11 items-center justify-center rounded-xl bg-slate-900 ${value >= max ? 'opacity-45' : ''}`}>
          <Text className={ui.link}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function DumbbellMark() {
  return <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
    className="h-13 w-13 rotate-[-25deg] flex-row items-center justify-center rounded-2xl bg-[#1e3a5f]">
    <View className="h-6 w-2 rounded-sm bg-blue-400" /><View className="h-1 w-4 bg-blue-400" /><View className="h-6 w-2 rounded-sm bg-blue-400" />
  </View>;
}

// Tailwind classes shared by the workout screens.
export const ui = {
  subtitle: 'text-base text-slate-300',
  heading: 'text-xl font-extrabold text-white',
  label: 'text-base font-bold text-white',
  caption: 'text-sm text-slate-300',
  badge: 'text-xs font-extrabold tracking-wider text-blue-400',
  link: 'text-base font-bold text-blue-400',
  inset: 'gap-2 rounded-2xl bg-slate-900 p-3.5',
  between: 'flex-row items-center justify-between gap-3',
  wrap: 'flex-row flex-wrap gap-2',
  section: 'gap-3',
  grow: 'min-w-0 flex-1',
};
