import { Stack } from "expo-router";

export default function NutritionLayout() {
    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: "#18152b",
                },
            }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "Nutrition",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MealLog"
                options={{
                    title: "Meal Log",
                    headerTintColor: "#ffffff"
                }}
            />
            <Stack.Screen
                name="MealEntry"
                options={{
                    title: "Add Meal",
                    headerTintColor: "#ffffff"
                }}
            />
        </Stack>
    );
}