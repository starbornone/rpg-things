import { LakeMap, RiverMap } from '@/types';

export function isNearWater({
  x,
  y,
  lakes,
  rivers,
  range = 1,
}: {
  x: number;
  y: number;
  lakes: LakeMap;
  rivers: RiverMap;
  range?: number;
}): boolean {
  const width = lakes.length;
  const height = lakes[0].length;

  // Loop through surrounding tiles within the given range
  for (let dx = -range; dx <= range; dx++) {
    for (let dy = -range; dy <= range; dy++) {
      const nx = x + dx;
      const ny = y + dy;

      // Ensure we're within map bounds
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        if (lakes[nx][ny] === 'lake' || rivers[nx][ny] === 'river') {
          return true;
        }
      }
    }
  }

  return false;
}
