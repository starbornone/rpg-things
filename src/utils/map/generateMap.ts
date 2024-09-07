import { Biome, Grid } from '@/types';
import { generateBiomeTerrain, generateHeightmap } from '@/utils';

/**
 * Generates a map based on the specified biome.
 * First, it creates a heightmap, then it generates the biome-specific terrain
 * using that heightmap.
 * @param biome - The biome type (e.g., forest, desert, tundra) to generate the map for.
 * @returns A `Grid` representing the terrain generated for the given biome.
 */
export const generateMap = (biome: Biome): Grid => {
  const heightmap = generateHeightmap(25, 16, biome);
  return generateBiomeTerrain(heightmap, biome);
};
