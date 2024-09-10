import { HeightMap, TemperatureMap } from '@/types';

export function generateTemperatureMap({
  width,
  height,
  heightMap,
}: {
  width: number;
  height: number;
  heightMap: HeightMap;
}): TemperatureMap {
  const temperatureMap: TemperatureMap = [];

  const equatorY = height / 2;

  const compressPoles = (distance: number): number => {
    return Math.pow(distance, 1.5); // How much the poles are compressed
  };

  for (let x = 0; x < width; x++) {
    temperatureMap[x] = [];
    for (let y = 0; y < height; y++) {
      // Calculate the distance from the equator
      const rawDistanceFromEquator = Math.abs(equatorY - y) / equatorY;

      // Compress the distance to make the poles smaller
      const distanceFromEquator = compressPoles(rawDistanceFromEquator);

      // Calculate base temperature, where poles are cold (-1) and the equator is warm (1)
      let baseTemperature = 1 - distanceFromEquator;

      // Adjust temperature based on height (higher altitude = colder)
      const altitude = heightMap[x][y];
      const altitudeEffect = Math.max(0, 1.3 - altitude * 0.8); // Higher altitudes get colder

      // Final temperature is the base temperature adjusted by altitude
      temperatureMap[x][y] = (baseTemperature) * altitudeEffect;
    }
  }

  return temperatureMap;
}
