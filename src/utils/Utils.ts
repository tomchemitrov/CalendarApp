export type CalendarDay =
    | {
        id: string;
        day: "";
        isEmpty: true;
    }
    | {
        id: string;
        day: string;
        isEmpty: false;
        date: Date;
    };

export function getCalendarDays(date: Date): CalendarDay[] {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const emptyDays = Array.from({ length: startOffset }, (_, index) => ({
        id: `empty-${index}`,
        day: "" as const,
        isEmpty: true as const,
    }));

    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
        const date = new Date(year, month, index + 1);
        return {
            id: date.toISOString(),
            day: String(index + 1),
            isEmpty: false as const,
            date,
        };
    });

    const totalCellsBeforeEndPadding = emptyDays.length + monthDays.length;
    const endOffset = (7 - (totalCellsBeforeEndPadding % 7)) % 7;
    
    const trailingEmptyDays = Array.from({ length: endOffset }, (_, index) => ({
        id: `trailing-empty-${index}`,
        day: "" as const,
        isEmpty: true as const,
    }));

    return [...emptyDays, ...monthDays, ...trailingEmptyDays];
}

export function isSameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}