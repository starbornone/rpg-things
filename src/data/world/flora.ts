export const flora = {
  bamboo: {
    biome: ['rainforest', 'wet-forest'],
    growthRate: 'fast',
    hardness: 3,
    height: [2, 30], // in meters
    weight: [0.5, 1], // in kg
    uses: ['construction', 'food', 'medicine', 'textile production'],
    growthConditions: {
      sunlight: 'partial shade',
      soilType: ['loamy', 'well-drained'],
      moisture: 'high', // high moisture requirement
    },
    reproduction: 'rhizome', // spreads via underground stems
    seasonalBehavior: 'evergreen', // stays green year-round
    ecologicalRole: ['erosion control', 'shelter', 'food source'],
  },
  oak: {
    biome: ['wet-forest', 'woodland'],
    growthRate: 'slow',
    hardness: 8,
    height: [15, 30], // in meters
    weight: [500, 1000], // in kg
    uses: ['furniture', 'construction', 'barrels'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: ['clay', 'loamy', 'well-drained'],
      moisture: 'moderate',
    },
    reproduction: 'acorns', // seed-based reproduction
    seasonalBehavior: 'deciduous', // sheds leaves in autumn
    ecologicalRole: ['habitat for wildlife', 'carbon storage'],
  },
  pine: {
    biome: ['wet-forest', 'mountain'],
    growthRate: 'moderate',
    hardness: 4,
    height: [20, 80], // in meters
    weight: [300, 700], // in kg
    uses: ['construction', 'paper', 'resin production'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: ['sandy', 'acidic'],
      moisture: 'low to moderate',
    },
    reproduction: 'seeds in cones',
    seasonalBehavior: 'evergreen',
    ecologicalRole: ['soil stabilization', 'habitat for birds and mammals'],
  },
  mahogany: {
    biome: ['rainforest'],
    growthRate: 'slow',
    hardness: 6,
    height: [30, 45], // in meters
    weight: [600, 900], // in kg
    uses: ['furniture', 'musical instruments', 'luxury wood items'],
    growthConditions: {
      sunlight: 'partial shade',
      soilType: ['clay', 'well-drained'],
      moisture: 'high',
    },
    reproduction: 'seeds in capsules',
    seasonalBehavior: 'evergreen',
    ecologicalRole: ['habitat for wildlife', 'carbon sequestration'],
  },
  cactus: {
    biome: ['desert', 'desert-scrub'],
    growthRate: 'slow',
    hardness: 5,
    height: [0.5, 20], // in meters
    weight: [1, 200], // in kg
    uses: ['food', 'medicine', 'water storage'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: ['sandy', 'well-drained'],
      moisture: 'low', // drought-tolerant
    },
    reproduction: 'seeds and cuttings',
    seasonalBehavior: 'evergreen',
    ecologicalRole: ['water retention', 'soil stabilization'],
  },
  reed: {
    biome: ['lake', 'river'],
    growthRate: 'fast',
    hardness: 2,
    height: [1, 3], // in meters
    weight: [0.1, 0.5], // in kg
    uses: ['thatching', 'weaving', 'water filtration'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: ['clay', 'loamy', 'wetland'],
      moisture: 'high', // thrives in wet conditions
    },
    reproduction: 'rhizomes and seeds',
    seasonalBehavior: 'perennial', // grows back yearly
    ecologicalRole: ['water filtration', 'habitat for aquatic life'],
  },
  algae: {
    biome: ['lake', 'river', 'ocean'],
    growthRate: 'fast',
    hardness: 1,
    height: [0.01, 3], // in meters
    weight: [0.001, 2], // in kg
    uses: ['biofuel', 'food', 'medicine', 'water filtration'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: 'aquatic',
      moisture: 'high', // thrives in water
    },
    reproduction: 'spores',
    seasonalBehavior: 'evergreen',
    ecologicalRole: ['oxygen production', 'carbon absorption', 'food source for aquatic life'],
  },
  kelp: {
    biome: ['ocean'],
    growthRate: 'fast',
    hardness: 2,
    height: [10, 30], // in meters
    weight: [10, 40], // in kg
    uses: ['food', 'biofuel', 'fertilizer'],
    growthConditions: {
      sunlight: 'partial sunlight',
      soilType: 'aquatic',
      moisture: 'submerged in saltwater',
    },
    reproduction: 'spores',
    seasonalBehavior: 'perennial',
    ecologicalRole: ['habitat for marine life', 'carbon sink'],
  },
  fern: {
    biome: ['wet-forest', 'rainforest'],
    growthRate: 'moderate',
    hardness: 2,
    height: [0.3, 2], // in meters
    weight: [0.1, 2], // in kg
    uses: ['ornamental', 'medicine'],
    growthConditions: {
      sunlight: 'partial shade',
      soilType: ['loamy', 'well-drained'],
      moisture: 'high',
    },
    reproduction: 'spores',
    seasonalBehavior: 'perennial',
    ecologicalRole: ['ground cover', 'prevents erosion', 'habitat for small insects'],
  },
  wildflowers: {
    biome: ['steppe', 'thorn-woodland', 'desert-scrub'],
    growthRate: 'fast',
    hardness: 1,
    height: [0.1, 0.5], // in meters
    weight: [0.01, 0.1], // in kg
    uses: ['ornamental', 'medicine', 'pollinator support'],
    growthConditions: {
      sunlight: 'full sun',
      soilType: ['sandy', 'rocky'],
      moisture: 'low',
    },
    reproduction: 'seeds',
    seasonalBehavior: 'annual',
    ecologicalRole: ['supports pollinators', 'prevents soil erosion'],
  },
};
