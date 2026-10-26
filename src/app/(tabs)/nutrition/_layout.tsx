import { Stack } from "expo-router";

export default function NutritionLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#151B2C",
                },
                headerTintColor: "#FFFFFF",
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: "#151B2C",
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
                name="add-entry"
                options={{
                    title: "Add Entry",
                    headerShown: true
                }}
            />
        </Stack>
    );
}