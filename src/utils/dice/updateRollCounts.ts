/**
 * Updates the roll counts with new results.
 * @param rollCounts - An object where each key is a side of the die, and the value is the count of rolls for that side.
 * @param newCounts - An object where each key is a side of the die, and the value is the count of that side's occurrences in the most recent set of rolls.
 * @returns An updated object of roll counts.
 */
export function updateRollCounts(
  rollCounts: Record<number, number>,
  newCounts: Record<number, number>
): Record<number, number> {
  const updatedCounts = { ...rollCounts }; // Create a shallow copy of the current rollCounts

  Object.keys(newCounts).forEach((key) => {
    const side = parseInt(key, 10); // Ensure the key is treated as a number
    updatedCounts[side] = (updatedCounts[side] || 0) + newCounts[side]; // Update the count, ensuring any missing sides are treated as 0
  });

  return updatedCounts;
}
