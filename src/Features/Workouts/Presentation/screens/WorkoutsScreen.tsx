import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Chip, DumbbellMark, WorkoutScreen, ui } from '../components/WorkoutUI';
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
        <View className={ui.between}>
          <Text className={ui.badge}>{draft ? 'SESSION IN PROGRESS' : 'READY WHEN YOU ARE'}</Text>
          <DumbbellMark />
        </View>
        <Text className="text-3xl font-extrabold tracking-tight text-white">{draft?.planName ?? featured?.name ?? 'Build your next routine'}</Text>
        <Text className={ui.subtitle}>{draft
          ? 'Pick up where you left off. Your sets are waiting.'
          : 'Turn a little time for yourself into a habit that lasts.'}</Text>
        {featured && !draft && <Text className={ui.caption}>{featured.exercises.length} exercises · {featured.level} · {featured.daysPerWeek} days / week</Text>}
        <ActionButton label={draft ? 'Resume workout  →' : 'Start workout  →'} disabled={!draft && !featured}
          onPress={() => {
            if (!draft && featured) startWorkout(featured);
            router.push('/workouts/log');
          }} />
      </Card>

      <View className="flex-row gap-2">
        {[
          { value: weeklySessions.length.toString(), label: 'Workouts' },
          { value: totalSets.toString(), label: 'Sets done' },
          { value: totalVolume.toLocaleString(), label: 'Volume (kg)' },
        ].map(stat => <View key={stat.label} className="flex-1 gap-1 rounded-2xl bg-[#151b2c] p-3">
          <Text className="text-2xl font-extrabold text-white">{stat.value}</Text>
          <Text className={ui.caption}>{stat.label}</Text>
        </View>)}
      </View>

      <Card>
        <View className={ui.between}>
          <View className={ui.grow}>
            <Text className={ui.heading}>This week</Text>
            <Text className={ui.caption}>Your training and recovery rhythm</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/workouts/schedule')} className="min-h-11 justify-center">
            <Text className={ui.link}>Plan  ›</Text>
          </Pressable>
        </View>
        <View className="flex-row gap-1">
          {week.map(date => {
            const key = dateKey(date);
            const day = schedule.find(item => item.date === key);
            const isToday = key === dateKey(new Date());
            const dot = day?.type === 'Workout' ? 'border border-[#144577] bg-blue-300'
              : day?.type === 'Rest day' ? 'border border-green-800 bg-green-300' : 'bg-slate-700';
            return <Pressable key={key} accessibilityRole="button"
              accessibilityLabel={`${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}, ${day?.type ?? 'Unscheduled'}`}
              onPress={() => router.push({ pathname: '/workouts/schedule', params: { date: key } })}
              className={`min-h-20 flex-1 items-center justify-center gap-2 rounded-xl ${isToday ? 'bg-blue-400' : 'bg-slate-900'}`}>
              <Text className={`text-xs font-semibold ${isToday ? 'text-slate-900' : 'text-slate-300'}`}>{date.toLocaleDateString('en', { weekday: 'short' }).slice(0, 1)}</Text>
              <Text className={`text-lg font-extrabold ${isToday ? 'text-slate-900' : 'text-white'}`}>{date.getDate()}</Text>
              <View className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            </Pressable>;
          })}
        </View>
        <Text className={ui.caption}>Blue: workout · Green: rest · Tap a day to plan</Text>
      </Card>
        
        <Card>
            <View className={ui.grow}>
                <Text className={ui.heading}>Progress Gallary</Text>
                <Text className={ui.caption}>See where you have progressed</Text>
            </View>
            <ActionButton label={"View Progress"} onPress={() => router.push('/workouts/progressphotos')} />
        </Card>
        
      <View className={ui.section}>
        <Text accessibilityRole="header" className={ui.heading}>Your workout plans</Text>
        <ActionButton label="+  Create a plan" onPress={() => router.push('/workouts/plan')} />
        {plans.map(plan => <Card key={plan.id}>
          <View className={ui.between}>
            <View className={ui.grow}>
              <Text className={ui.heading}>{plan.name}</Text>
              <Text className={ui.caption}>{plan.exercises.length} exercises · {plan.exercises.reduce((sum, exercise) => sum + exercise.sets, 0)} sets</Text>
            </View>
            <DumbbellMark />
          </View>
          <View className={ui.wrap}>
            <Text className="rounded-lg bg-slate-900 px-2.5 py-2 text-xs text-slate-300">{plan.goal}</Text>
            <Text className="rounded-lg bg-slate-900 px-2.5 py-2 text-xs text-slate-300">{plan.daysPerWeek} days / week</Text>
          </View>
          <View className={ui.wrap}>
            <Chip label="Edit plan" selected={false}
              onPress={() => router.push({ pathname: '/workouts/plan', params: { id: plan.id } })} />
            <Chip label={draft ? 'Resume session  →' : 'Log this plan  →'} selected
              onPress={() => { startWorkout(plan); router.push('/workouts/log'); }} />
          </View>
        </Card>)}
      </View>

      <Card>
        <Text accessibilityRole="header" className={ui.heading}>Recent activity</Text>
        {sessions.length === 0 ? <>
          <Text className={ui.subtitle}>Your first session starts here.</Text>
          <Text className={ui.caption}>Finish a workout to see your completed sets and training volume here. The two plans above are starter examples.</Text>
        </> : sessions.slice(0, 5).map(session => {
          const stats = sessionStats(session);
          return <View key={session.id} className={ui.inset}>
            <Text className={ui.label}>{session.planName}</Text>
            <Text className={ui.caption}>{new Date(session.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {stats.sets} sets · {stats.volume.toLocaleString()} kg volume</Text>
            {session.exercises.map(exercise => <SessionExercise key={exercise.exerciseId} exercise={exercise} />)}
          </View>;
        })}
      </Card>
    </WorkoutScreen>
  );
}

function SessionExercise({ exercise }: { exercise: WorkoutSession['exercises'][number] }) {
  return <Text className={ui.caption}>{exerciseById[exercise.exerciseId].name}: {exercise.sets.map(set => `${set.reps} × ${set.weight} kg`).join(' · ')}</Text>;
}
