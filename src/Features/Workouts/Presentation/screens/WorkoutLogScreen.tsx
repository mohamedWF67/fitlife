import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { exerciseById } from '../../data/mock/Workouts';
import { validSet } from '../../domain/workoutUtils';
import type { WorkoutSet } from '../../domain/entities/Workout';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Message, WorkoutScreen, colors, ui } from '../components/WorkoutUI';

export default function WorkoutLogScreen() {
  const { draft, setDraft, finishWorkout, newId } = useWorkouts();
  const [error, setError] = useState('');
  const [invalidSetId, setInvalidSetId] = useState<string | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  if (!draft) return <WorkoutScreen back title="Log a workout" subtitle="Choose a routine and make every set count.">
    <Card>
      <Text style={ui.heading}>Ready to move?</Text>
      <Text style={ui.subtitle}>Start a plan from Workouts to record your sets, reps, and weights.</Text>
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
        <Text style={ui.badge}>ONE SET AT A TIME</Text>
        <View style={ui.between}>
          <View style={ui.grow}><Text style={styles.total}>{completed.length}<Text style={styles.ofTotal}> / {allSets.length}</Text></Text>
            <Text style={ui.caption}>sets completed</Text></View>
          <View style={ui.grow}><Text style={styles.total}>{volume.toLocaleString()}</Text><Text style={ui.caption}>kg total volume</Text></View>
        </View>
        <View role="progressbar" accessibilityLabel="Completed workout sets" aria-valuemin={0} aria-valuemax={allSets.length} aria-valuenow={completed.length} style={styles.track}>
          <View style={[styles.progress, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={ui.caption}>Enter what you did, then tap the check. Use 0 kg for bodyweight. Weight is the total load used for that exercise.</Text>
      </Card>

      {draft.exercises.map((exercise, exerciseIndex) => <Card key={exercise.exerciseId}>
        <Text style={ui.badge}>EXERCISE {String(exerciseIndex + 1).padStart(2, '0')}</Text>
        <Text style={ui.heading}>{exerciseById[exercise.exerciseId].name}</Text>
        <Text style={ui.caption}>{exerciseById[exercise.exerciseId].equipment}</Text>
        <View style={styles.setRow}>
          <Text style={[ui.caption, styles.setNumber]}>Set</Text>
          <Text style={[ui.caption, styles.inputColumn]}>kg</Text>
          <Text style={[ui.caption, styles.inputColumn]}>Reps</Text>
          <Text style={[ui.caption, styles.doneColumn]}>Done</Text>
        </View>
        {exercise.sets.map((set, setIndex) => <View key={set.id} style={[styles.setRow, set.completed && styles.completedRow]}>
          <Text style={[ui.label, styles.setNumber]}>{setIndex + 1}</Text>
          <TextInput accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1}, weight in kilograms`}
            keyboardType="decimal-pad" value={set.weight} editable={!set.completed} maxLength={7} selectTextOnFocus
            onChangeText={weight => updateSet(exercise.exerciseId, set.id, { weight })}
            style={[styles.setInput, set.completed && styles.lockedInput]} />
          <TextInput accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1}, reps`}
            keyboardType="number-pad" value={set.reps} editable={!set.completed} maxLength={3} selectTextOnFocus
            onChangeText={reps => updateSet(exercise.exerciseId, set.id, { reps })}
            style={[styles.setInput, set.completed && styles.lockedInput]} />
          <Pressable accessibilityRole="checkbox" aria-checked={set.completed}
            accessibilityLabel={`${exerciseById[exercise.exerciseId].name}, set ${setIndex + 1} complete`}
            onPress={() => {
              if (!set.completed && !validSet(set)) { setInvalidSetId(set.id); setError(`Check set ${setIndex + 1}: use 1–999 reps and 0–2,000 kg (up to 2 decimals).`); return; }
              setError('');
              updateSet(exercise.exerciseId, set.id, { completed: !set.completed });
            }} style={[styles.done, set.completed && styles.doneSelected]}>
            <Text style={[styles.check, set.completed && styles.selectedCheck]}>✓</Text>
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
        <Text style={ui.caption}>Tap a completed check again to edit that set.</Text>
      </Card>)}

      <Card>
        {!!error && !invalidSetId && <Message error>{error}</Message>}
        {confirmFinish && <Message>{allSets.length - completed.length} sets are unfinished. Save only your {completed.length} completed sets?</Message>}
        <ActionButton label={confirmFinish ? 'Save completed sets' : 'Finish workout'} onPress={save} />
        {confirmFinish && <ActionButton secondary label="Keep training" onPress={() => setConfirmFinish(false)} />}
        <Text style={ui.caption}>Completed sets are added to your recent activity. You can leave this screen and resume this session from Workouts.</Text>
        {confirmDiscard ? <>
          <Message error>Discard this workout? All sets in this session will be lost.</Message>
          <ActionButton secondary label="Keep this workout" onPress={() => setConfirmDiscard(false)} />
          <ActionButton secondary label="Discard session" onPress={() => { setDraft(null); router.dismissTo('/workouts'); }} />
        </> : <ActionButton secondary label="Cancel workout" onPress={() => setConfirmDiscard(true)} />}
      </Card>
    </WorkoutScreen>
  );
}

const styles = StyleSheet.create({
  total: { color: colors.text, fontSize: 30, fontWeight: '800' },
  ofTotal: { color: colors.muted, fontSize: 18, fontWeight: '500' },
  track: { height: 8, backgroundColor: colors.border, borderRadius: 5, overflow: 'hidden' },
  progress: { height: '100%', backgroundColor: colors.accent, borderRadius: 5 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  setNumber: { width: 25, textAlign: 'center' },
  inputColumn: { flex: 1, textAlign: 'center' },
  doneColumn: { width: 44, textAlign: 'center' },
  setInput: { flex: 1, minWidth: 0, minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.inset, color: colors.text, textAlign: 'center', fontSize: 16, paddingHorizontal: 4, paddingVertical: 10 },
  lockedInput: { color: colors.success, borderColor: '#315349' },
  completedRow: { opacity: 0.9 },
  done: { width: 44, minHeight: 48, borderRadius: 12, backgroundColor: colors.inset, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  doneSelected: { backgroundColor: colors.success, borderColor: colors.success },
  check: { color: colors.muted, fontSize: 20, fontWeight: '800' },
  selectedCheck: { color: colors.accentText },
});
