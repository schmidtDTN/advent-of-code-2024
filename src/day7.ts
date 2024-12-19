import { extractRowsAsStrings } from "./input_processing";

export function daySevenPartOne(filename: string) {
    const rows = extractRowsAsStrings(filename);
    let possibleEquationSum = 0;

    rows.forEach((row) => {
        const splitRow = row.split(': ')
        const target = Number.parseInt(splitRow[0])
        const components = splitRow[1].split(' ').map((item) => Number.parseInt(item))
        const possible = recursiveOperatorCheck(target, [...components]);
        if (possible) {
            possibleEquationSum += target
        }
    })
    return possibleEquationSum;

}

export function daySevenPartTwo(filename: string) {
    const rows = extractRowsAsStrings(filename);
    let possibleEquationSum = 0;

    rows.forEach((row) => {
        const splitRow = row.split(': ')
        const target = Number.parseInt(splitRow[0])
        const components = splitRow[1].split(' ').map((item) => Number.parseInt(item))
        const possible = recursiveOperatorCheck(target, [...components], true);
        if (possible) {
            possibleEquationSum += target
        }
    })
    return possibleEquationSum;

}

function recursiveOperatorCheck(target: number, components: number[], partTwo?: boolean): boolean {
    // base case
    if (components.length == 1) {
        return components[0] === target;
    }

    // Try addition operator
    const addedComponent = components[0] + components[1]
    const multipliedComponent = components[0] * components[1]
    const concatenatedComponent = Number.parseInt(components[0].toString() + components[1].toString())

    // Replace first two items with the added component and try recursing
    components.splice(0, 2, addedComponent);
    const addedRecursion = recursiveOperatorCheck(target, [...components], partTwo)
    // Try multiplication operator
    // Since we've already modified the components array in place, we just replace the
    // first component
    components[0] = multipliedComponent
    const multipliedRecursion = recursiveOperatorCheck(target, [...components], partTwo)

    // If part 2, try concatenation operator
    if (partTwo) {
        components[0] = concatenatedComponent
        const concatenatedRecursion = recursiveOperatorCheck(target, [...components], partTwo)
        return addedRecursion || multipliedRecursion || concatenatedRecursion
    }

    // If not part two, only check added and multiplied operators
    return addedRecursion || multipliedRecursion;
}