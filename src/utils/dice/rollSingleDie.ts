/**
 * Rolls a single die with a specified number of sides.
 * @param diceSides - The number of sides on the die.
 * @returns A random integer between 1 and the number of sides inclusive.
 */
export function rollSingleDie(diceSides: number): number {
  return Math.floor(Math.random() * diceSides) + 1;
}
