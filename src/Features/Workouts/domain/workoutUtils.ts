import type { WorkoutSession, WorkoutSet } from './entities/Workout';

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12);
  return dateKey(date) === value ? date : undefined;
}

export function weekDates(today = new Date()): Date[] {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function validSet(set: WorkoutSet): boolean {
  return /^\d+$/.test(set.reps.trim()) && Number(set.reps) > 0 && Number(set.reps) <= 999
    && /^\d+(\.\d{1,2})?$/.test(set.weight.trim()) && Number(set.weight) >= 0 && Number(set.weight) <= 2000;
}

export function sessionStats(session: WorkoutSession) {
  const sets = session.exercises.flatMap(exercise => exercise.sets);
  return { sets: sets.length, volume: sets.reduce((total, set) => total + set.reps * set.weight, 0) };
}
