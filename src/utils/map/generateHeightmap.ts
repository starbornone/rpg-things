import { Biome, HeightmapTile } from '@/types';

/**
 * Function to generate a heightmap based on the selected biome.
 * @param cols - The number of columns (width) in the heightmap.
 * @param rows - The number of rows (height) in the heightmap.
 * @param biome - The selected biome which affects the range of heights.
 * @returns A 2D array representing the heightmap with biome-specific heights.
 */
export const generateHeightmap = (cols: number, rows: number, biome: Biome): HeightmapTile[][] => {
  let heightmap: HeightmapTile[][] = [];

  // Step 1: Generate biome-specific heights
  for (let y = 0; y < rows; y++) {
    const row: HeightmapTile[] = [];
    for (let x = 0; x < cols; x++) {
      let height = 0;

      // Biome-specific height ranges and distributions
      switch (biome) {
        case 'aquatic':
          height = Math.random() * 300 - 200; // Range [-200, 100]
          break;
        case 'grassland':
          height = Math.random() * 125 - 50; // Range [-50, 75]
          break;
        case 'forest':
          height = Math.random() * 300; // Range [0, 300]
          break;
        case 'desert':
          height = Math.random() * 450 - 50; // Range [-50, 400]
          break;
        case 'tundra':
          height = Math.random() * 600 - 100; // Range [-100, 500]
          break;
        default:
          height = Math.random() * 1200 - 100; // Range [-200, 1000]
          break;
      }

      row.push({ height });
    }
    heightmap.push(row);
  }

  // Step 2: Apply smoothing algorithm to make the terrain more realistic
  for (let i = 0; i < 3; i++) {
    heightmap = smoothHeightmap(heightmap); // Apply smoothing to heightmap
  }

  return heightmap;
};

/**
 * Function to smooth the heightmap by averaging neighboring heights.
 * @param heightmap - The initial 2D array of heights to be smoothed.
 * @returns A new smoothed 2D heightmap array.
 */
const smoothHeightmap = (heightmap: HeightmapTile[][]): HeightmapTile[][] => {
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
