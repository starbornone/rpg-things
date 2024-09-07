/**
 * Updates the roll counts state with new results.
 * @param rollCounts - An array where each index represents a side of the die, and the value at that index represents the count of rolls for that side.
 * @param newCounts - An object where each key represents a side of the die and each value represents the count of that side's occurrences in the most recent set of rolls.
 * @returns An updated array of roll counts, where the counts for each side have been incremented by the new counts.
 */
export function updateRollCounts(rollCounts: number[], newCounts: Record<number, number>): number[] {
  return rollCounts.map((count, index) => count + newCounts[index + 1]);
}