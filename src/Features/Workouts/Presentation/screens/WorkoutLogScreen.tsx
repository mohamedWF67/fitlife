import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { exerciseById } from '../../data/mock/Workouts';
import { validSet } from '../../domain/workoutUtils';
import type { WorkoutSet } from '../../domain/entities/Workout';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Message, WorkoutScreen, ui } from '../components/WorkoutUI';

export default function WorkoutLogScreen() {
  const { draft, setDraft, finishWorkout, newId } = useWorkouts();
  const [error, setError] = useState('');
  const [invalidSetId, setInvalidSetId] = useState<string | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  if (!draft) return <WorkoutScreen back title="Log a workout" subtitle="Choose a routine and make every set count.">
    <Card>
      <Text className={ui.heading}>Ready to move?</Text>
      <Text className={ui.subtitle}>Start a plan from Workouts to record your sets, reps, and weights.</Text>
      <ActionButton label="Choose a workout" onPress={() => router.dismissTo('/workouts')} />
    </Card>
  </WorkoutScreen>;

  const allSets = draft.exercises.flatMap(exercise => exercise.sets);
  const completed = allSets.filter(set => set.completed);
  const volume = completed.reduce((sum, set) => sum + Number(set.reps) * Number(set.weight), 0);
  const progress = completed.length / allSets.length;

  const updateSet = (exerciseId: string, setId: string, patch: Partial<WorkoutSet>) => {
    setError('');
    setInvalidSetId(null);
    setConfirmFinish(false);
    setDraft(current => current && ({ ...current, exercises: current.exercises.map(exercise => exercise.exerciseId === exerciseId
      ? { ...exercise, sets: exercise.sets.map(set => set.id === setId ? { ...set, ...patch } : set) } : exercise) }));
  };

  const save = () => {
    setInvalidSetId(null);
    if (!completed.length) { setError('Complete at least one set before finishing your workout.'); return; }
    if (completed.some(set => !validSet(set))) { setError('Check your completed sets: reps must be 1–999 and weight must be 0–2,000 kg.'); return; }
    if (completed.length < allSets.length && !confirmFinish) { setConfirmFinish(true); setError(''); return; }
    if (finishWorkout()) router.dismissTo('/workouts');
  };

  return (
    <WorkoutScreen back title="Log workout" subtitle={draft.planName}>
      <Card>
        <Text className={ui.badge}>ONE SET AT A TIME</Text>
        <View className={ui.between}>
          <View className={ui.grow}><Text className="text-3xl font-extrabold text-white">{completed.length}<Text className="text-lg font-medium text-slate-300"> / {allSets.length}</Text></Text>
            <Text className={ui.caption}>sets completed</Text></View>
          <View className={ui.grow}><Text className="text-3xl font-extrabold text-white">{volume.toLocaleString()}</Text><Text className={ui.caption}>kg total volume</Text></View>
        </View>
        <View role="progressbar" accessibilityLabel="Completed workout sets" aria-valuemin={0} aria-valuemax={allSets.length} aria-valuenow={completed.length}
          className="h-2 overflow-hidden rounded-full bg-slate-700">
          <View className="h-full rounded-full bg-blue-400" style={{ width: `${progress * 100}%` }} />
        </View>
        <Text className={ui.caption}>Enter what you did, then tap the check. Use 0 kg for bodyweight. Weight is the total load used for that exercise.</Text>
      </Card>

      {draft.exercises.map((exercise, exerciseIndex) => <Card key={exercise.exerciseId}>
        <Text className={ui.badge}>EXERCISE {String(exerciseIndex + 1).padStart(2, '0')}</Text>
        <Text className={ui.heading}>{exerciseById[exercise.exerciseId].name}</Text>
        <Text className={ui.caption}>{exerciseById[exercise.exerciseId].equipment}</Text>
        <View className="flex-row items-center gap-2">
          <Text className={`${ui.caption} w-6 text-center`}>Set</Text>
          <Text className={`${ui.caption} flex-1 text-center`}>kg</Text>
          <Text className={`${ui.caption} flex-1 text-center`}>Reps</Text>
          <Text className={`${ui.caption} w-11 text-center`}>Done</Text>
        </View>
        {exercise.sets.map((set, setIndex) => <View key={set.id} className={`flex-row items-center gap-2 ${set.completed ? 'opacity-90' : ''}`}>
          <Text className={`${ui.label} w-6 text-center`}>{setIndex + 1}</Text>
          <TextInput accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1}, weight in kilograms`}
            keyboardType="decimal-pad" value={set.weight} editable={!set.completed} maxLength={7} selectTextOnFocus
            onChangeText={weight => updateSet(exercise.exerciseId, set.id, { weight })}
            className={`min-h-12 min-w-0 flex-1 rounded-xl border bg-slate-900 px-1 py-2.5 text-center text-base ${set.completed ? 'border-[#315349] text-green-300' : 'border-slate-700 text-white'}`} />
          <TextInput accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1}, reps`}
            keyboardType="number-pad" value={set.reps} editable={!set.completed} maxLength={3} selectTextOnFocus
            onChangeText={reps => updateSet(exercise.exerciseId, set.id, { reps })}
            className={`min-h-12 min-w-0 flex-1 rounded-xl border bg-slate-900 px-1 py-2.5 text-center text-base ${set.completed ? 'border-[#315349] text-green-300' : 'border-slate-700 text-white'}`} />
          <Pressable accessibilityRole="checkbox" aria-checked={set.completed}
            accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1} complete`}
            onPress={() => {
              if (!set.completed && !validSet(set)) { setInvalidSetId(set.id); setError(`Check set ${setIndex + 1}: use 1–999 reps and 0–2,000 kg (up to 2 decimals).`); return; }
              setError('');
              updateSet(exercise.exerciseId, set.id, { completed: !set.completed });
            }} className={`min-h-12 w-11 items-center justify-center rounded-xl border ${set.completed ? 'border-green-300 bg-green-300' : 'border-slate-700 bg-slate-900'}`}>
            <Text className={`text-xl font-extrabold ${set.completed ? 'text-slate-900' : 'text-slate-300'}`}>✓</Text>
          </Pressable>
        </View>)}
        {!!error && exercise.sets.some(set => set.id === invalidSetId) && <Message error>{error}</Message>}
        <ActionButton secondary label="+  Add a set" disabled={exercise.sets.length >= 12} onPress={() => {
          const last = exercise.sets[exercise.sets.length - 1];
          const nextSet: WorkoutSet = { id: newId(), reps: last.reps, weight: last.weight, completed: false };
          setConfirmFinish(false);
          setDraft(current => current && ({ ...current, exercises: current.exercises.map(item => item.exerciseId === exercise.exerciseId
            ? { ...item, sets: [...item.sets, nextSet] } : item) }));
        }} />
        <Text className={ui.caption}>Tap a completed check again to edit that set.</Text>
      </Card>)}

      <Card>
        {!!error && !invalidSetId && <Message error>{error}</Message>}
        {confirmFinish && <Message>{allSets.length - completed.length} sets are unfinished. Save only your {completed.length} completed sets?</Message>}
        <ActionButton label={confirmFinish ? 'Save completed sets' : 'Finish workout'} onPress={save} />
        {confirmFinish && <ActionButton secondary label="Keep training" onPress={() => setConfirmFinish(false)} />}
        <Text className={ui.caption}>Completed sets are added to your recent activity. You can leave this screen and resume this session from Workouts.</Text>
        {confirmDiscard ? <>
          <Message error>Discard this workout? All sets in this session will be lost.</Message>
          <ActionButton secondary label="Keep this workout" onPress={() => setConfirmDiscard(false)} />
          <ActionButton secondary label="Discard session" onPress={() => { setDraft(null); router.dismissTo('/workouts'); }} />
        </> : <ActionButton secondary label="Cancel workout" onPress={() => setConfirmDiscard(true)} />}
      </Card>
    </WorkoutScreen>
  );
}
