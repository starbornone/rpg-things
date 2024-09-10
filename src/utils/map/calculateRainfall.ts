import { HeightMap, RainfallMap, TemperatureMap, WindMap } from '@/types';
import { createNoise2D } from 'simplex-noise';

export function calculateRainfall(
  { heightMap, windMap, temperatureMap }: { heightMap: HeightMap; windMap: WindMap; temperatureMap: TemperatureMap },
  mountainThreshold: number = 0.8,
  equatorBandWidth: number = 20,
  fullRainfallAmount: number = 0.8
): RainfallMap {
  const rainfall: RainfallMap = [];
  const noise2D = createNoise2D();
  const noiseScale = 0.1;
  const height = heightMap[0].length;
  const equatorY = Math.floor(height / 2);

  for (let x = 0; x < heightMap.length; x++) {
    rainfall[x] = [];
    for (let y = 0; y < heightMap[0].length; y++) {
      const heightValue = heightMap[x][y];
      const temperature = temperatureMap[x][y];

      // Check if this area is above the mountain threshold
      if (heightValue >= mountainThreshold) {
        rainfall[x][y] = 0; // Block rainfall above mountains
      } else {
        // Calculate base rainfall using wind, temperature, and noise
        const baseRainfall = calculateBaseRainfall(x, y, windMap, temperature, noise2D, noiseScale);

        // Adjust for proximity to the equator
        const equatorAdjustment = adjustForEquator(
          y,
          equatorY,
          equatorBandWidth,
          fullRainfallAmount,
          noise2D,
          x,
          noiseScale
        );

        // Combine the base rainfall and equator adjustment
        rainfall[x][y] = Math.max(baseRainfall, equatorAdjustment);
      }
    }
  }

  return rainfall;
}

function calculateBaseRainfall(
  x: number,
  y: number,
  windMap: WindMap,
  temperature: number,
  noise2D: (x: number, y: number) => number,
  noiseScale: number
): number {
  const noiseValue = (noise2D(x * noiseScale, y * noiseScale) + 1) / 2;
  const windValue = windMap[x][y];

  // Warmer areas get more rain, colder areas less rain
  const tempAdjustment = temperature > 0.5 ? temperature * 1.1 : temperature * 0.8;

  // Calculate base rainfall as a combination of wind, noise, and temperature
  return (windValue * 0.7 + noiseValue * 0.3) * tempAdjustment;
}

function adjustForEquator(
  y: number,
  equatorY: number,
  equatorBandWidth: number,
  fullRainfallAmount: number,
  noise2D: (x: number, y: number) => number,
  x: number,
  noiseScale: number
): number {
  const distanceFromEquator = Math.abs(y - equatorY);
  const noiseValue = (noise2D(x * noiseScale, y * noiseScale) + 1) / 2;

  if (distanceFromEquator <= equatorBandWidth) {
    const equatorFactor = 1 - distanceFromEquator / equatorBandWidth;
    return fullRainfallAmount * equatorFactor + noiseValue * 0.5;
  }
  return 0; // No additional rainfall adjustment outside equator band
}
