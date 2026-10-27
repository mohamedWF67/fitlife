import { Stack } from "expo-router";
import NutritionProvider from "@/Features/Nutration/Presentation/models/NutritionProvider";

export default function NutritionLayout() {
    return (
        <NutritionProvider>
            <Stack
                screenOptions={{
                    contentStyle: {
                        backgroundColor: "#18152b",
                    },
                    headerShown: false
                }}>
            </Stack>
        </NutritionProvider>
    );
}