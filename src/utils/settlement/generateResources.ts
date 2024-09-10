import { biomeResources } from '@/data';
import { TerrainMap } from '@/types';

function mergeResources(baseResources: any, additionalResources: any) {
  const merged = { ...baseResources };

  Object.keys(additionalResources).forEach((key) => {
    if (Array.isArray(additionalResources[key])) {
      merged[key] = merged[key] ? merged[key].concat(additionalResources[key]) : additionalResources[key];
    } else {
      merged[key] = (merged[key] || 0) + additionalResources[key];
    }
  });

  return merged;
}

// Function to gather resources from a settlement's biome and surrounding biomes
export function generateResources(settlementBiome: string, biomes: TerrainMap, x: number, y: number, range = 2) {
  const width = biomes.length;
  const height = biomes[0].length;

  // Get the resources for the settlement's own biome
  const settlementResources = biomeResources[settlementBiome as keyof typeof biomeResources] || {
    flora: [],
    fauna: [],
    minerals: [],
  };

  let surroundingResources = { flora: [], fauna: [], minerals: [] };

  // Loop through surrounding tiles within the given range
  for (let dx = -range; dx <= range; dx++) {
    for (let dy = -range; dy <= range; dy++) {
      const nx = x + dx;
      const ny = y + dy;

      // Ensure we're within map bounds
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nearbyBiome = biomes[nx][ny];

        // Skip if it's the same tile as the settlement
        if (nx === x && ny === y) continue;

        // Get resources from the nearby biome
        const nearbyBiomeResources = biomeResources[nearbyBiome as keyof typeof biomeResources];
        if (nearbyBiomeResources) {
          surroundingResources = mergeResources(surroundingResources, nearbyBiomeResources);
        }
      }
    }
  }

  const combinedResources = {
    flora: [...new Set([...settlementResources.flora, ...surroundingResources.flora])],
    fauna: [...new Set([...settlementResources.fauna, ...surroundingResources.fauna])],
    minerals: [...new Set([...settlementResources.minerals, ...surroundingResources.minerals])],
  };

  return combinedResources;
}
