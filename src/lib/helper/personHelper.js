export const isOfficial = input => input && /^[a-f]{1}$/.test(input);
export const isPlayer = input => input && !isNaN(input);
export const playerSort = (a, b) => a.number - b.number;
export const officialSort = (a, b) => {
    if (a.number > b.number) return 1;
    if (a.number < b.number) return -1;
    return 0;
}