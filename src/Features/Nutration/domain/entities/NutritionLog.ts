export interface NutritionEntry {
    id: string,
    time: string,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
}

export interface NutritionDay {
    date: string,
    goalCalories: number,
    goalProteins: number,
    goalCarbs: number,
    goalFats: number,
    entries: NutritionEntry[],
}

export interface NutritionLog {
    days: NutritionDay[],
}