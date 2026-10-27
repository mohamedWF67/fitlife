import {ReactNode} from "react";
import {NutritionContext, useNutritionState} from "@/Features/Nutration/Presentation/models/useNutrition";

type props = {
    children: ReactNode,
}

export default function NutritionProvider({children}:props){
    const nutrition = useNutritionState();
    return(
        <NutritionContext value={nutrition}>
            {children}
        </NutritionContext>
    );
}
