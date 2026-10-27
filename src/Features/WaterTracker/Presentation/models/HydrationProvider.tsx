import {ReactNode} from "react";
import {HydrationContext, useHydrationState} from "@/Features/WaterTracker/Presentation/models/useHydration";

type props = {
    children: ReactNode,
}

export default function HydrationProvider({children}:props){
    const hydration = useHydrationState();
    return(
        <HydrationContext value={hydration}>
            {children}
        </HydrationContext>
    );
}
