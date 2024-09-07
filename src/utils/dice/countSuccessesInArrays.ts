import { countSuccesses } from '@/utils';

/**
 * Counts the number of successes in an array of arrays.
 * @param rollsArray - An array of arrays containing numbers to be evaluated.
 * @param threshold - The threshold value. Values greater than or equal to this will be considered a success.
 * @returns The total number of successes across all arrays.
 */
export function countSuccessesInArrays(rollsArray: number[][], threshold: number): number {
  return rollsArray.reduce((successCount, rolls) => {
    return successCount + countSuccesses(rolls, threshold);
  }, 0);
}
