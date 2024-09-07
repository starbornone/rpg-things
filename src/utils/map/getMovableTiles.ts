import { Grid } from '@/types';

/**
 * Determines the tiles a unit can move to, given the unit's current position, move range,
 * and the grid's boundaries. It calculates all possible tiles within the unit's move range
 * using Manhattan distance and ensures the tiles are within the grid boundaries.
 * @param unitX - The current X-coordinate of the unit.
 * @param unitY - The current Y-coordinate of the unit.
 * @param moveRange - The maximum number of tiles the unit can move.
 * @param grid - The grid representing the map, containing width and height.
 * @returns An array of movable tiles, each represented as an object with x and y coordinates.
 */
export const getMovableTiles = (unitX: number, unitY: number, moveRange: number, grid: Grid | null) => {
  const movableTiles = [];

  for (let y = unitY - moveRange; y <= unitY + moveRange; y++) {
    for (let x = unitX - moveRange; x <= unitX + moveRange; x++) {
      const distance = Math.abs(unitX - x) + Math.abs(unitY - y);
      if (distance <= moveRange && x >= 0 && y >= 0 && x < grid!.width && y < grid!.height) {
        movableTiles.push({ x, y });
      }
    }
  }

  return movableTiles;
};
