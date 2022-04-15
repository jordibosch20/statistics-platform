export function returnRandomNumbers(number: number): Array<number> {
    const randomArray: Array<number> = [];
    for (let i = 0; i < number; ++i) {
        randomArray.push(Math.floor(Math.random() * 100))
    }
    return randomArray;
}