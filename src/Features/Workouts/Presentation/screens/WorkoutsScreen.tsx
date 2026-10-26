import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Chip, DumbbellMark, WorkoutScreen, colors, ui } from '../components/WorkoutUI';
import { dateKey, sessionStats, weekDates } from '../../domain/workoutUtils';
import { exerciseById } from '../../data/mock/Workouts';
import type { WorkoutSession } from '../../domain/entities/Workout';

export default function WorkoutsScreen() {
  const { plans, sessions, schedule, draft, startWorkout } = useWorkouts();
  const week = weekDates();
  const weekKeys = new Set(week.map(dateKey));
  const weeklySessions = sessions.filter(session => weekKeys.has(dateKey(new Date(session.completedAt))));
  const totalSets = weeklySessions.reduce((sum, session) => sum + sessionStats(session).sets, 0);
  const totalVolume = weeklySessions.reduce((sum, session) => sum + sessionStats(session).volume, 0);
  const featured = plans[0];

  return (
    <WorkoutScreen title="Workouts" subtitle="Your plan. Your pace. A little stronger every day.">
      <Card>
        <View style={ui.between}>
          <Text style={ui.badge}>{draft ? 'SESSION IN PROGRESS' : 'READY WHEN YOU ARE'}</Text>
          <DumbbellMark />
        </View>
        <Text style={styles.heroTitle}>{draft?.planName ?? featured?.name ?? 'Build your next routine'}</Text>
        <Text style={ui.subtitle}>{draft
          ? 'Pick up where you left off. Your sets are waiting.'
          : 'Turn a little time for yourself into a habit that lasts.'}</Text>
        {featured && !draft && <Text style={ui.caption}>{featured.exercises.length} exercises · {featured.level} · {featured.daysPerWeek} days / week</Text>}
        <ActionButton label={draft ? 'Resume workout  →' : 'Start workout  →'} disabled={!draft && !featured}
          onPress={() => {
            if (!draft && featured) startWorkout(featured);
            router.push('/workouts/log');
          }} />
      </Card>

      <View style={styles.stats}>
        {[
          { value: weeklySessions.length.toString(), label: 'Workouts' },
          { value: totalSets.toString(), label: 'Sets done' },
          { value: totalVolume.toLocaleString(), label: 'Volume (kg)' },
        ].map(stat => <View key={stat.label} style={styles.stat}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={ui.caption}>{stat.label}</Text>
        </View>)}
      </View>

      <Card>
        <View style={ui.between}>
          <View style={ui.grow}>
            <Text style={ui.heading}>This week</Text>
            <Text style={ui.caption}>Your training and recovery rhythm</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/workouts/schedule')} style={styles.textButton}>
            <Text style={ui.link}>Plan  ›</Text>
          </Pressable>
        </View>
        <View style={styles.week}>
          {week.map(date => {
            const key = dateKey(date);
            const day = schedule.find(item => item.date === key);
            const isToday = key === dateKey(new Date());
            return <Pressable key={key} accessibilityRole="button"
              accessibilityLabel={`${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}, ${day?.type ?? 'Unscheduled'}`}
              onPress={() => router.push({ pathname: '/workouts/schedule', params: { date: key } })}
              style={[styles.day, isToday && styles.today]}>
              <Text style={[styles.weekday, isToday && styles.todayText]}>{date.toLocaleDateString('en', { weekday: 'short' }).slice(0, 1)}</Text>
              <Text style={[styles.dayNumber, isToday && styles.todayText]}>{date.getDate()}</Text>
              <View style={[styles.dot, day?.type === 'Workout' && styles.workoutDot, day?.type === 'Rest day' && styles.restDot]} />
            </Pressable>;
          })}
        </View>
        <Text style={ui.caption}>Blue: workout · Green: rest · Tap a day to plan</Text>
      </Card>

      <View style={ui.section}>
        <Text accessibilityRole="header" style={ui.heading}>Your workout plans</Text>
        <ActionButton label="+  Create a plan" onPress={() => router.push('/workouts/plan')} />
        {plans.map(plan => <Card key={plan.id}>
          <View style={ui.between}>
            <View style={ui.grow}>
              <Text style={ui.heading}>{plan.name}</Text>
              <Text style={ui.caption}>{plan.exercises.length} exercises · {plan.exercises.reduce((sum, exercise) => sum + exercise.sets, 0)} sets</Text>
            </View>
            <DumbbellMark />
          </View>
          <View style={ui.wrap}>
            <Text style={styles.tag}>{plan.goal}</Text>
            <Text style={styles.tag}>{plan.daysPerWeek} days / week</Text>
          </View>
          <View style={ui.wrap}>
            <Chip label="Edit plan" selected={false}
              onPress={() => router.push({ pathname: '/workouts/plan', params: { id: plan.id } })} />
            <Chip label={draft ? 'Resume session  →' : 'Log this plan  →'} selected
              onPress={() => { startWorkout(plan); router.push('/workouts/log'); }} />
          </View>
        </Card>)}
      </View>

      <Card>
        <Text accessibilityRole="header" style={ui.heading}>Recent activity</Text>
        {sessions.length === 0 ? <>
          <Text style={ui.subtitle}>Your first session starts here.</Text>
          <Text style={ui.caption}>Finish a workout to see your completed sets and training volume here. The two plans above are starter examples.</Text>
        </> : sessions.slice(0, 5).map(session => {
          const stats = sessionStats(session);
          return <View key={session.id} style={ui.inset}>
            <Text style={ui.label}>{session.planName}</Text>
            <Text style={ui.caption}>{new Date(session.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {stats.sets} sets · {stats.volume.toLocaleString()} kg volume</Text>
            {session.exercises.map(exercise => <SessionExercise key={exercise.exerciseId} exercise={exercise} />)}
          </View>;
        })}
      </Card>
    </WorkoutScreen>
  );
}

function SessionExercise({ exercise }: { exercise: WorkoutSession['exercises'][number] }) {
  return <Text style={ui.caption}>{exerciseById[exercise.exerciseId].name}: {exercise.sets.map(set => `${set.reps} × ${set.weight} kg`).join(' · ')}</Text>;
}

const styles = StyleSheet.create({
  heroTitle: { color: colors.text, fontSize: 28, lineHeight: 35, fontWeight: '800', letterSpacing: -0.5 },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, backgroundColor: colors.card, padding: 12, borderRadius: 18, gap: 5 },
  statValue: { color: colors.text, fontSize: 25, fontWeight: '800' },
  textButton: { minHeight: 44, justifyContent: 'center' },
  week: { flexDirection: 'row', gap: 4 },
  day: { flex: 1, minHeight: 80, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.inset },
  today: { backgroundColor: colors.accent },
  weekday: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  dayNumber: { color: colors.text, fontSize: 17, fontWeight: '800' },
  todayText: { color: colors.accentText },
  dot: { height: 5, width: 5, borderRadius: 3, backgroundColor: colors.border },
  workoutDot: { backgroundColor: '#93c5fd', borderWidth: 1, borderColor: '#144577' },
  restDot: { backgroundColor: colors.success, borderWidth: 1, borderColor: '#166534' },
  tag: { color: colors.muted, fontSize: 12, backgroundColor: colors.inset, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
});
