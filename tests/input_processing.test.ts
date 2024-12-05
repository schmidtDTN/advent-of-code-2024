import { extractRowListsAsChars, extractRowListsAsNumbers, extractTwoColumnListsAsChars, extractTwoColumnListsAsNumbers } from '../src/input_processing';

const testCharRows = [
    ['3', '4'],
    ['4', '3'],
    ['2', '5'],
    ['1', '3'],
    ['3', '9'],
    ['3', '3'],
    ['10', '25'],
    ['1', '90']
];
const testNumberRows = [
    [3, 4],
    [4, 3],
    [2, 5],
    [1, 3],
    [3, 9],
    [3, 3],
    [10, 25],
    [1, 90]
];
const testCharCols = [
    ['3', '4', '2', '1', '3', '3', '10', '1'],
    ['4', '3', '5', '3', '9', '3', '25', '90']
]
const testNumberCols = [
    [3, 4, 2, 1, 3, 3, 10, 1],
    [4, 3, 5, 3, 9, 3, 25, 90]
]

const inputTestFilePath = '../inputs/input_test.txt'

describe('Row lists', () => {
    test('read in day 1 example file as lists of rows of characters', () => {
        const charRows = extractRowListsAsChars(inputTestFilePath);
        expect(charRows).toEqual(testCharRows)
    });
    test('read in day 1 example file as lists of rows of numbers', () => {
        const numRows = extractRowListsAsNumbers(inputTestFilePath);
        expect(numRows).toEqual(testNumberRows)
    });
});
describe('Columnar lists', () => {
    test('read in day 1 example file as two columnar lists of characters', () => {
        const charCols = extractTwoColumnListsAsChars(inputTestFilePath)
        expect(charCols).toEqual(testCharCols)
    });
    test('read in day 1 example file as two columnar lists of numbers', () => {
        const numberCols = extractTwoColumnListsAsNumbers(inputTestFilePath)
        expect(numberCols).toEqual(testNumberCols)
    });
});