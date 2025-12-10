
export const generateHours = () => {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
        hours.push(i);
    }
    return hours;
};

export const generateDays = () => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
        days.push(i);
    }
    return days;
};
