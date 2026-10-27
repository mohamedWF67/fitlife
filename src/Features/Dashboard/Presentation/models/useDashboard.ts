import {useNutrition} from "@/Features/Nutration/Presentation/models/useNutrition";
import {useHydration} from "@/Features/WaterTracker/Presentation/models/useHydration";
import {useSleep} from "@/Features/Sleep/Presentation/models/useSleep";
import {useWorkouts} from "@/Features/Workouts/Presentation/models/WorkoutProvider";
import {dateKey, sessionStats, weekDates} from "@/Features/Workouts/domain/workoutUtils";

export const useDashboard = () => {
    const nutrition = useNutrition();
    const hydration = useHydration();
    const sleep = useSleep();
    const {plans, sessions} = useWorkouts();

    // Same "this week" rule as the Workouts screen; the goal is the first plan's days per week.
    const weekKeys = new Set(weekDates().map(dateKey));
    const weeklySessions = sessions.filter(session => weekKeys.has(dateKey(new Date(session.completedAt))));
    const goal = plans[0]?.daysPerWeek ?? 3;
    const workouts = {
        done: weeklySessions.length,
        goal,
        sets: weeklySessions.reduce((sum, session) => sum + sessionStats(session).sets, 0),
        volume: weeklySessions.reduce((sum, session) => sum + sessionStats(session).volume, 0),
        progress: Math.min(weeklySessions.length / goal, 1),
    };

    const today = new Date().toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month: "long"});

    return {today, workouts, nutrition, hydration, sleep};
};
