import { rollSingleDie } from '@/utils';

/**
 * Rolls a set of dice and returns an array of the results.
 * @param diceCount - The number of dice to roll.
 * @param diceSides - The number of sides on each die.
 * @returns An array of integers representing the result of each die roll.
 */
export function rollDiceSet(diceCount: number, diceSides: number): number[] {
  return Array.from({ length: diceCount }, () => rollSingleDie(diceSides));
}
