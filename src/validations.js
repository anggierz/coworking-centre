export function isPastDate(date, hour) {
    const now = new Date();
    const limit = new Date(`${date}T${String(hour).padStart(2, '0')}:00`);
    return limit < now;
}

export function sameSlot(a,b) {
    return a.roomId === b.roomId && a.date === b.date && a.hour === b.hour; 
}