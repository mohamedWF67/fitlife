import {useMemo, useState} from "react";
import {NutritionEntry} from "@/Features/Nutration/domain/entities/NutritionLog";
import {Nutrition} from "@/Features/Nutration/data/mock/Nutrition";

type Macros = {calories: number, proteins: number, carbs: number, fats: number};

const defaultGoals: Macros = {calories: 2000, proteins: 120, carbs: 250, fats: 70};

const getTodayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const useNutrition = () => {

    const allEntries = Nutrition;

    const today = Nutrition.days.find(d => d.date === getTodayKey());

    const [entries, setEntries] = useState<NutritionEntry[]>(today?.entries ?? []);
    const goals: Macros = today
        ? {calories: today.goalCalories, proteins: today.goalProteins, carbs: today.goalCarbs, fats: today.goalFats}
        : defaultGoals;
    const meals = entries.length;

    const totals = useMemo(
        () => entries.reduce(
            (sum, entry) => ({
                calories: sum.calories + entry.calories,
                proteins: sum.proteins + entry.proteins,
                carbs: sum.carbs + entry.carbs,
                fats: sum.fats + entry.fats,
            }),
            {calories: 0, proteins: 0, carbs: 0, fats: 0}
        ),
        [entries]
    )

    const progress: Macros = {
        calories: Math.min(totals.calories / goals.calories, 1),
        proteins: Math.min(totals.proteins / goals.proteins, 1),
        carbs: Math.min(totals.carbs / goals.carbs, 1),
        fats: Math.min(totals.fats / goals.fats, 1),
    };

    const addMeal = (meal: Macros) => {
        if (meal.calories <= 0) return;
        const now = new Date();
        const time = now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');
        console.log(Date.now() + " Adding " + meal.calories + " kcal");
        setEntries(prev => [...prev, {id: Date.now().toString(), time, ...meal}]);
    }

    const removeMeal = (id: string) => {
        console.log(Date.now() + " Removing " + id);
        setEntries(prev => prev.filter(entry => entry.id !== id));
    }

    const removeLastMeal = () => {
        console.log(Date.now() + " Removing ");

        if (entries.length >= 1)
            removeMeal(entries[entries.length - 1].id);
        else{
            alert("No meal to remove");
        }
    }

    const resetNutrition = () => {
        setEntries([]);
        console.log(Date.now() + " Resetting nutrition");
    }
    return {allEntries,meals,entries,goals,totals, progress, addMeal, removeMeal,removeLastMeal, resetNutrition};
}
