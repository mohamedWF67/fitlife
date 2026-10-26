import type { Exercise, WorkoutPlan } from '../../domain/entities/Workout';

export const exercises: Exercise[] = [
  { id: 'squat', name: 'Goblet squat', muscle: 'Lower body', equipment: 'Dumbbell' },
  { id: 'press', name: 'Dumbbell bench press', muscle: 'Upper body', equipment: 'Dumbbells · Bench' },
  { id: 'row', name: 'Dumbbell row', muscle: 'Upper body', equipment: 'Dumbbell · Bench' },
  { id: 'lunge', name: 'Reverse lunge', muscle: 'Lower body', equipment: 'Bodyweight or dumbbells' },
  { id: 'shoulder', name: 'Shoulder press', muscle: 'Upper body', equipment: 'Dumbbells' },
  { id: 'deadlift', name: 'Romanian deadlift', muscle: 'Lower body', equipment: 'Dumbbells' },
  { id: 'pushup', name: 'Push-up', muscle: 'Upper body', equipment: 'Bodyweight' },
  { id: 'deadbug', name: 'Dead bug', muscle: 'Core', equipment: 'Mat · Reps per side' },
];

export const starterPlans: WorkoutPlan[] = [
  {
    id: 'full-body', name: 'Full body foundations', goal: 'Stay active', level: 'Beginner', daysPerWeek: 3,
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: 12 },
      { exerciseId: 'press', sets: 3, reps: 10 },
      { exerciseId: 'row', sets: 3, reps: 10 },
      { exerciseId: 'deadbug', sets: 2, reps: 12 },
    ],
  },
  {
    id: 'upper-body', name: 'Upper body strength', goal: 'Get stronger', level: 'Intermediate', daysPerWeek: 3,
    exercises: [
      { exerciseId: 'press', sets: 3, reps: 10 },
      { exerciseId: 'row', sets: 3, reps: 10 },
      { exerciseId: 'shoulder', sets: 3, reps: 10 },
    ],
  },
];

export const exerciseById = Object.fromEntries(exercises.map(exercise => [exercise.id, exercise]));
