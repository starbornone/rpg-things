import { HeightMap, HumidityMap, LakeMap, RainfallMap, RiverMap, TemperatureMap } from '@/types';

export function addLakes(
  {
    heightMap,
    humidityMap,
    rainfallMap,
    rivers,
    temperatureMap,
  }: {
    heightMap: HeightMap;
    humidityMap: HumidityMap;
    rainfallMap: RainfallMap;
    rivers?: RiverMap;
    temperatureMap: TemperatureMap;
  },
  lakeThreshold: number = 0.4,
  lakeSizeThreshold: number = 2,
  humidityThreshold: number = 0.1,
  temperatureThreshold: number = 0.2
): LakeMap {
  const lakes: LakeMap = [];

  // Initialize lake map with null values
  for (let x = 0; x < heightMap.length; x++) {
    lakes[x] = [];
    for (let y = 0; y < heightMap[0].length; y++) {
      lakes[x][y] = null;
    }
  }

  // Iterate through the height map, avoiding borders
  for (let x = 1; x < heightMap.length - 1; x++) {
    for (let y = 1; y < heightMap[0].length - 1; y++) {
      const height = heightMap[x][y];
      const humidity = humidityMap[x][y];
      const temperature = temperatureMap[x][y];
      const rainfall = rainfallMap[x][y];

      if (rivers && rivers[x][y]) {
        lakes[x][y] = null; // No lake if there's a river
      }

      // Lake can form if it's below the height threshold, not a river, has sufficient humidity, temperature, and rainfall
      else if (
        height < lakeThreshold &&
        humidity > humidityThreshold &&
        temperature > temperatureThreshold &&
        rainfall > 0.2 // Minimum rainfall required for lake formation
      ) {
        if (isLocalMinimum(x, y, heightMap)) {
          const lakeTiles = floodFillLake(x, y, heightMap, lakes, lakeThreshold);

          if (lakeTiles.length >= lakeSizeThreshold) {
            lakeTiles.forEach(([lx, ly]) => {
              lakes[lx][ly] = 'lake'; // Mark these tiles as lake
            });
          }
        }
      }
    }
  }

  return lakes;
}

export function isLocalMinimum(x: number, y: number, heightMap: HeightMap): boolean {
  const currentHeight = heightMap[x][y];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      if (heightMap[x + dx][y + dy] < currentHeight) {
        return false;
      }
    }
  }
  return true;
}

export function floodFillLake(
  x: number,
  y: number,
  heightMap: HeightMap,
  lakes: LakeMap,
  lakeThreshold: number
): [number, number][] {
  const lakeTiles: [number, number][] = [];
  const stack: [number, number][] = [[x, y]];

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;

    if (cx < 0 || cx >= heightMap.length || cy < 0 || cy >= heightMap[0].length) continue;
    if (lakes[cx][cy] || heightMap[cx][cy] > lakeThreshold) continue;

    lakeTiles.push([cx, cy]);
    lakes[cx][cy] = 'lake';

    stack.push([cx - 1, cy]);
    stack.push([cx + 1, cy]);
    stack.push([cx, cy - 1]);
    stack.push([cx, cy + 1]);
  }

  return lakeTiles;
}
