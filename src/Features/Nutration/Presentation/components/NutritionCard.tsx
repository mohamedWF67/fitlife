import {View} from "react-native";
import AnimatedProgressBar from "@/Features/Nutration/Presentation/components/AnimatedProgressBar";

type props = {
    totals: {calories: number, proteins: number, carbs: number, fats: number},
    goals: {calories: number, proteins: number, carbs: number, fats: number},
    progress: {calories: number, proteins: number, carbs: number, fats: number},
}

export default function NutritionCard({totals, goals, progress}:props) {
    return(
        <View className={"flex p-5 gap-2 rounded-3xl bg-[#26263b]"}>
            <AnimatedProgressBar
                Label={"Proteins"}
                value={progress.proteins}
                current={totals.proteins}
                target={goals.proteins}
                color={"#b56e26"}/>
            <AnimatedProgressBar
                Label={"Carbs"}
                value={progress.carbs}
                current={totals.carbs}
                target={goals.carbs}
                color={"#50b1a2"}/>
            <AnimatedProgressBar
                Label={"Fats"}
                value={progress.fats}
                current={totals.fats}
                target={goals.fats}
                color={"#9b3b4f"}/>
        </View>
    )
}
