import { BiomeTypes, HeightMap, LakeMap, RiverMap, TerrainMap } from '@/types';

export function drawMap(
  tileSize: number,
  ctx: CanvasRenderingContext2D,
  biomes: TerrainMap,
  rivers: RiverMap,
  lakes: LakeMap,
  heightMap: HeightMap
) {
  for (let x = 0; x < biomes.length; x++) {
    for (let y = 0; y < biomes[0].length; y++) {
      const biome = biomes[x][y] as BiomeTypes;
      const height = heightMap[x][y];

      // Handle lakes first
      if (lakes[x][y] === 'lake') {
        const depthShade = Math.floor(height * 100); // Darken lake based on depth
        ctx.fillStyle = adjustBrightness('#0077CC', depthShade);
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        continue;
      }

      // Handle different biomes
      switch (biome) {
        case 'ocean': {
          const depthShade = Math.floor(height * 100); // Darken ocean for depth
          ctx.fillStyle = adjustBrightness('#004488', depthShade);
          break;
        }
        case 'mountain': {
          const mountainShade = Math.floor(height * 100); // Darken/brighten mountains by height
          ctx.fillStyle = adjustBrightness('#444', mountainShade);
          break;
        }
        case 'rainforest':
          ctx.fillStyle = '#006400'; // Dark green for tropical rainforest
          break;
        case 'wet-forest':
          ctx.fillStyle = '#0A803D'; // Standard green for wet forest
          break;
        case 'moist-forest':
          ctx.fillStyle = '#20A060'; // Bright green for moist forest
          break;
        case 'dry-forest':
          ctx.fillStyle = '#A4C689'; // Lighter green for dry forest
          break;
        case 'very-dry-forest':
          ctx.fillStyle = '#C0C080'; // Pale yellowish-green for very dry forest
          break;
        case 'thorn-woodland':
          ctx.fillStyle = '#A3C18A'; // Pale green for thorn woodland
          break;
        case 'desert-scrub':
          ctx.fillStyle = '#E3C8A3'; // Sandy scrub desert color
          break;
        case 'desert':
          ctx.fillStyle = '#E1B076'; // Sandy desert color
          break;
        case 'woodland':
          ctx.fillStyle = '#A1D490'; // Light green for woodland
          break;
        case 'steppe':
          ctx.fillStyle = '#C0C080'; // Pale yellow-brown for steppe
          break;
        case 'rain-tundra':
          ctx.fillStyle = '#8FBC8B'; // Greenish for rain tundra
          break;
        case 'wet-tundra':
          ctx.fillStyle = '#D4E9E2'; // Light blue for wet tundra
          break;
        case 'moist-tundra':
          ctx.fillStyle = '#C8E2E2'; // Gray-blue for moist tundra
          break;
        case 'dry-tundra':
          ctx.fillStyle = '#D1CDC6'; // Light gray for dry tundra
          break;
        case 'polar':
          ctx.fillStyle = '#FFFFFF'; // Pure white for polar regions
          break;
        default:
          ctx.fillStyle = '#A1D490'; // Fallback to woodland green
      }

      // Draw the biome tile
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      // Overlay rivers on top of the biome
      if (rivers[x][y] === 'river') {
        const depthShade = Math.floor(height * 100);
        ctx.fillStyle = adjustBrightness('#0099FF', depthShade);
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
}

/**
 * Adjust the brightness of a hex color by a given amount.
 * @param hex - The hex color string (e.g., '#FF0000').
 * @param amount - The brightness adjustment amount (positive for brighter, negative for darker).
 * @returns A new hex color string with the adjusted brightness.
 */
const adjustBrightness = (hex: string, amount: number): string => {
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
