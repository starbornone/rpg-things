import { HeightMap, HumidityMap, RainfallMap, TemperatureMap, WindMap } from '@/types';

export function generateHumidityMap({
  rainfallMap,
  temperatureMap,
  windMap,
  heightMap,
}: {
  rainfallMap: RainfallMap;
  temperatureMap: TemperatureMap;
  windMap: WindMap;
  heightMap: HeightMap;
}): HumidityMap {
  const humidityMap: HumidityMap = [];

  for (let x = 0; x < rainfallMap.length; x++) {
    humidityMap[x] = [];

    for (let y = 0; y < rainfallMap[0].length; y++) {
      const rainfallValue = rainfallMap[x][y];
      const temperature = temperatureMap[x][y];
      const wind = windMap[x][y];
      const height = heightMap[x][y];

      // Higher altitudes tend to have less humidity
      const altitudeEffect = 1 - Math.min(1, height + 0.2); // Reduce humidity with altitude

      // Wind can reduce humidity by transporting moisture away
      const windEffect = 1 - Math.min(1, wind); // Stronger winds decrease humidity

      // Humidity calculation considering rainfall, temperature, wind, and altitude
      humidityMap[x][y] = rainfallValue * (0.5 + 0.5 * temperature) * altitudeEffect * windEffect;

      // Clamp the humidity value between 0 and 1 for consistency
      humidityMap[x][y] = Math.max(0, Math.min(1, humidityMap[x][y]));
    }
  }

  return humidityMap;
}
