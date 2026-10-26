import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { starterPlans } from '../../data/mock/Workouts';
import type { ScheduledDay, WorkoutDraft, WorkoutPlan, WorkoutSession } from '../../domain/entities/Workout';
import { validSet } from '../../domain/workoutUtils';

function useWorkoutState() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(starterPlans);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [schedule, setSchedule] = useState<ScheduledDay[]>([]);
  const [draft, setDraft] = useState<WorkoutDraft | null>(null);
  const sequence = useRef(0);
  const newId = () => `workout-${Date.now()}-${sequence.current++}`;

  const savePlan = (plan: Omit<WorkoutPlan, 'id'> & { id?: string }) => {
    const saved = { ...plan, id: plan.id ?? newId() };
    setPlans(current => current.some(item => item.id === saved.id)
      ? current.map(item => item.id === saved.id ? saved : item)
      : [saved, ...current]);
  };

  const startWorkout = (plan: WorkoutPlan) => {
    if (draft) return;
    setDraft({
      planId: plan.id, planName: plan.name,
      exercises: plan.exercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        sets: Array.from({ length: exercise.sets }, () => ({
          id: newId(), reps: String(exercise.reps), weight: '0', completed: false,
        })),
      })),
    });
  };

  const finishWorkout = (): boolean => {
    if (!draft) return false;
    const completed = draft.exercises.flatMap(exercise => exercise.sets.filter(set => set.completed));
    if (!completed.length || completed.some(set => !validSet(set))) return false;
    const session: WorkoutSession = {
      id: newId(), planName: draft.planName, completedAt: new Date().toISOString(),
      exercises: draft.exercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        sets: exercise.sets.filter(set => set.completed).map(set => ({ reps: Number(set.reps), weight: Number(set.weight) })),
      })).filter(exercise => exercise.sets.length > 0),
    };
    setSessions(current => [session, ...current]);
    setDraft(null);
    return true;
  };

  const saveScheduledDay = (day: Omit<ScheduledDay, 'id'>) => {
    setSchedule(current => [...current.filter(item => item.date !== day.date), { ...day, id: newId() }]
      .sort((a, b) => a.date.localeCompare(b.date)));
  };

  return {
    plans, sessions, schedule, draft, setDraft, savePlan, startWorkout, finishWorkout, saveScheduledDay,
    removeScheduledDay: (id: string) => setSchedule(current => current.filter(day => day.id !== id)),
    newId,
  };
}

const WorkoutContext = createContext<ReturnType<typeof useWorkoutState> | null>(null);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const value = useWorkoutState();
  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkouts() {
  const value = useContext(WorkoutContext);
  if (!value) throw new Error('Workout screens must be inside WorkoutProvider.');
  return value;
}
