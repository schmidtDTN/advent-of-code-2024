import { extractUnspacedRowListsAsChars } from "./input_processing";

export function dayFourPartOne(filename: string) {
    const rows = extractUnspacedRowListsAsChars(filename);
    let xmasCount = 0;
    rows.forEach((row, rowNumber) => {
        row.forEach((char, colNumber) => {
            // If we've found an X, search for XMASes
            if (char == 'X') {
                xmasCount += scanForXmas(rows, rowNumber, colNumber)
            }
        })
    });
    return xmasCount;
}

function scanForXmas(rows: string[][], rowNumber: number, colNumber: number) {
    const words = []
    // Scan right
    try {
        const eastWord = rows[rowNumber][colNumber] + rows[rowNumber][colNumber + 1] + rows[rowNumber][colNumber + 2] + rows[rowNumber][colNumber + 3]
        words.push(eastWord);
    } catch { }
    // Scan down-right
    try {
        const southEastWord = rows[rowNumber][colNumber] + rows[rowNumber + 1][colNumber + 1] + rows[rowNumber + 2][colNumber + 2] + rows[rowNumber + 3][colNumber + 3];
        words.push(southEastWord);
    } catch { }
    // Scan down
    try {
        const southWord = rows[rowNumber][colNumber] + rows[rowNumber + 1][colNumber] + rows[rowNumber + 2][colNumber] + rows[rowNumber + 3][colNumber];
        words.push(southWord);
    } catch { }
    // Scan down-left
    try {
        const southWestWord = rows[rowNumber][colNumber] + rows[rowNumber + 1][colNumber - 1] + rows[rowNumber + 2][colNumber - 2] + rows[rowNumber + 3][colNumber - 3];
        words.push(southWestWord);
    } catch { }
    // Scan left
    try {
        const westWord = rows[rowNumber][colNumber] + rows[rowNumber][colNumber - 1] + rows[rowNumber][colNumber - 2] + rows[rowNumber][colNumber - 3];
        words.push(westWord);
    } catch { }
    // Scan up-left
    try {
        const northWestWord = rows[rowNumber][colNumber] + rows[rowNumber - 1][colNumber - 1] + rows[rowNumber - 2][colNumber - 2] + rows[rowNumber - 3][colNumber - 3];
        words.push(northWestWord);
    } catch { }
    // Scan up
    try {
        const northWord = rows[rowNumber][colNumber] + rows[rowNumber - 1][colNumber] + rows[rowNumber - 2][colNumber] + rows[rowNumber - 3][colNumber];
        words.push(northWord);
    } catch { }
    // Scan up-right
    try {
        const northEastWord = rows[rowNumber][colNumber] + rows[rowNumber - 1][colNumber + 1] + rows[rowNumber - 2][colNumber + 2] + rows[rowNumber - 3][colNumber + 3];
        words.push(northEastWord);
    } catch { }
    let xmasCount = 0
    words.forEach((word) => {
        if (word === 'XMAS') {
            xmasCount += 1
        }
    })

    return xmasCount;
}


export function dayFourPartTwo(filename: string) {
    const rows = extractUnspacedRowListsAsChars(filename);
    let masXCount = 0;
    rows.forEach((row, rowNumber) => {
        row.forEach((char, colNumber) => {
            // If we've found an A, search for X-MASes
            if (char == 'A') {
                const xFound = scanForMASXes(rows, rowNumber, colNumber)
                if (xFound) {
                    masXCount += 1;
                }
            }
        })
    });
    return masXCount;
}

function scanForMASXes(rows: string[][], rowNumber: number, colNumber: number): boolean {
    let masCount = 0;
    // Going down-right
    try {
        const southEastWord = rows[rowNumber - 1][colNumber - 1] + rows[rowNumber][colNumber] + rows[rowNumber + 1][colNumber + 1]
        if (southEastWord === "MAS") {
            masCount += 1;
        }
    } catch { }
    // Going down-left
    try {
        const southWestWord = rows[rowNumber - 1][colNumber + 1] + rows[rowNumber][colNumber] + rows[rowNumber + 1][colNumber - 1]
        if (southWestWord === "MAS") {
            masCount += 1;
        }
    } catch { }
    // Scan up-left
    try {
        const northWestWord = rows[rowNumber + 1][colNumber + 1] + rows[rowNumber][colNumber] + rows[rowNumber - 1][colNumber - 1]
        if (northWestWord === "MAS") {
            masCount += 1;
        }
    } catch { }
    // Scan up-right
    try {
        const northEastWord = rows[rowNumber + 1][colNumber - 1] + rows[rowNumber][colNumber] + rows[rowNumber - 1][colNumber + 1]
        if (northEastWord === "MAS") {
            masCount += 1;
        }
    } catch { }

    const xFound = masCount >= 2;

    return xFound;
}