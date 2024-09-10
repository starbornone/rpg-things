import { HeightMap, TemperatureMap, WindMap } from '@/types';
import { createNoise2D } from 'simplex-noise';

export function generateWindMap({
  width,
  height,
  heightMap,
  temperatureMap,
}: {
  width: number;
  height: number;
  heightMap: HeightMap;
  temperatureMap: TemperatureMap;
}): WindMap {
  const windMap: WindMap = [];
  const noise2D = createNoise2D();
  const windScale = 0.05; // Controls how much variation in wind patterns

  for (let x = 0; x < width; x++) {
    windMap[x] = [];
    for (let y = 0; y < height; y++) {
      const noiseValue = (noise2D(x * windScale, y * windScale) + 1) / 2;

      // Higher wind at higher altitudes
      const altitudeEffect = Math.min(1, heightMap[x][y] + 0.2); // Amplify wind slightly in high areas
      const temperatureEffect = 1 - temperatureMap[x][y]; // Stronger wind where it's colder (inversely related to temperature)

      // Wind intensity varies with noise, height, and temperature
      windMap[x][y] = noiseValue * 0.5 + altitudeEffect * 0.3 + temperatureEffect * 0.2;

      // Clamp wind values between 0 and 1 for consistency
      windMap[x][y] = Math.max(0, Math.min(1, windMap[x][y]));
    }
  }

  return windMap;
}
