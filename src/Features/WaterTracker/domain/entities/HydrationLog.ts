export interface HydrationEntry {
    id: string,
    amountMl: number,
    time: string,
}

export interface HydrationDay {
    date: string,
    goalMl: number,
    entries: HydrationEntry[],
}

export interface HydrationLog {
    goal: number,
    days: HydrationDay[],
}