/**
 * Function to initialize counts for each side
 * @param {number} diceSides - The number of sides on the die.
 * @returns {Record<number, number>} - An object with keys representing each side of the die and values initialized to 0.
 */
function initializeCounts(diceSides: number): Record<number, number> {
  return Object.fromEntries(Array.from({ length: diceSides }, (_, index) => [index + 1, 0]));
}

/**
 * Function to roll a single die
 * @param {number} diceSides - The number of sides on the die.
 * @returns {number} - A random integer between 1 and the number of sides inclusive.
 */
export function rollSingleDie(diceSides: number): number {
  return Math.floor(Math.random() * diceSides) + 1;
}

/**
 * Function to roll a set of dice
 * @param {number} diceCount - The number of dice to roll.
 * @param {number} diceSides - The number of sides on each die.
 * @returns {number[]} - An array of integers representing the result of each die roll.
 */
export function rollDiceSet(diceCount: number, diceSides: number): number[] {
  return Array.from({ length: diceCount }, () => rollSingleDie(diceSides));
}

/**
 * Function to count the occurrences of each roll
 * @param {number[]} rolls - An array of integers representing the results of the dice rolls.
 * @param {number} diceSides - The number of sides on the die.
 * @returns {Record<number, number>} - An object where each key represents a side of the die and each value represents the count of that side's occurrences in the rolls array.
 */
export function countRolls(rolls: number[], diceSides: number): Record<number, number> {
  const counts = initializeCounts(diceSides);
  rolls.forEach((roll) => {
    counts[roll] += 1;
  });
  return counts;
}

/**
 * Function to update the roll counts state
 * @param {number[]} rollCounts - An array where each index represents a side of the die, and the value at that index represents the count of rolls for that side.
 * @param {Record<number, number>} newCounts - An object where each key represents a side of the die and each value represents the count of that side's occurrences in the most recent set of rolls.
 * @returns {number[]} - An updated array of roll counts, where the counts for each side have been incremented by the new counts.
 */
export function updateRollCounts(rollCounts: number[], newCounts: Record<number, number>): number[] {
  return rollCounts.map((count, index) => count + newCounts[index + 1]);
}

/**
 * Counts the number of values in an array that are greater than or equal to a given threshold.
 *
 * @param {number[]} rolls - An array of numbers to be evaluated.
 * @param {number} threshold - The threshold value (x). Values greater than or equal to this will be considered a success.
 * @returns {number} - The count of successes (numbers >= threshold).
 */
export function countSuccesses(rolls: number[], threshold: number): number {
  return rolls.filter((roll) => roll >= threshold).length;
}

/**
 * Counts the number of values in an array of arrays that are greater than or equal to a given threshold.
 *
 * @param {number[][]} rollsArray - An array of arrays containing numbers to be evaluated.
 * @param {number} threshold - The threshold value (x). Values greater than or equal to this will be considered a success.
 * @returns {number} - The count of successes (numbers >= threshold) across all arrays.
 */
export function countSuccessesInArrays(rollsArray: number[][], threshold: number): number {
  return rollsArray.reduce((successCount, rolls) => {
    // For each sub-array, filter the numbers that are greater than or equal to the threshold
    // and add the count to the total success count.
    return successCount + countSuccesses(rolls, threshold);
  }, 0);
}
