import { HeightMap, HumidityMap, LakeMap, RainfallMap, RiverMap, TemperatureMap } from '@/types';

export function addRivers({
  heightMap,
  humidityMap,
  lakes,
  rainfallMap,
  temperatureMap,
  minRiverDistance = 3,
  minRiverLength = 3,
}: {
  heightMap: HeightMap;
  humidityMap: HumidityMap;
  lakes?: LakeMap;
  rainfallMap: RainfallMap;
  temperatureMap: TemperatureMap;
  minRiverDistance?: number;
  minRiverLength?: number;
}): RiverMap {
  const rivers: RiverMap = [];
  for (let x = 0; x < heightMap.length; x++) {
    rivers[x] = [];
    for (let y = 0; y < heightMap[0].length; y++) {
      const height = heightMap[x][y];
      const humidity = humidityMap[x][y];
      const temperature = temperatureMap[x][y];
      const rainfall = rainfallMap[x][y];

      if (
        (lakes && lakes[x][y]) ||
        height >= 0.5 ||
        humidity <= 0.1 ||
        temperature <= 0.05 ||
        rainfall <= 0.2 ||
        isRiverNearby(x, y, rivers, minRiverDistance)
      ) {
        rivers[x][y] = null;
      } else {
        traceRiver(x, y, heightMap, rivers, minRiverLength);
      }
    }
  }
  return rivers;
}

export function traceRiver(x: number, y: number, heightMap: HeightMap, rivers: RiverMap, minRiverLength: number) {
  let currentX = x;
  let currentY = y;
  let riverLength = 0;

  const riverPath: [number, number][] = [];

  if (!rivers[currentX]) {
    rivers[currentX] = [];
  }

  while (true) {
    // Check if the river width is already too wide
    const adjacentRiverTiles = countAdjacentRivers(currentX, currentY, rivers);
    if (adjacentRiverTiles >= 3) {
      break;
    }

    rivers[currentX][currentY] = 'river';
    riverPath.push([currentX, currentY]);
    riverLength++;

    let lowestX = currentX;
    let lowestY = currentY;
    let lowestHeight = heightMap[currentX][currentY];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = currentX + dx;
        const newY = currentY + dy;

        if (newX >= 0 && newY >= 0 && newX < heightMap.length && newY < heightMap[0].length) {
          if (heightMap[newX][newY] < lowestHeight) {
            lowestHeight = heightMap[newX][newY];
            lowestX = newX;
            lowestY = newY;
          }
        }
      }
    }

    // Check if we've reached the lowest point, in which case we stop the river
    if (lowestX === currentX && lowestY === currentY) {
      break; // No more downward flow possible
    }

    // Ensure the next row is initialized before accessing it
    if (!rivers[lowestX]) {
      rivers[lowestX] = [];
    }

    // Move to the next tile
    currentX = lowestX;
    currentY = lowestY;
  }

  if (riverLength <= minRiverLength) {
    removeShortRiver(riverPath, rivers);
  }
}

function removeShortRiver(tilesToRemove: [number, number][], rivers: RiverMap): void {
  while (tilesToRemove.length > 0) {
    const [x, y] = tilesToRemove.pop()!;
    rivers[x][y] = null;
  }
}

function isRiverNearby(x: number, y: number, rivers: RiverMap, minDistance: number): boolean {
  for (let dx = -minDistance; dx <= minDistance; dx++) {
    for (let dy = -minDistance; dy <= minDistance; dy++) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newY >= 0 && newX < rivers.length && newY < rivers[0].length) {
        if (rivers[newX] && rivers[newX][newY] === 'river') {
          return true;
        }
      }
    }
  }
  return false;
}

function countAdjacentRivers(x: number, y: number, rivers: RiverMap): number {
  let count = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newY >= 0 && newX < rivers.length && newY < rivers[0].length) {
        if (rivers[newX] && rivers[newX][newY] === 'river') {
          count++;
        }
      }
    }
  }

  return count;
}
