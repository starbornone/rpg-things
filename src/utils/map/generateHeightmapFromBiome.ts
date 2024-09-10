import { Biome, HeightmapTile } from '@/types';
import { smoothHeightmap } from './smoothHeightmap';

/**
 * Function to generate a heightmap based on the selected biome.
 * @param cols - The number of columns (width) in the heightmap.
 * @param rows - The number of rows (height) in the heightmap.
 * @param biome - The selected biome which affects the range of heights.
 * @returns A 2D array representing the heightmap with biome-specific heights.
 */
export const generateHeightmapFromBiome = (cols: number, rows: number, biome?: Biome): HeightmapTile[][] => {
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
