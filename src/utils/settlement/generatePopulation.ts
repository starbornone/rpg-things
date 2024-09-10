export function generatePopulation(biome: string): { total: number; working: number; unemployed: number } {
  const basePopulation = 100;
  let populationMultiplier = 1;

  switch (biome) {
    case 'rainforest':
    case 'wet-forest':
    case 'moist-forest':
      populationMultiplier = 1.5;
      break;
    case 'dry-forest':
    case 'very-dry-forest':
      populationMultiplier = 1.2;
      break;
    case 'steppe':
    case 'thorn-woodland':
      populationMultiplier = 0.8;
      break;
    case 'dry-scrub':
      populationMultiplier = 0.5;
      break;
  }

  const total = Math.floor(basePopulation * populationMultiplier * (1 + Math.random() * 0.5));
  const working = Math.floor(total * 0.6);
  const unemployed = total - working;

  return { total, working, unemployed };
}
