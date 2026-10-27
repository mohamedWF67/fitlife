import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { dateKey, parseDate, weekDates } from '../../domain/workoutUtils';
import { useWorkouts } from '../models/WorkoutProvider';
import { ActionButton, Card, Chip, Field, Message, WorkoutScreen, ui } from '../components/WorkoutUI';
import type { ScheduledDay } from '../../domain/entities/Workout';

export default function WorkoutScheduleScreen() {
  const params = useLocalSearchParams<{ date?: string }>();
  const { plans, schedule, saveScheduledDay, removeScheduledDay } = useWorkouts();
  const initialDate = typeof params.date === 'string' && parseDate(params.date) ? params.date : dateKey(new Date());
  const initialEntry = schedule.find(day => day.date === initialDate);
  const [date, setDate] = useState(initialDate);
  const [type, setType] = useState<ScheduledDay['type']>(initialEntry?.type ?? 'Workout');
  const [planId, setPlanId] = useState(initialEntry?.planId ?? plans[0]?.id ?? '');
  const [time, setTime] = useState(initialEntry?.time ?? '18:00');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const parsed = parseDate(date);
  const week = weekDates(parsed ?? new Date());

  const chooseDate = (value: string) => {
    setDate(value); setMessage(''); setError('');
    const existing = schedule.find(day => day.date === value);
    setType(existing?.type ?? 'Workout');
    setPlanId(existing?.planId ?? plans[0]?.id ?? '');
    setTime(existing?.time ?? '18:00');
  };

  const save = () => {
    setMessage('');
    if (!parsed) { setError('Enter a real date in YYYY-MM-DD format.'); return; }
    if (date < dateKey(new Date())) { setError('Choose today or a future date for your schedule.'); return; }
    if (type === 'Workout' && !plans.some(plan => plan.id === planId)) { setError('Select a workout plan first.'); return; }
    if (type === 'Workout' && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) { setError('Enter a time in 24-hour HH:MM format, e.g. 18:00.'); return; }
    saveScheduledDay({ date, type, ...(type === 'Workout' ? { planId, time } : {}) });
    setError(''); setMessage(`${type} saved for ${parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}.`);
  };

  return (
    <WorkoutScreen back title="Make room to move" subtitle="A balanced week has space for training and recovery.">
      <Card>
        <Text className={ui.badge}>YOUR TRAINING CALENDAR</Text>
        <Text className={ui.heading}>{(parsed ?? new Date()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Text>
        <View className={ui.wrap}>{week.map(day => <Chip key={dateKey(day)}
          label={`${day.toLocaleDateString('en', { weekday: 'short' })} ${day.getDate()}`} selected={date === dateKey(day)}
          onPress={() => chooseDate(dateKey(day))} />)}</View>
        <Field label="Date (YYYY-MM-DD)" value={date} onChangeText={chooseDate} maxLength={10} autoCapitalize="none" placeholder="2026-10-26" />
        <Text className={ui.caption}>Choose a day above or enter any future date. Saving replaces the entry for that day.</Text>
        <Text className={ui.label}>Type of day</Text>
        <View className={ui.wrap}>{(['Workout', 'Rest day'] as const).map(item => <Chip key={item} label={item} selected={type === item}
          onPress={() => { setType(item); setMessage(''); setError(''); }} />)}</View>
        {type === 'Workout' ? <>
          <Text className={ui.label}>Workout plan</Text>
          <View className={ui.wrap}>{plans.map(plan => <Chip key={plan.id} label={plan.name} selected={planId === plan.id}
            onPress={() => { setPlanId(plan.id); setMessage(''); }} />)}</View>
          <Field label="Start time (24-hour HH:MM)" value={time} onChangeText={value => { setTime(value); setMessage(''); }}
            maxLength={5} keyboardType="numbers-and-punctuation" placeholder="18:00" />
        </> : <View className={ui.inset}>
          <Text className={ui.label}>Recovery is part of the plan.</Text>
          <Text className={ui.caption}>Give yourself a day to rest and come back refreshed.</Text>
        </View>}
        {!!error && <Message error>{error}</Message>}
        {!!message && <Message>{message}</Message>}
        <ActionButton label={type === 'Workout' ? 'Save workout day' : 'Save rest day'} onPress={save} />
      </Card>

      <Card>
        <Text className={ui.heading}>Your schedule</Text>
        {schedule.length === 0 && <Text className={ui.caption}>Your week is a blank canvas. Add a workout or a rest day above.</Text>}
        {schedule.map(day => <View key={day.id} className={ui.inset}>
          <Text className={ui.badge}>{day.type.toUpperCase()} · {day.date}</Text>
          <Text className={ui.label}>{day.type === 'Rest day' ? 'Rest & recover' : plans.find(plan => plan.id === day.planId)?.name ?? 'Workout'}</Text>
          {!!day.time && <Text className={ui.caption}>{day.time}</Text>}
          <View className={ui.wrap}>
            <Chip label="Edit day" selected={false} onPress={() => chooseDate(day.date)} />
            <Chip label="Remove day" selected={false} onPress={() => { removeScheduledDay(day.id); setMessage('Day removed from your schedule.'); setError(''); }} />
          </View>
        </View>)}
      </Card>
    </WorkoutScreen>
  );
}
