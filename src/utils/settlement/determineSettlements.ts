import {
  HeightMap,
  HumidityMap,
  LakeMap,
  RainfallMap,
  RiverMap,
  SettlementMap,
  TemperatureMap,
  TerrainMap,
} from '@/types';
import { isNearWater } from '../map';
import { calculateDesirability } from './calculateDesirability';

export function determineSettlements({
  heightMap,
  rivers,
  lakes,
  biomes,
  temperatureMap,
  humidityMap,
  rainfallMap,
}: {
  heightMap: HeightMap;
  rivers: RiverMap;
  lakes: LakeMap;
  biomes: TerrainMap;
  temperatureMap: TemperatureMap;
  humidityMap: HumidityMap;
  rainfallMap: RainfallMap;
}): SettlementMap[] {
  const settlements: SettlementMap[] = [];
  const width = heightMap.length;
  const height = heightMap[0].length;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Skip border tiles
      const borderPadding = 5;
      if (x <= borderPadding || y <= borderPadding || x >= width - borderPadding || y >= height - borderPadding) {
        continue;
      }

      const heightValue = heightMap[x][y];
      const biome = biomes[x][y];
      const temperature = temperatureMap[x][y];
      const humidity = humidityMap[x][y];
      const rainfall = rainfallMap[x][y];

      const isModerateTemperature = temperature > 0.3 && temperature < 0.9;

      const isUnsettleableBiome = ['desert', 'polar', 'lake', 'river', 'ocean', 'mountain'].includes(biome);

      const isLowElevation = heightValue < 0.8;

      const isAdequateHumidity = humidity > 0 && humidity < 0.8;

      const isAdequateRainfall = rainfall > 0.1;

      if (isModerateTemperature && !isUnsettleableBiome && isLowElevation && isAdequateHumidity && isAdequateRainfall) {
        const isNearWaterTile = isNearWater({ x, y, lakes, rivers, range: 2 });
        const desirability = calculateDesirability({
          isNearWaterTile,
          biome,
          heightValue,
          temperature,
          humidity,
        });

        settlements.push({ x, y, desirability });
      }
    }
  }

  return settlements.sort((a, b) => b.desirability - a.desirability);
}
