import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { exercises, exerciseById } from '../../data/mock/Workouts';
import type { ExperienceLevel, PlanExercise, WorkoutGoal } from '../../domain/entities/Workout';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Chip, Field, Message, Stepper, WorkoutScreen, ui } from '../components/WorkoutUI';

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
        <Text className={ui.badge}>01 / YOUR ROUTINE</Text>
        <Field label="Plan name" value={name} onChangeText={value => { setName(value); setError(''); }} maxLength={60} placeholder="e.g. My full body plan" />
        <Text className={ui.label}>What are you working toward?</Text>
        <View className={ui.wrap}>{goals.map(item => <Chip key={item} label={item} selected={goal === item} onPress={() => setGoal(item)} />)}</View>
        <Text className={ui.label}>Experience level</Text>
        <View className={ui.wrap}>{levels.map(item => <Chip key={item} label={item} selected={level === item} onPress={() => setLevel(item)} />)}</View>
        <Text className={ui.label}>Training days per week</Text>
        <View className={ui.wrap}>{[1, 2, 3, 4, 5, 6].map(item => <Chip key={item} label={String(item)} selected={days === item} onPress={() => setDays(item)} />)}</View>
        <Text className={ui.caption}>{7 - days} rest {7 - days === 1 ? 'day' : 'days'} in your week. Add your training dates in Schedule.</Text>
      </Card>

      <Card>
        <Text className={ui.badge}>02 / CHOOSE EXERCISES</Text>
        <Text className={ui.heading}>Build your lineup</Text>
        <Text className={ui.caption}>Select exercises for this routine. Your goal and level are saved as preferences; you choose the exercises and targets.</Text>
        <Field label="Search exercises" value={search} onChangeText={setSearch} placeholder="Exercise or equipment" autoCapitalize="none" />
        <View className={ui.wrap}>{muscles.map(item => <Chip key={item} label={item} selected={muscle === item} onPress={() => setMuscle(item)} />)}</View>
        {filtered.length === 0 && <Text className={ui.caption}>No matching exercises. Try another name or body area.</Text>}
        {filtered.map(exercise => {
          const isSelected = selected.some(item => item.exerciseId === exercise.id);
          return <Pressable key={exercise.id} accessibilityRole="checkbox" aria-checked={isSelected}
            accessibilityLabel={`${exercise.name}, ${exercise.muscle}, ${exercise.equipment}`} onPress={() => toggleExercise(exercise.id)}
            className={`min-h-19 flex-row items-center gap-3 rounded-2xl border p-3.5 active:opacity-45 ${isSelected ? 'border-blue-400 bg-[#1b2d46]' : 'border-slate-700'}`}>
            <View className={ui.grow}>
              <Text className={ui.label}>{exercise.name}</Text>
              <Text className={ui.caption}>{exercise.muscle} · {exercise.equipment}</Text>
            </View>
            <View className={`h-7 w-7 items-center justify-center rounded-lg border border-blue-400 ${isSelected ? 'bg-blue-400' : ''}`}>
              <Text className={`text-lg font-bold ${isSelected ? 'text-slate-900' : 'text-white'}`}>{isSelected ? '✓' : '+'}</Text>
            </View>
          </Pressable>;
        })}
      </Card>

      <Card>
        <Text className={ui.badge}>03 / SET YOUR TARGETS</Text>
        <Text className={ui.heading}>Your session · {selected.length} exercises</Text>
        {selected.length === 0 && <Text className={ui.caption}>Choose an exercise above to set its sets and reps.</Text>}
        {selected.map((item, index) => <View key={item.exerciseId} className={ui.inset}>
          <View className={ui.between}>
            <Text className={`${ui.label} ${ui.grow}`}>{index + 1}. {exerciseById[item.exerciseId].name}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${exerciseById[item.exerciseId].name}`}
              onPress={() => toggleExercise(item.exerciseId)} className="min-h-11 justify-center">
              <Text className={ui.caption}>Remove</Text>
            </Pressable>
          </View>
          <View className={ui.wrap}>
            <Stepper label="Sets" exerciseName={exerciseById[item.exerciseId].name} value={item.sets} min={1} max={8}
              onChange={sets => updateExercise(item.exerciseId, { sets })} />
            <Stepper label="Reps" exerciseName={exerciseById[item.exerciseId].name} value={item.reps} min={1} max={30}
              onChange={reps => updateExercise(item.exerciseId, { reps })} />
          </View>
        </View>)}
        <Text className={ui.caption}>{selected.reduce((sum, exercise) => sum + exercise.sets, 0)} total sets · Add weights when you log your workout.</Text>
        {!!error && <Message error>{error}</Message>}
        <ActionButton label={existing ? 'Save plan changes' : 'Save my plan'} onPress={save} />
      </Card>
    </WorkoutScreen>
  );
}
