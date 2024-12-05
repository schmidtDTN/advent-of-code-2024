import * as fs from 'fs';
import * as path from 'path';

// Helper function to read in a file given a relative path/filename
function readInFile(filename: string): string {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf8');;
}

export function extractRowListsAsChars(filename: string): string[][] {
    const inputFile = readInFile(filename);

    const rawLines = inputFile.split('\n');
    const charRows = rawLines.map((line) => {
        const row = line.split(' ').filter((token) => token.length !== 0);
        return row;
    })

    return charRows;
}

export function extractRowListsAsNumbers(filename: string): number[][] {
    const charRows = extractRowListsAsChars(filename);

    const numberRows = charRows.map((charRow) => {
        const numberRow = charRow.map((token) => +token)
        return numberRow;
    })
    return numberRows;
}

// Two column lists - not the most elegant solution, and will be iterated on if the need arises for
// more than two columns, but if we _always_ can count on two columns, then this will work
export function extractTwoColumnListsAsChars(filename: string): string[][] {
    const columns = [];
    const firstColumn: any[] = [];
    const secondColumn: any[] = [];
    const rows = extractRowListsAsChars(filename);

    rows.forEach((row) => {
        firstColumn.push(row[0])
        secondColumn.push(row[1])
    })

    columns.push(firstColumn)
    columns.push(secondColumn);

    return columns;
}


// Two column lists - not the most elegant solution, and will be iterated on if the need arises for
// more than two columns, but if we _always_ can count on two columns, then this will work
export function extractTwoColumnListsAsNumbers(filename: string): number[][] {
    const columns = [];
    const firstColumn: any[] = [];
    const secondColumn: any[] = [];
    const rows = extractRowListsAsNumbers(filename);

    rows.forEach((row) => {
        firstColumn.push(row[0])
        secondColumn.push(row[1])
    })

    columns.push(firstColumn)
    columns.push(secondColumn);

    return columns;
}