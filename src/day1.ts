import { extractTwoColumnListsAsNumbers } from "./input_processing";

export function dayOnePartOne(filename: string) {
    const columnLists = extractTwoColumnListsAsNumbers(filename);
    const firstColumnSorted = columnLists[0].sort()
    const secondColumnSorted = columnLists[1].sort()
    // This works fine because the two columns have the same length
    const distances = firstColumnSorted.map((firstColNumber, index) => {
        const secondColNumber = secondColumnSorted[index];
        const distance = Math.abs(secondColNumber - firstColNumber);
        return distance;
    })
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0)

    return totalDistance;
}

export function dayOnePartTwo(filename: string) {
    const columnLists = extractTwoColumnListsAsNumbers(filename);
    const leftList = columnLists[0];
    const rightList = columnLists[1];
    // Memoize the similarities
    const memoizedSimilarities: Map<number, number> = new Map();
    const similarities = leftList.map((leftNumber) => {
        // If we've already found this number and how many times it appears, return the memoized result
        if (memoizedSimilarities.has(leftNumber)) {
            // Nullish check for the typing, but this should never be null
            return memoizedSimilarities.get(leftNumber) ?? 0;
        }
        // If not, then count up the appearances in the second list
        const appearances = rightList.filter((entry) => entry === leftNumber).length;
        const similarityScore = leftNumber * appearances;
        memoizedSimilarities.set(leftNumber, similarityScore);

        return similarityScore;
    })
    const totalSimilarity = similarities.reduce((acc, curr) => acc + curr, 0);
    return totalSimilarity;
}