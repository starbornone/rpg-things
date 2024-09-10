/**
 * Draw a temperature overlay on the map.
 * @param ctx - The canvas context to draw on.
 * @param temperatureMap - The 2D array of temperature values (0 to 1).
 * @param width - The width of the map.
 * @param height - The height of the map.
 * @param tileSize - The size of each tile in pixels.
 */
export function drawTemperatureOverlay(
  ctx: CanvasRenderingContext2D,
  temperatureMap: number[][],
  width: number,
  height: number,
  tileSize: number
) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const temperature = temperatureMap[x][y];

      // Create a gradient from blue (cold) to red (hot)
      const color = temperatureToColor(temperature);
      ctx.fillStyle = color;

      // Draw the overlay
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

/**
 * Convert a temperature value (0 to 1) into a color from blue (cold) to red (hot).
 * @param temperature - The temperature value (0 is cold, 1 is hot).
 * @returns A hex color string.
 */
function temperatureToColor(temperature: number): string {
  // Blue for cold (0) to red for hot (1)
  const r = Math.floor(255 * temperature); // Red increases with temperature
  const g = Math.floor(255 * (1 - Math.abs(temperature - 0.5) * 2)); // Green is lower at extremes, higher in the middle
  const b = Math.floor(255 * (1 - temperature)); // Blue decreases with temperature

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
