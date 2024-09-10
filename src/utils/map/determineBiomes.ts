import { BiomeTypes, HeightMap, LakeMap, RainfallMap, RiverMap, TemperatureMap, TerrainMap, WindMap } from '@/types';

export function determineBiomes({
  heightMap,
  lakes,
  rainfallMap,
  rivers,
  temperatureMap,
  windMap,
}: {
  heightMap: HeightMap;
  lakes: LakeMap;
  rainfallMap: RainfallMap;
  rivers: RiverMap;
  temperatureMap: TemperatureMap;
  windMap: WindMap;
}): TerrainMap {
  const biomes: TerrainMap = [];

  for (let x = 0; x < heightMap.length; x++) {
    biomes[x] = [];
    for (let y = 0; y < heightMap[0].length; y++) {
      const height = heightMap[x][y];
      const rain = rainfallMap[x][y];
      const wind = windMap[x][y];
      const temperature = temperatureMap[x][y];

      let biome: BiomeTypes;

      // Handle special biomes first: lakes, rivers, oceans, and mountains
      if (lakes[x][y] === 'lake') {
        biome = 'lake';
      } else if (rivers[x][y] === 'river') {
        biome = 'river';
      } else if (height < 0) {
        biome = 'ocean';
      } else if (height > 0.8) {
        biome = 'mountain';
      }
      // Forests and jungles
      else if (temperature > 0.2 && rain > 0.3) {
        if (temperature > 0.6 && rain > 0.7) {
          biome = 'rainforest';
        } else if (temperature > 0.5 && rain > 0.7) {
          biome = 'wet-forest';
        } else if (temperature > 0.4 && rain > 0.5) {
          biome = 'moist-forest';
        } else if (temperature > 0.3 && rain > 0.3) {
          biome = 'dry-forest';
        } else {
          biome = 'very-dry-forest';
        }
      }
      // Deserts and arid regions
      else if (rain < 0.3 && temperature > 0.3) {
        if (rain < 0.2 && temperature > 0.5) {
          biome = 'desert';
        } else if (temperature > 0.4 && wind > 0.5) {
          biome = 'desert-scrub';
        } else if (rain < 0.2 && wind > 0.5) {
          biome = 'thorn-woodland';
        } else {
          biome = 'steppe';
        }
      }
      // Tundra and polar regions
      else if (temperature < 0.3) {
        if (rain > 0.5) {
          biome = 'rain-tundra';
        } else if (temperature < 0.2 && rain > 0.3) {
          biome = 'wet-tundra';
        } else if (temperature < 0.1 && rain > 0.2) {
          biome = 'moist-tundra';
        } else if (temperature < 0.1 && rain < 0.3) {
          biome = 'polar';
        } else {
          biome = 'dry-tundra';
        }
      }
      // Default to woodland if no other biome conditions are met
      else {
        biome = 'woodland';
      }

      biomes[x][y] = biome;
    }
  }

  return biomes;
}
