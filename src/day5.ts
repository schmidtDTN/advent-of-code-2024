import { extractRowsAsStrings, extractUnspacedRowListsAsChars } from "./input_processing";

type InputProcessing = {
    ruleNodes: RuleNode[]
    updateRows: number[][]
}

type RuleNode = {
    id: number,
    mustBeBefore: number[],
}

type RowCheck = {
    isValid: boolean,
    currNumber: number,
    invalidNumber: number,
}

export function dayFivePartOne(filename: string) {
    let middlePageSum = 0;

    const input = getNodes(filename);
    const nodes = input.ruleNodes;
    const updateRows = input.updateRows

    updateRows.forEach((updateRow) => {
        const isValid = checkLine(nodes, updateRow).isValid

        if (isValid) {
            const middleNumber = updateRow.at(Math.floor(updateRow.length / 2)) ?? 0
            middlePageSum += middleNumber;
        }
    })
    return middlePageSum;
}

export function dayFivePartTwo(filename: string) {
    let middlePageSum = 0;

    const input = getNodes(filename);
    const nodes = input.ruleNodes;
    const updateRows = input.updateRows

    updateRows.forEach((updateRow) => {
        const lineResult = checkLine(nodes, updateRow)
        if (!lineResult.isValid) {
            const fixedRow = handleInvalidLine(nodes, updateRow, lineResult)
            const middleNumber = fixedRow.at(Math.floor(fixedRow.length / 2)) ?? 0
            middlePageSum += middleNumber;
        }
    })
    return middlePageSum;
}

function checkLine(nodes: RuleNode[], rowToCheck: number[]): RowCheck {
    let currNumber = -1;
    let invalidNumber = -1;
    let isValid = true;
    const processingRow = [...rowToCheck]
    // Pop off the last number and check that all previous numbers are _not_ numbers that it must come before
    while ((currNumber = (processingRow.pop() ?? -1)) > 0) {
        const currNumberMustPrecedeList = nodes.find((node) => node.id === currNumber)?.mustBeBefore
        invalidNumber = processingRow.find((precedingNumber) => currNumberMustPrecedeList?.includes(precedingNumber)) ?? -1
        if (invalidNumber >= 0) {
            isValid = false;
            break;
        }
    }
    return { isValid, currNumber, invalidNumber };
}

function handleInvalidLine(nodes: RuleNode[], rowToFix: number[], initialLineResult: RowCheck) {
    let lineResult = initialLineResult;
    // While the row is invalid, make in-place swaps and check again for other discrepancies.
    while (!lineResult.isValid) {
        const currNumber = lineResult.currNumber
        const invalidNumber = lineResult.invalidNumber
        const currIndex = rowToFix.findIndex((num) => num === currNumber) ?? -1
        const invalidIndex = rowToFix.findIndex((num) => num === invalidNumber) ?? -1
        rowToFix[currIndex] = invalidNumber
        rowToFix[invalidIndex] = currNumber
        lineResult = checkLine(nodes, rowToFix);
    }
    // Once the row is fixed, return it.
    return rowToFix;
}

function getNodes(filename: string): InputProcessing {
    const rows = extractRowsAsStrings(filename)
    const splitIndex = rows.findIndex((row) => row === '')
    const ruleRows = rows.slice(0, splitIndex)
    const updateRows = rows.slice(splitIndex + 1,).map((row) => {
        return row.split(',').map((num) => Number.parseInt(num))
    })

    const nodes: RuleNode[] = []
    ruleRows.forEach((row) => {
        const firstNumber = Number.parseInt(row.split('|')[0])
        const secondNumber = Number.parseInt(row.split('|')[1])
        const firstExists = nodes.find((node) => node.id == firstNumber)
        const secondExists = nodes.find((node) => node.id == secondNumber)
        if (!secondExists) {
            const newNode: RuleNode = { id: secondNumber, mustBeBefore: [] }
            nodes.push(newNode);
        }
        if (firstExists) {
            firstExists.mustBeBefore.push(secondNumber);
        } else {
            const newNode: RuleNode = { id: firstNumber, mustBeBefore: [secondNumber] }
            nodes.push(newNode);
        }
    })
    return { ruleNodes: nodes, updateRows };
}