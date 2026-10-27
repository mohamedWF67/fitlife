export type WorkoutGoal = 'Build muscle' | 'Get stronger' | 'Stay active';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  muscle: 'Upper body' | 'Lower body' | 'Core';
  equipment: string;
}

export interface PlanExercise {
  exerciseId: string;
  sets: number;
  reps: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: WorkoutGoal;
  level: ExperienceLevel;
  daysPerWeek: number;
  exercises: PlanExercise[];
}

export interface WorkoutSet {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

export interface WorkoutDraft {
  planId: string;
  planName: string;
  exercises: { exerciseId: string; sets: WorkoutSet[] }[];
}

export interface WorkoutSession {
  id: string;
  planName: string;
  completedAt: string;
  exercises: { exerciseId: string; sets: { reps: number; weight: number }[] }[];
}

export interface ScheduledDay {
  id: string;
  date: string;
  type: 'Workout' | 'Rest day';
  planId?: string;
  time?: string;
}
