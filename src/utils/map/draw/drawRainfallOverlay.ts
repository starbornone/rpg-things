import { RainfallMap } from '@/types';

export function drawRainfallOverlay(
  ctx: CanvasRenderingContext2D,
  rainfall: RainfallMap,
  width: number,
  height: number,
  tileSize: number
) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const rainIntensity = rainfall[x][y];
      const blueValue = Math.floor(rainIntensity * 255);
      const color = `rgba(0, 0, ${blueValue}, 1)`;
      ctx.fillStyle = color;
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}
