import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import "../../global.css";
import { AuthProvider, useAuth } from '@/Features/Auth/AuthProvider';
import { WorkoutProvider } from '@/Features/Workouts/Presentation/models/WorkoutProvider';
import NutritionProvider from '@/Features/Nutration/Presentation/models/NutritionProvider';
import HydrationProvider from '@/Features/WaterTracker/Presentation/models/HydrationProvider';
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
    const { session, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) SplashScreen.hideAsync().catch(() => {});
    }, [isLoading]);

    if (isLoading) return null;

    return (
        // Keyed by user id so feature state resets when a different user signs in
        <WorkoutProvider>
            <NutritionProvider>
                <HydrationProvider>
                    <StatusBar style="dark" />
                    <Stack screenOptions={{ headerShown: false,
                        contentStyle: {
                            backgroundColor: "#18152b",
                        },
                    }}>
                        <Stack.Protected guard={!!session}>
                            <Stack.Screen name="(tabs)" />
                        </Stack.Protected>
                        <Stack.Protected guard={!session}>
                            <Stack.Screen name="(auth)" />
                        </Stack.Protected>
                    </Stack>
                </HydrationProvider>
            </NutritionProvider>
        </WorkoutProvider>
    );
}

// Auth wraps everything, so every feature provider (and every tab) can call useAuth().
export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}