import {NutritionLog} from "../../domain/entities/NutritionLog";

export const Nutrition: NutritionLog = {
    days: [
        {
            date: "2026-10-26",
            goalCalories: 2000,
            goalProteins: 120,
            goalCarbs: 250,
            goalFats: 70,
            entries: [
                {
                    id: "1",
                    time: "08:06",
                    proteins: 22,
                    fats: 14,
                    calories: 390,
                    carbs: 44
                },
                {
                    id: "2",
                    time: "12:32",
                    proteins: 38,
                    fats: 18,
                    calories: 610,
                    carbs: 74
                },
                {
                    id: "3",
                    time: "16:15",
                    proteins: 15,
                    fats: 8,
                    calories: 260,
                    carbs: 32
                },
                {
                    id: "4",
                    time: "20:45",
                    proteins: 40,
                    fats: 22,
                    calories: 650,
                    carbs: 73
                }
            ]
        }
    ]
}