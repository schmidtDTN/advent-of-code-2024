import { extractRowsAsSingleString, extractRowsAsStrings } from "./input_processing";

export function dayThreePartOne(filename: string) {
    const rows = extractRowsAsStrings(filename)
    let total = 0;
    
    rows.forEach((rowData) => {
        const rowTotal = getRowTotal(rowData);
        total += rowTotal;
    });

    return total;
}

// For part 2, do a similar thing, but get the INDEXES of where the muls start
// Then the indexes of the dos and don'ts
// and filter accordingly
export function dayThreePartTwo(filename: string) {
    // It's easier if this data is on a single string with no newlines
    const rowData = extractRowsAsSingleString(filename)
    let total = 0;
    const exclusionRe = new RegExp(/don't\(\).*?(do\(\)|$)/gs)
    // Remove any excluded instructions - blocks between "don't" and "do"
    const cleanedData = rowData.replace(exclusionRe, '');

    return getRowTotal(cleanedData);
}

function getRowTotal(rowData: string): number {
    let rowTotal = 0;
    const re = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g)

    const matches = rowData.match(re)

    matches?.forEach((match) => {
        // Since we can always count on the match being the exact same shape, we can cheat a little bit here
        // and just do some string splitting
        const firstNumberString = match.split(',')[0].split('mul(')[1]
        const secondNumberString = match.split(',')[1].split(')')[0]
        const multiplied = Number.parseInt(firstNumberString) * Number.parseInt(secondNumberString);
        rowTotal += multiplied;
    })

    return rowTotal;
}