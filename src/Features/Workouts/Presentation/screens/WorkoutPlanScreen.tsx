import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { exercises, exerciseById } from '../../data/mock/Workouts';
import type { ExperienceLevel, PlanExercise, WorkoutGoal } from '../../domain/entities/Workout';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Chip, Field, Message, Stepper, WorkoutScreen, colors, ui } from '../components/WorkoutUI';

const goals: WorkoutGoal[] = ['Build muscle', 'Get stronger', 'Stay active'];
const levels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const muscles = ['All', 'Upper body', 'Lower body', 'Core'] as const;

export default function WorkoutPlanScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { plans, savePlan } = useWorkouts();
  const existing = plans.find(plan => plan.id === id);
  const [name, setName] = useState(existing?.name ?? 'My full body plan');
  const [goal, setGoal] = useState<WorkoutGoal>(existing?.goal ?? 'Stay active');
  const [level, setLevel] = useState<ExperienceLevel>(existing?.level ?? 'Beginner');
  const [days, setDays] = useState(existing?.daysPerWeek ?? 3);
  const [selected, setSelected] = useState<PlanExercise[]>(existing?.exercises.map(exercise => ({ ...exercise })) ?? []);
  const [search, setSearch] = useState('');
  const [muscle, setMuscle] = useState<string>('All');
  const [error, setError] = useState('');
  const filtered = exercises.filter(exercise => (muscle === 'All' || muscle === exercise.muscle)
    && `${exercise.name} ${exercise.equipment}`.toLowerCase().includes(search.trim().toLowerCase()));

  const toggleExercise = (exerciseId: string) => {
    setError('');
    setSelected(current => current.some(item => item.exerciseId === exerciseId)
      ? current.filter(item => item.exerciseId !== exerciseId)
      : [...current, { exerciseId, sets: 3, reps: 10 }]);
  };

  const updateExercise = (exerciseId: string, patch: Partial<PlanExercise>) => {
    setSelected(current => current.map(item => item.exerciseId === exerciseId ? { ...item, ...patch } : item));
  };

  const save = () => {
    if (!name.trim()) { setError('Give your plan a name before saving.'); return; }
    if (!selected.length) { setError('Choose at least one exercise for your plan.'); return; }
    savePlan({ id: existing?.id, name: name.trim(), goal, level, daysPerWeek: days, exercises: selected });
    router.dismissTo('/workouts');
  };

  return (
    <WorkoutScreen back title={existing ? 'Edit your plan' : 'Create your plan'} subtitle="Make a routine that fits your goals and your week.">
      <Card>
        <Text style={ui.badge}>01 / YOUR ROUTINE</Text>
        <Field label="Plan name" value={name} onChangeText={value => { setName(value); setError(''); }} maxLength={60} placeholder="e.g. My full body plan" />
        <Text style={ui.label}>What are you working toward?</Text>
        <View style={ui.wrap}>{goals.map(item => <Chip key={item} label={item} selected={goal === item} onPress={() => setGoal(item)} />)}</View>
        <Text style={ui.label}>Experience level</Text>
        <View style={ui.wrap}>{levels.map(item => <Chip key={item} label={item} selected={level === item} onPress={() => setLevel(item)} />)}</View>
        <Text style={ui.label}>Training days per week</Text>
        <View style={ui.wrap}>{[1, 2, 3, 4, 5, 6].map(item => <Chip key={item} label={String(item)} selected={days === item} onPress={() => setDays(item)} />)}</View>
        <Text style={ui.caption}>{7 - days} rest {7 - days === 1 ? 'day' : 'days'} in your week. Add your training dates in Schedule.</Text>
      </Card>

      <Card>
        <Text style={ui.badge}>02 / CHOOSE EXERCISES</Text>
        <Text style={ui.heading}>Build your lineup</Text>
        <Text style={ui.caption}>Select exercises for this routine. Your goal and level are saved as preferences; you choose the exercises and targets.</Text>
        <Field label="Search exercises" value={search} onChangeText={setSearch} placeholder="Exercise or equipment" autoCapitalize="none" />
        <View style={ui.wrap}>{muscles.map(item => <Chip key={item} label={item} selected={muscle === item} onPress={() => setMuscle(item)} />)}</View>
        {filtered.length === 0 && <Text style={ui.caption}>No matching exercises. Try another name or body area.</Text>}
        {filtered.map(exercise => {
          const isSelected = selected.some(item => item.exerciseId === exercise.id);
          return <Pressable key={exercise.id} accessibilityRole="checkbox" aria-checked={isSelected}
            accessibilityLabel={`${exercise.name}, ${exercise.muscle}, ${exercise.equipment}`} onPress={() => toggleExercise(exercise.id)}
            style={({ pressed }) => [styles.exercise, isSelected && styles.selectedExercise, pressed && ui.dimmed]}>
            <View style={ui.grow}>
              <Text style={ui.label}>{exercise.name}</Text>
              <Text style={ui.caption}>{exercise.muscle} · {exercise.equipment}</Text>
            </View>
            <View style={[styles.checkbox, isSelected && styles.checked]}><Text style={[styles.checkText, isSelected && styles.selectedCheckText]}>{isSelected ? '✓' : '+'}</Text></View>
          </Pressable>;
        })}
      </Card>

      <Card>
        <Text style={ui.badge}>03 / SET YOUR TARGETS</Text>
        <Text style={ui.heading}>Your session · {selected.length} exercises</Text>
        {selected.length === 0 && <Text style={ui.caption}>Choose an exercise above to set its sets and reps.</Text>}
        {selected.map((item, index) => <View key={item.exerciseId} style={ui.inset}>
          <View style={ui.between}>
            <Text style={[ui.label, ui.grow]}>{index + 1}. {exerciseById[item.exerciseId].name}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${exerciseById[item.exerciseId].name}`}
              onPress={() => toggleExercise(item.exerciseId)} style={styles.remove}>
              <Text style={ui.caption}>Remove</Text>
            </Pressable>
          </View>
          <View style={ui.wrap}>
            <Stepper label="Sets" exerciseName={exerciseById[item.exerciseId].name} value={item.sets} min={1} max={8}
              onChange={sets => updateExercise(item.exerciseId, { sets })} />
            <Stepper label="Reps" exerciseName={exerciseById[item.exerciseId].name} value={item.reps} min={1} max={30}
              onChange={reps => updateExercise(item.exerciseId, { reps })} />
          </View>
        </View>)}
        <Text style={ui.caption}>{selected.reduce((sum, exercise) => sum + exercise.sets, 0)} total sets · Add weights when you log your workout.</Text>
        {!!error && <Message error>{error}</Message>}
        <ActionButton label={existing ? 'Save plan changes' : 'Save my plan'} onPress={save} />
      </Card>
    </WorkoutScreen>
  );
}

const styles = StyleSheet.create({
  exercise: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.border, minHeight: 76 },
  selectedExercise: { borderColor: colors.accent, backgroundColor: '#1b2d46' },
  checkbox: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: colors.accent },
  checkText: { color: colors.text, fontSize: 18, fontWeight: '700' },
  selectedCheckText: { color: colors.accentText },
  remove: { minHeight: 44, justifyContent: 'center' },
});
