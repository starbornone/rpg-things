/**
 * Initializes counts for each side of the dice.
 * @param diceSides - The number of sides on the die.
 * @returns An object with keys representing each side of the die and values initialized to 0.
 */
export function initializeCounts(diceSides: number): Record<number, number> {
  return Object.fromEntries(Array.from({ length: diceSides }, (_, index) => [index + 1, 0]));
}
