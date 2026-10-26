import { Stack } from 'expo-router';
import { WorkoutProvider } from '@/Features/Workouts/Presentation/models/WorkoutProvider';

export default function WorkoutLayout() {
  return (
    <WorkoutProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WorkoutProvider>
  );
}
