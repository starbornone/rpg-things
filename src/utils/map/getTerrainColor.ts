import { Biome, TerrainType } from '@/types';

/**
 * Adjust the brightness of a hex color by a given amount.
 * @param hex - The hex color string (e.g., '#FF0000').
 * @param amount - The brightness adjustment amount (positive for brighter, negative for darker).
 * @returns A new hex color string with the adjusted brightness.
 */
export const adjustBrightness = (hex: string, amount: number): string => {
  let color = hex.replace('#', '');

  // Expand shorthand form (e.g., "03F") to full form (e.g., "0033FF")
  if (color.length === 3) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse the RGB values from the hex string
  const r = Math.min(255, Math.max(0, parseInt(color.substring(0, 2), 16) + amount)).toString(16);
  const g = Math.min(255, Math.max(0, parseInt(color.substring(2, 4), 16) + amount)).toString(16);
  const b = Math.min(255, Math.max(0, parseInt(color.substring(4, 6), 16) + amount)).toString(16);

  // Return the adjusted hex color, ensuring each value is two characters long
  return `#${r.padStart(2, '0')}${g.padStart(2, '0')}${b.padStart(2, '0')}`;
};

/**
 * Normalize the height within its biome's range to a value between 0 and 1.
 * @param height - The actual height value.
 * @param minBiomeHeight - The minimum height for the biome.
 * @param maxBiomeHeight - The maximum height for the biome.
 * @returns The normalized height as a decimal between 0 and 1.
 */
const normalizeHeight = (height: number, minBiomeHeight: number, maxBiomeHeight: number): number => {
  return (height - minBiomeHeight) / (maxBiomeHeight - minBiomeHeight);
};

/**
 * Get the terrain type's base color and adjust the brightness based on its relative height within the biome.
 * @param terrainType - The type of terrain (e.g., 'plains', 'mountains').
 * @param height - The height of the terrain.
 * @param biome - The biome to which the terrain belongs (e.g., 'grassland', 'forest').
 * @returns The adjusted hex color string for the terrain.
 */
export const getTerrainColor = (terrainType: TerrainType, height: number, biome: Biome): string => {
  let baseColor: string;
  let minBiomeHeight = -200;
  let maxBiomeHeight = 1000;

  switch (biome) {
    case 'aquatic':
      minBiomeHeight = -200;
      maxBiomeHeight = 100;
      break;
    case 'grassland':
      minBiomeHeight = -50;
      maxBiomeHeight = 75;
      break;
    case 'forest':
      minBiomeHeight = 0;
      maxBiomeHeight = 300;
      break;
    case 'desert':
      minBiomeHeight = -50;
      maxBiomeHeight = 400;
      break;
    case 'tundra':
      minBiomeHeight = -100;
      maxBiomeHeight = 500;
      break;
    default:
      minBiomeHeight = -200;
      maxBiomeHeight = 1000;
      break;
  }

  switch (terrainType) {
    case 'deep water':
      baseColor = '#000080';
      break;
    case 'shallow water':
      baseColor = '#1e90ff';
      break;
    case 'swamp':
      baseColor = '#006400';
      break;
    case 'plains':
      baseColor = '#8db600';
      break;
    case 'meadow':
      baseColor = '#a9d08e';
      break;
    case 'savannah':
      baseColor = '#c2b280';
      break;
    case 'hills':
      baseColor = '#8b4513';
      break;
    case 'dense forest':
      baseColor = '#013220';
      break;
    case 'light forest':
      baseColor = '#228b22';
      break;
    case 'forest clearing':
      baseColor = '#6b8e23';
      break;
    case 'dunes':
      baseColor = '#edc9af';
      break;
    case 'rocky desert':
      baseColor = '#cd853f';
      break;
    case 'oasis':
      baseColor = '#00fa9a';
      break;
    case 'canyon':
      baseColor = '#8b0000';
      break;
    case 'snow plains':
      baseColor = '#ffffff';
      break;
    case 'glaciers':
      baseColor = '#e0ffff';
      break;
    case 'mountains':
      baseColor = '#a9a9a9';
      break;
    case 'frozen river':
      baseColor = '#b0e0e6';
      break;
    default:
      return '#000000';
  }

  // Normalize the height within the biome's range
  const normalizedHeight = normalizeHeight(height, minBiomeHeight, maxBiomeHeight);

  // Adjust brightness based on normalized height
  // FIXME: I don't think this works
  const adjustmentAmount = 50; // Amount to brighten or darken
  const brightnessAdjustment = Math.floor(normalizedHeight * adjustmentAmount) - adjustmentAmount / 2;

  return adjustBrightness(baseColor, brightnessAdjustment);
};
