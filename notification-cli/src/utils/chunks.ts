

export const toChunks = (arr: Array<string>, num: number, accumulator: Array<string[]> = []): Array<string[]> => {
    if (!arr.length) return accumulator
    else {
        accumulator.push(arr.splice(0, num));
        return toChunks(arr, num, accumulator);
    }
}
