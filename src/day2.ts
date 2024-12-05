import { extractRowListsAsNumbers } from "./input_processing";

export function dayTwoPartOne(filename: string) {
    const reports = extractRowListsAsNumbers(filename)

    const safetyReport = reports.map((report) => {
        const allItemsMonotonic = checkMonotonicWithinRange(report, 3)
        return allItemsMonotonic.every((entry) => entry === true);
    })
    return safetyReport;
}

export function dayTwoPartTwo(filename: string) {
    const reports = extractRowListsAsNumbers(filename)

    // TODO: To be more elegant/efficient - maybe the below would work:
    // Try a different approach entirely: Replace each number with the distance between it and its successor
    // For direction swaps, check how many times the sign changes.
    // For magnitude issues - check each number.  If it's too far apart, check the difference between it and the one after.
    // If that's back in spec, continue.

    const safetyReport = reports.map((report) => {
        const allItemsMonotonic = checkMonotonicWithinRange(report, 3)
        const allSafe = allItemsMonotonic.every((entry) => entry === true);
        // If there are unsafe levels, then remove the first unsafe level and try again
        if(!allSafe){
            for (let index = 0; index < report.length; index++) {
                const copiedReport = Object.assign([], report);
                copiedReport.splice(index, 1);
                const iterativeCheck = checkMonotonicWithinRange(copiedReport, 3);
                const iterativeCheckAllSafe = iterativeCheck.every((entry) => entry === true);
                // if we find a safe path, return that there is a safe option 
                if(iterativeCheckAllSafe){
                    return true;
                }
            }
            // If no safe path was found, return false.
            return false;
        }
        // if allSafe is true, return true
        return true;
    })
    return safetyReport;
}

function checkMonotonicWithinRange(row: number[], maxRange: number): boolean[] {
    // Check whether this is supposed to be increasing or decreasing
    const increasing = row[0] < row[1]
    const rowLength = row.length

    // Iterate through the row and check each sequential pair
    const allMonotonic = row.map((curr, index) => {
        if (canLookAhead(index, 1, rowLength)) {
            // Check that the numbers are moving in the right direction
            const monotonic = (curr < row[index + 1] === increasing) && (curr != row[index + 1])
            // Check that the gap between numbers is within the acceptable range
            const withinMaxRange = Math.abs(row[index + 1] - curr) <= maxRange
            return monotonic && withinMaxRange
        }
        return true;
    })

    return allMonotonic;
}

function canLookAhead(currIndex: number, desiredLookahead: number, rowLength: number): boolean {
    // If 3 items in row, then length = 3, but max possible index = 2
    // So, for currIndex of 0 and 1, this will be true, but anything higher will be false
    return (currIndex + 1) < rowLength
}