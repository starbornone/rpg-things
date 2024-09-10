export const minerals = {
  'iron ore': {
    conductivity: 1, // low electrical conductivity
    biome: [
      'rainforest',
      'wet-forest',
      'moist-forest',
      'dry-forest',
      'very-dry-forest',
      'thorn-woodland',
      'woodland',
      'steppe',
      'rain-tundra',
      'wet-tundra',
    ],
    hardness: 4, // on Mohs scale
    density: 7.8, // g/cm³
    meltingPoint: 1538, // in Celsius
    extractionMethod: 'smelting',
    abundance: 'common',
    uses: ['tools', 'weapons', 'machinery', 'construction'],
  },
  gold: {
    conductivity: 5, // excellent electrical conductivity
    biome: ['desert', 'mountain', 'wet-forest', 'rainforest'],
    hardness: 2.5, // on Mohs scale
    density: 19.32, // g/cm³
    meltingPoint: 1064, // in Celsius
    extractionMethod: 'mining and refining',
    abundance: 'rare',
    uses: ['jewelry', 'electronics', 'currency', 'decorative items'],
  },
  silver: {
    conductivity: 6, // highest electrical conductivity
    biome: ['mountain', 'desert-scrub', 'wet-forest'],
    hardness: 2.5, // on Mohs scale
    density: 10.49, // g/cm³
    meltingPoint: 961.8, // in Celsius
    extractionMethod: 'mining and smelting',
    abundance: 'uncommon',
    uses: ['jewelry', 'electronics', 'currency', 'photography'],
  },
  copper: {
    conductivity: 4, // good electrical conductivity
    biome: ['mountain', 'desert-scrub', 'thorn-woodland', 'woodland', 'rain-tundra', 'steppe'],
    hardness: 3, // on Mohs scale
    density: 8.96, // g/cm³
    meltingPoint: 1084, // in Celsius
    extractionMethod: 'mining and smelting',
    abundance: 'common',
    uses: ['wiring', 'plumbing', 'electronics', 'machinery'],
  },
  coal: {
    conductivity: 1, // very low electrical conductivity
    biome: ['wet-forest', 'moist-forest', 'very-dry-forest', 'steppe', 'rain-tundra', 'wet-tundra'],
    hardness: 2, // on Mohs scale
    density: 1.1, // g/cm³
    meltingPoint: 'combustible', // doesn’t melt but burns
    extractionMethod: 'mining',
    abundance: 'common',
    uses: ['fuel', 'electricity generation', 'steel production'],
  },
  'bauxite (aluminum ore)': {
    conductivity: 2, // low electrical conductivity
    biome: ['rainforest', 'savannah', 'mountain'],
    hardness: 1 - 3, // on Mohs scale
    density: 2.5, // g/cm³
    meltingPoint: 2072, // in Celsius
    extractionMethod: 'mining and refining',
    abundance: 'common',
    uses: ['aluminum production', 'construction', 'transportation'],
  },
  quartz: {
    conductivity: 1, // low electrical conductivity
    biome: ['desert', 'dry-forest', 'woodland', 'mountain'],
    hardness: 7, // on Mohs scale
    density: 2.65, // g/cm³
    meltingPoint: 1670, // in Celsius
    extractionMethod: 'mining',
    abundance: 'common',
    uses: ['glassmaking', 'electronics', 'optics', 'construction'],
  },
  uranium: {
    conductivity: 1.5, // low electrical conductivity
    biome: ['desert-scrub', 'mountain'],
    hardness: 6, // on Mohs scale
    density: 18.95, // g/cm³
    meltingPoint: 1135, // in Celsius
    extractionMethod: 'mining',
    abundance: 'rare',
    uses: ['nuclear fuel', 'military applications', 'radiation shielding'],
  },
  limestone: {
    conductivity: 1, // low electrical conductivity
    biome: ['wet-forest', 'woodland', 'steppe', 'river', 'lake'],
    hardness: 3, // on Mohs scale
    density: 2.71, // g/cm³
    meltingPoint: 825, // in Celsius (decomposes to lime)
    extractionMethod: 'quarrying',
    abundance: 'common',
    uses: ['construction', 'cement', 'agriculture (soil conditioner)'],
  },
  gypsum: {
    conductivity: 1, // low electrical conductivity
    biome: ['very-dry-forest', 'steppe', 'desert', 'desert-scrub'],
    hardness: 2, // on Mohs scale
    density: 2.32, // g/cm³
    meltingPoint: 145, // in Celsius (dehydrates to form plaster)
    extractionMethod: 'quarrying',
    abundance: 'common',
    uses: ['construction (drywall/plaster)', 'fertilizer', 'cement'],
  },
  salt: {
    conductivity: 3, // moderate electrical conductivity when dissolved
    biome: ['ocean', 'lake', 'desert'],
    hardness: 2.5, // on Mohs scale
    density: 2.17, // g/cm³
    meltingPoint: 801, // in Celsius
    extractionMethod: 'evaporation or mining',
    abundance: 'common',
    uses: ['food preservation', 'chemical production', 'water softening'],
  },
};
