import {HydrationLog} from "../../domain/entities/HydrationLog";

export const Hydration: HydrationLog = {
    goal: 2000,
    days: [
        {
            date: "2026-10-20",
            goalMl: 2000,
            entries: [
                {id: "1", amountMl: 200, time: "08:06"},
                {id: "2", amountMl: 250, time: "09:32"},
                {id: "3", amountMl: 600, time: "11:13"},
                {id: "4", amountMl: 100, time: "13:54"},
                {id: "5", amountMl: 300, time: "15:28"},
            ]
        },
        {
            date: "2026-10-21",
            goalMl: 2200,
            entries: [
                {id: "1", amountMl: 300, time: "07:42"},
                {id: "2", amountMl: 200, time: "10:18"},
                {id: "3", amountMl: 450, time: "12:56"},
                {id: "4", amountMl: 250, time: "16:23"},
                {id: "5", amountMl: 350, time: "20:47"},
            ]
        },
        {
            date: "2026-10-22",
            goalMl: 2100,
            entries: [
                {id: "1", amountMl: 200, time: "06:35"},
                {id: "2", amountMl: 350, time: "09:54"},
                {id: "3", amountMl: 250, time: "13:17"},
                {id: "4", amountMl: 500, time: "17:42"},
                {id: "5", amountMl: 300, time: "22:11"},
            ]
        },
        {
            date: "2026-10-23",
            goalMl: 2100,
            entries: [
                {id: "1", amountMl: 200, time: "06:35"},
                {id: "2", amountMl: 350, time: "09:54"},
                {id: "3", amountMl: 250, time: "13:17"},
                {id: "4", amountMl: 500, time: "17:42"},
                {id: "5", amountMl: 300, time: "22:11"},
            ]
        },
    ]
}