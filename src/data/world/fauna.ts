export const fauna = {
  boar: {
    diet: 'omnivore',
    biome: ['moist-forest', 'dry-forest', 'very-dry-forest'],
    weight: [50, 200],
    height: [0.5, 1.2],
    lifespan: [8, 12],
    speed: [40, 50],
    behavior: ['social'],
    socialStructure: {
      format: 'group',
      number: [10, 30],
    },
    reproduction: {
      matingSeason: 'year-round',
      gestationPeriod: 17, // in weeks
      offspring: [4, 6],
    },
    domestication: 'true',
    resources: ['meat', 'leather', 'tusks'],
    threats: ['wolves', 'bears', 'humans'],
  },
  deer: {
    diet: 'herbivore',
    biome: ['rainforest', 'wet-forest', 'moist-forest', 'woodland'],
    weight: [50, 300], // in kg
    height: [1, 2], // in meters
    lifespan: [10, 20], // in years
    speed: [35, 50], // in km/h
    behavior: ['shy', 'social'],
    socialStructure: {
      format: 'group',
      number: [5, 30],
    },
    reproduction: {
      matingSeason: 'autumn',
      gestationPeriod: 26, // in weeks
      offspring: [1, 2],
    },
    domestication: 'false',
    resources: ['meat', 'antlers', 'bones', 'fur', 'leather'],
    threats: ['wolves', 'bears', 'humans'],
  },
  jaguar: {
    diet: 'carnivore',
    biome: ['rainforest'],
    weight: [45, 100],
    height: [0.6, 0.8],
    lifespan: [12, 15],
    speed: [80, 90],
    behavior: ['territorial'],
    socialStructure: {
      format: 'solitary',
      number: [1],
    },
    reproduction: {
      matingSeason: 'year-round',
      gestationPeriod: 14, // in weeks
      offspring: [1, 4],
    },
    domestication: 'false',
    resources: ['fur', 'bones'],
    threats: ['humans'],
  },
  monkey: {
    diet: 'omnivore',
    biome: ['rainforest'],
    weight: [5, 40],
    height: [0.3, 1],
    lifespan: [15, 30],
    speed: [35, 55],
    behavior: ['social'],
    socialStructure: {
      format: 'group',
      number: [5, 50],
    },
    reproduction: {
      matingSeason: 'year-round',
      gestationPeriod: 20, // in weeks
      offspring: [1],
    },
    domestication: 'partial',
    resources: ['none'],
    threats: ['big cats', 'humans', 'birds of prey'],
  },
  snake: {
    diet: 'carnivore',
    biome: ['desert-scrub', 'rainforest', 'wet-forest'],
    weight: [0.1, 200], // varies by species
    height: [0.5, 10], // length in meters
    lifespan: [5, 30],
    speed: [5, 15], // for ground movement
    behavior: ['ambush', 'stealth'],
    socialStructure: {
      format: 'solitary',
      number: [1],
    },
    reproduction: {
      matingSeason: 'spring',
      gestationPeriod: 6, // in weeks
      offspring: [10, 100], // eggs laid in clutches
    },
    domestication: 'false',
    resources: ['venom', 'skin', 'bones'],
    threats: ['humans', 'large birds'],
  },
  wolf: {
    diet: 'carnivore',
    biome: ['moist-forest', 'wet-forest', 'steppe', 'rain-tundra'],
    weight: [30, 70],
    height: [0.8, 1.1],
    lifespan: [6, 12],
    speed: [50, 60],
    behavior: ['pack hunter', 'social'],
    socialStructure: {
      format: 'group',
      number: [5, 15],
    },
    reproduction: {
      matingSeason: 'winter',
      gestationPeriod: 9, // in weeks
      offspring: [4, 6],
    },
    domestication: 'false',
    resources: ['fur', 'bones', 'meat'],
    threats: ['bears', 'humans'],
  },
  'polar bear': {
    diet: 'carnivore',
    biome: ['wet-tundra', 'polar'],
    weight: [300, 700],
    height: [1.5, 2],
    lifespan: [15, 20],
    speed: [40, 60],
    behavior: ['territorial'],
    socialStructure: {
      format: 'solitary',
      number: [1, 1],
    },
    reproduction: {
      matingSeason: 'spring',
      gestationPeriod: 8, // in weeks
      offspring: [1, 2],
    },
    domestication: 'false',
    resources: ['fur', 'meat', 'fat'],
    threats: ['humans', 'climate change'],
  },
  fox: {
    diet: 'omnivore',
    biome: ['moist-forest', 'woodland', 'steppe', 'tundra'],
    weight: [4, 14],
    height: [0.3, 0.5],
    lifespan: [2, 8],
    speed: [40, 60],
    behavior: ['shy'],
    socialStructure: {
      format: 'group',
      number: [4, 6],
    },
    reproduction: {
      matingSeason: 'winter',
      gestationPeriod: 9, // in weeks
      offspring: [3, 6],
    },
    domestication: 'partial',
    resources: ['fur', 'meat'],
    threats: ['wolves', 'bears', 'humans'],
  },
  camel: {
    diet: 'herbivore',
    biome: ['desert'],
    weight: [400, 600],
    height: [1.7, 2.3],
    lifespan: [40, 50],
    speed: [40, 65],
    behavior: ['social'],
    socialStructure: {
      format: 'group',
      number: [10, 30],
    },
    reproduction: {
      matingSeason: 'winter',
      gestationPeriod: 13, // in months
      offspring: [1],
    },
    domestication: 'true',
    resources: ['milk', 'leather', 'meat', 'wool'],
    threats: ['humans', 'desert predators'],
  },
  eagle: {
    diet: 'carnivore',
    biome: ['mountain', 'woodland', 'steppe'],
    weight: [3, 6],
    height: [0.7, 1], // wingspan can be up to 2.5 meters
    lifespan: [15, 25],
    speed: [120, 160], // dive speed
    behavior: [],
    socialStructure: {
      format: 'solitary',
      number: [1, 2], // pair when mating
    },
    reproduction: {
      matingSeason: 'spring',
      gestationPeriod: 12, // in weeks (egg incubation)
      offspring: [1, 3],
    },
    domestication: 'partial',
    resources: ['feathers'],
    threats: ['humans', 'habitat loss'],
  },
  fish: {
    diet: 'omnivore',
    biome: ['lake', 'river', 'ocean'],
    weight: [0.1, 200], // highly variable
    height: [0.05, 3], // length in meters
    lifespan: [1, 50], // highly variable by species
    speed: [10, 60], // depending on species
    behavior: [],
    socialStructure: {
      format: 'group',
      number: [50, 1000],
    },
    reproduction: {
      matingSeason: 'seasonal or year-round',
      gestationPeriod: 4, // in weeks
      offspring: [100, 1000], // varies significantly by species
    },
    domestication: 'false',
    resources: ['meat', 'oil', 'bones'],
    threats: ['larger fish', 'humans', 'pollution'],
  },
};
