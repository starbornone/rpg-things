/**
 * Calculates the Manhattan distance between two points on a grid.
 * This represents the total number of horizontal and vertical moves
 * needed to move from the current position to the new position.
 * @param currentX - The current X-coordinate of the character.
 * @param currentY - The current Y-coordinate of the character.
 * @param newX - The new X-coordinate the character is moving to.
 * @param newY - The new Y-coordinate the character is moving to.
 * @returns The calculated move distance as a number.
 */
export const calculateMoveDistance = (currentX: number, currentY: number, newX: number, newY: number): number => {
  return Math.abs(newX - currentX) + Math.abs(newY - currentY);
};
