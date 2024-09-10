import { HeightMap } from '@/types';
import { createNoise2D } from 'simplex-noise';

export function addMountains(
  heightMap: HeightMap,
  mountainFactor: number = 0.7, // Controls how mountainous the land can be
  mountainRangeFactor: number = 0.05 // Controls the density of mountain ranges
): HeightMap {
  const noise2D = createNoise2D();
  const scale = 0.1; // Controls the scale of the mountain ranges

  for (let x = 0; x < heightMap.length; x++) {
    for (let y = 0; y < heightMap[0].length; y++) {
      const heightValue = heightMap[x][y];

      if (heightValue > 0) {
        // Apply noise-based mountain range generation
        const mountainRangeNoise = (noise2D(x * scale, y * scale) + 1) / 2;

        // If the noise value is above the range factor, create a mountain
        if (mountainRangeNoise > 1 - mountainRangeFactor) {
          // Add to the height to create a mountain
          heightMap[x][y] += mountainFactor * mountainRangeNoise;

          // Cap mountain height to avoid extreme peaks
          if (heightMap[x][y] > 1) {
            heightMap[x][y] = 1;
          }
        }
      }
    }
  }

  return heightMap;
}
