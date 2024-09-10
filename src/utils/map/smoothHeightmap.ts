import { HeightmapTile } from '@/types';

/**
 * Function to smooth the heightmap by averaging neighboring heights.
 * @param heightmap - The initial 2D array of heights to be smoothed.
 * @returns A new smoothed 2D heightmap array.
 */
export const smoothHeightmap = (heightmap: HeightmapTile[][]): HeightmapTile[][] => {
  const rows = heightmap.length;
  const cols = heightmap[0].length;

  const smoothedHeightmap: HeightmapTile[][] = [];

  for (let y = 0; y < rows; y++) {
    const row: HeightmapTile[] = [];
    for (let x = 0; x < cols; x++) {
      const neighbors = getNeighbors(heightmap, x, y);
      const totalHeight = neighbors.reduce((acc, h) => acc + h, heightmap[y][x].height);
      const averageHeight = totalHeight / (neighbors.length + 1); // +1 to include the current tile
      row.push({ height: averageHeight });
    }
    smoothedHeightmap.push(row);
  }

  return smoothedHeightmap;
};

/**
 * Helper function to get neighboring tiles' heights for smoothing.
 * @param heightmap - The 2D heightmap array from which to retrieve neighbors.
 * @param x - The x coordinate of the current tile.
 * @param y - The y coordinate of the current tile.
 * @returns An array of neighboring heights for the tile at (x, y).
 */
const getNeighbors = (heightmap: HeightmapTile[][], x: number, y: number): number[] => {
  const neighbors: number[] = [];
  const directions = [
    [-1, 0], // Left
    [1, 0], // Right
    [0, -1], // Up
    [0, 1], // Down
    [-1, -1], // Diagonal Left-Up
    [1, 1], // Diagonal Right-Down
    [-1, 1], // Diagonal Left-Down
    [1, -1], // Diagonal Right-Up
  ];

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    // Ensure the neighbor coordinates are within the bounds of the heightmap
    if (newX >= 0 && newX < heightmap[0].length && newY >= 0 && newY < heightmap.length) {
      neighbors.push(heightmap[newY][newX].height);
    }
  });

  return neighbors;
};
