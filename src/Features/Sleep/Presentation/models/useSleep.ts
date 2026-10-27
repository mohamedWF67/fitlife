import {Sleep} from "@/Features/Sleep/data/mock/Sleep";

const hoursOf = (date: Date) => date.getHours() + date.getMinutes() / 60;

const formatHour = (hour: number) => {
    const hours24 = (hour + 24) % 24;
    return `${hours24 % 12 || 12} ${hours24 < 12 ? "AM" : "PM"}`;
};

const dayMonth = (date: Date) => date.toLocaleDateString("en-GB", {day: "numeric", month: "short"});

export const useSleep = () => {
    const nights = Sleep.map(entry => {
        const start = new Date(entry.start);
        const end = new Date(entry.end);
        // hours from midnight of the wake day, so a bedtime the evening before is negative
        const bedtime = hoursOf(start) - (start.getDate() === end.getDate() ? 0 : 24);
        return {id: entry.id, date: end, bedtime, wake: hoursOf(end)};
    });

    const axisStart = Math.floor(Math.min(...nights.map(night => night.bedtime)));
    let axisEnd = Math.ceil(Math.max(...nights.map(night => night.wake)));
    if ((axisEnd - axisStart) % 2 !== 0) axisEnd++;
    const span = axisEnd - axisStart;

    const timeLabels: string[] = [];
    for (let hour = axisStart; hour <= axisEnd; hour += 2) timeLabels.push(formatHour(hour));

    const bars = nights.map(night => ({
        id: night.id,
        day: night.date.toLocaleDateString("en", {weekday: "short"}),
        top: (night.bedtime - axisStart) / span * 100,
        height: (night.wake - night.bedtime) / span * 100,
    }));

    const avg = Math.round(nights.reduce((sum, night) => sum + (night.wake - night.bedtime) * 60, 0) / nights.length);
    const avgHours = Math.floor(avg / 60);
    const avgMinutes = avg % 60;

    const first = nights[0].date;
    const last = nights[nights.length - 1].date;
    const dateRange = first.getMonth() === last.getMonth()
        ? `${first.getDate()}–${dayMonth(last)} ${last.getFullYear()}`
        : `${dayMonth(first)} – ${dayMonth(last)} ${last.getFullYear()}`;

    return {bars, timeLabels, avgHours, avgMinutes, dateRange};
};
