import { HeightMap, MapType } from '@/types';
import { createNoise2D } from 'simplex-noise';

export function generateLandmass(width: number, height: number, mapType: MapType): HeightMap {
  const landmassMap: HeightMap = [];
  const noise2D = createNoise2D();
  const scale = 0.05; // Controls noise variation

  for (let x = 0; x < width; x++) {
    landmassMap[x] = [];
    for (let y = 0; y < height; y++) {
      // Generate noise for landmass variation
      const noiseValue = noise2D(x * scale, y * scale);
      const normalizedNoise = (noiseValue + 1) / 2; // Convert noise to range [0, 1]

      let landmassValue: number = 0;

      // Adjust based on map type
      if (mapType === 'archipelago') {
        landmassValue = normalizedNoise * 0.6; // More islands
      } else if (mapType === 'pangea') {
        landmassValue = normalizedNoise * 0.2 + 0.8; // Larger landmass
      } else if (mapType === 'continents') {
        const continentFactor = Math.sin((x / width) * Math.PI) * Math.sin((y / height) * Math.PI);
        landmassValue = (continentFactor + normalizedNoise) * 0.5; // Separated continents
      }

      // Ensure valid height values and no infinity
      if (isNaN(landmassValue) || !isFinite(landmassValue)) {
        console.error(`Invalid landmassValue at (${x}, ${y}):`, landmassValue);
        landmassMap[x][y] = -1; // Default to ocean in case of invalid values
      } else {
        // Determine whether it's ocean (-1) or land (0.3)
        landmassMap[x][y] = landmassValue > 0.5 ? 0.3 : -1;
      }
    }
  }

  return landmassMap;
}

export function applyHeightVariation(landmassMap: HeightMap): HeightMap {
  const heightMap: HeightMap = [];
  const noise2D = createNoise2D();
  const scale = 0.05;
  const smoothingRadius = 5; // Controls how gradual the ocean/land transition is

  for (let x = 0; x < landmassMap.length; x++) {
    heightMap[x] = [];
    for (let y = 0; y < landmassMap[0].length; y++) {
      const baseHeight = landmassMap[x][y]; // Either -1 (ocean) or 0.3 (land)

      if (baseHeight < 0) {
        // For ocean, we smooth the transition from deep water (-1) to near coastlines (-0.1)
        const distanceToLand = getDistanceToLand(x, y, landmassMap);
        heightMap[x][y] = Math.max(-1, -1 + distanceToLand / smoothingRadius); // Smooth from deep ocean to coast
      } else {
        // For land, apply noise to create more terrain variation
        const noiseValue = noise2D(x * scale, y * scale);
        const normalizedNoise = (noiseValue + 1) / 2;
        heightMap[x][y] = baseHeight + normalizedNoise * 0.55; // Adjust land height with noise
      }
    }
  }

  return heightMap;
}

// Helper function to calculate distance to the nearest land tile
function getDistanceToLand(x: number, y: number, landmassMap: HeightMap): number {
  let minDistance = Infinity;
  const searchRadius = 5;

  for (let dx = -searchRadius; dx <= searchRadius; dx++) {
    for (let dy = -searchRadius; dy <= searchRadius; dy++) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < landmassMap.length &&
        newY < landmassMap[0].length &&
        landmassMap[newX][newY] >= 0 // Check if the tile is land
      ) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
    }
  }

  // If no land was found within the search radius, default to a maximum reasonable distance
  if (minDistance === Infinity) {
    return searchRadius; // Assume far from land but not infinite
  }
  return minDistance;
}
