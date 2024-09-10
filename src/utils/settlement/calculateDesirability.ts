export function calculateDesirability({
  isNearWaterTile,
  biome,
  heightValue,
  temperature,
  humidity,
}: {
  isNearWaterTile: boolean;
  biome: string;
  heightValue: number;
  temperature: number;
  humidity: number;
}): number {
  let desirability = 0;
  if (isNearWaterTile) {
    desirability += 0.4;
  }

  // Biome type impact
  const desirableBiomes = ['plains', 'woodland', 'dry-forest', 'moist-forest', 'wet-forest'];

  if (desirableBiomes.includes(biome)) {
    desirability += 0.3;
  }

  // Elevation desirability (best between 0.2 and 0.7)
  const elevationFactor = 1 - Math.abs(heightValue - 0.45);
  desirability += elevationFactor * 0.2;

  // Temperature desirability (best between 0.3 and 0.7)
  const temperatureFactor = 1 - Math.abs(temperature - 0.5);
  desirability += temperatureFactor * 0.2;

  // Humidity desirability (best between 0.3 and 0.6)
  if (humidity > 0.3 && humidity < 0.6) {
    desirability += 0.2;
  }

  return Math.min(Math.max(desirability, 0), 1);
}
