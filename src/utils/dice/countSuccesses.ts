/**
 * Counts the number of values in an array that are greater than or equal to a given threshold.
 * @param rolls - An array of numbers to be evaluated.
 * @param threshold - The threshold value. Values greater than or equal to this will be considered a success.
 * @returns The count of successes.
 */
export function countSuccesses(rolls: number[], threshold: number): number {
  return rolls.filter((roll) => roll >= threshold).length;
}
