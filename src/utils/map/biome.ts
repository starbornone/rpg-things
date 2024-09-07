import { Biome, Grid, HeightmapTile, TerrainType, Tile } from '@/types';

/**
 * Function to assign terrain types based on the selected biome and height.
 * @param biome - The selected biome which influences the terrain types.
 * @param height - The height of the terrain which affects the terrain type within the biome.
 * @returns The terrain type corresponding to the given height within the biome.
 */
const getTerrainForBiome = (biome: Biome, height: number): TerrainType => {
  switch (biome) {
    case 'aquatic':
      if (height <= -150) return 'deep water';
      if (height <= -50) return 'shallow water';
      if (height <= 0) return 'swamp';
      return 'hills'; // Small hills near water
    case 'grassland':
      if (height <= 10) return 'plains';
      if (height <= 30) return 'meadow';
      if (height <= 50) return 'savannah';
      return 'hills';
    case 'forest':
      if (height <= 50) return 'dense forest';
      if (height <= 150) return 'light forest';
      if (height <= 300) return 'forest clearing';
      return 'mountains';
    case 'desert':
      if (height <= 0) return 'oasis';
      if (height <= 50) return 'dunes';
      if (height <= 200) return 'rocky desert';
      return 'canyon';
    case 'tundra':
      if (height <= 0) return 'frozen river';
      if (height <= 100) return 'snow plains';
      if (height <= 300) return 'glaciers';
      return 'mountains';
    default:
      return 'plains'; // Default to plains if biome is undefined
  }
};

/**
 * Function to generate the grid based on the heightmap and assign terrain types.
 * @param heightmap - A 2D array representing the heightmap with height values.
 * @param biome - The selected biome which affects the terrain type assignment.
 * @returns A Grid object that contains the width, height, and map of tiles with terrain types and heights.
 */
export const generateBiomeTerrain = (heightmap: HeightmapTile[][], biome: Biome): Grid => {
  const rows = heightmap.length;
  const cols = heightmap[0].length;

  const grid: Tile[][] = [];

  for (let y = 0; y < rows; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < cols; x++) {
      const height = heightmap[y][x].height;
      const terrainType = getTerrainForBiome(biome, height);
      row.push({ terrainType, height });
    }
    grid.push(row);
  }

  return { width: cols, height: rows, map: grid };
};
