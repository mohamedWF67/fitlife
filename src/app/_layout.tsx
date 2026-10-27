import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../../global.css";
import { WorkoutProvider } from '@/Features/Workouts/Presentation/models/WorkoutProvider';
import NutritionProvider from '@/Features/Nutration/Presentation/models/NutritionProvider';
import HydrationProvider from '@/Features/WaterTracker/Presentation/models/HydrationProvider';

// Feature state lives here, so every tab (including the Home dashboard) shares one copy.
export default function RootLayout() {
  return (
    <WorkoutProvider>
      <NutritionProvider>
        <HydrationProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </HydrationProvider>
      </NutritionProvider>
    </WorkoutProvider>
  );
}
