import {useMemo, useState} from "react";
import { HydrationEntry} from "@/Features/WaterTracker/domain/entities/HydrationLog";
import { Hydration } from "@/Features/WaterTracker/data/mock/Hydration";

const getTodayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const useHydration = () => {

    const allentries = Hydration;

    const today = Hydration.days.find(d => d.date === getTodayKey());

    const [entries, setEntries] = useState<HydrationEntry[]>(today?.entries ?? []);
    const goal = today?.goalMl ?? Hydration.goal;

    const total = useMemo(
        () => entries.reduce((sum, entry) => sum + entry.amountMl, 0),
        [entries]
    )

    const progress = Math.min(total / goal, 1);

    const addWater = (amountMl: number) => {
        const time = new Date().getHours() + ":" + new Date().getMinutes();
        console.log(Date.now() + " Adding " + amountMl);
        setEntries(prev => [...prev, {id: Date.now().toString(), time, amountMl}]);
    }

    const removeWater = (id: string) => {
        console.log(Date.now() + " Removing " + id);
        setEntries(prev => prev.filter(entry => entry.id !== id));
    }

    const removeLastWater = () => {
        console.log(Date.now() + " Removing ");

        if (entries.length >= 1)
            removeWater(entries[entries.length - 1].id);
        else{
            alert("No water to remove");
        }
    }

    return {allentries,entries,goal,total, progress, addWater, removeWater,removeLastWater};
}
