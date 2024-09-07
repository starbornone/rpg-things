import { initializeCounts } from '@/utils';

/**
 * Counts the occurrences of each roll.
 * @param rolls - An array of integers representing the results of the dice rolls.
 * @param diceSides - The number of sides on the die.
 * @returns An object where each key represents a side of the die and each value represents the count of that side's occurrences in the rolls array.
 */
export function countRolls(rolls: number[], diceSides: number): Record<number, number> {
  const counts = initializeCounts(diceSides);
  rolls.forEach((roll) => {
    counts[roll] += 1;
  });
  return counts;
}
