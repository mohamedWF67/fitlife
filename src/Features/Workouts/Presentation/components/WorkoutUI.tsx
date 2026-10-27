import type { ReactNode } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View,
  type TextInputProps,
} from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import GlobalGradientBackground from '@/components/GlobalGradientBackground';

const SafeAreaView = styled(RNSafeAreaView);

// The app's shared palette (same as Nutrition, Hydration and Sleep).
export const colors = {
  background: '#18152b', card: '#26263b', inset: '#303049', border: '#303049',
  text: '#ffffff', muted: '#d1d5dc', accent: '#5438be', accentText: '#ffffff',
  success: '#86efac', danger: '#fda4af',
};

export function WorkoutScreen({ title, subtitle, back = false, children }: {
  title: string; subtitle: string; back?: boolean; children: ReactNode;
}) {
  return (
    <View className="flex-1 bg-[#18152b]">
      <GlobalGradientBackground />
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled"
            contentContainerClassName="w-full max-w-2xl self-center gap-4 px-4 pt-3 pb-10 web:pt-20">
            {back ? (
              <Pressable accessibilityRole="button" onPress={() => router.canGoBack() ? router.back() : router.replace('/workouts')}
                className="min-h-11 justify-center self-start">
                <Text className={ui.link}>‹  Workouts</Text>
              </Pressable>
            ) : <Text className="mt-3 text-xs font-extrabold tracking-widest text-gray-500">FITLIFE / TRAINING</Text>}
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
  return <View className="gap-3.5 rounded-3xl bg-[#26263b] p-5">{children}</View>;
}

export function ActionButton({ label, onPress, secondary = false, disabled = false }: {
  label: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" aria-disabled={disabled} disabled={disabled} onPress={onPress}
      className={`min-h-12 items-center justify-center rounded-xl px-4 py-3.5 active:opacity-45 ${secondary ? 'border border-[#303049] bg-[#303049]' : 'bg-[#5438be]'} ${disabled ? 'opacity-45' : ''}`}>
      <Text className="text-center text-base font-extrabold text-white">{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" aria-selected={selected} onPress={onPress}
      className={`min-h-11 justify-center rounded-xl border px-3 py-2.5 active:opacity-45 ${selected ? 'border-[#5438be] bg-[#5438be]' : 'border-[#303049] bg-[#303049]'}`}>
      <Text className={`text-sm font-bold ${selected ? 'text-white' : 'text-gray-300'}`}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View className="gap-2">
      <Text className={ui.label}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor="#6a7282" selectionColor={colors.accent}
        {...props} className="min-h-12 rounded-xl border border-gray-500 px-3.5 py-3 text-base text-white" />
    </View>
  );
}

export function Message({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <Text accessibilityRole={error ? 'alert' : undefined} accessibilityLiveRegion="polite"
    className={`text-sm ${error ? 'text-red-400' : 'text-green-300'}`}>{children}</Text>;
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
          className={`min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#303049] ${value <= min ? 'opacity-45' : ''}`}>
          <Text className={ui.link}>−</Text>
        </Pressable>
        <Text className={ui.label}>{value}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${label} for ${exerciseName}`} disabled={value >= max}
          aria-disabled={value >= max} onPress={() => onChange(value + 1)}
          className={`min-h-11 min-w-11 items-center justify-center rounded-xl bg-[#303049] ${value >= max ? 'opacity-45' : ''}`}>
          <Text className={ui.link}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function DumbbellMark() {
  return <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
    className="h-13 w-13 rotate-[-25deg] flex-row items-center justify-center rounded-2xl bg-[#303049]">
    <View className="h-6 w-2 rounded-sm bg-[#5438be]" /><View className="h-1 w-4 bg-[#5438be]" /><View className="h-6 w-2 rounded-sm bg-[#5438be]" />
  </View>;
}

// Tailwind classes shared by the workout screens.
export const ui = {
  subtitle: 'text-base text-gray-300',
  heading: 'text-xl font-extrabold text-white',
  label: 'text-base font-bold text-white',
  caption: 'text-sm text-gray-400',
  badge: 'text-xs font-extrabold tracking-wider text-gray-500',
  link: 'text-base font-bold text-white',
  inset: 'gap-2 rounded-2xl bg-[#303049] p-3.5',
  between: 'flex-row items-center justify-between gap-3',
  wrap: 'flex-row flex-wrap gap-2',
  section: 'gap-3',
  grow: 'min-w-0 flex-1',
};
