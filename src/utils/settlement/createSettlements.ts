import {
  HeightMap,
  HumidityMap,
  LakeMap,
  RainfallMap,
  RiverMap,
  Settlement,
  TemperatureMap,
  TerrainMap,
} from '@/types';
import {
  calculateManhattanDistance,
  determineSettlements,
  generatePopulation,
  generateResources,
  pickRandomCityName,
} from '@/utils';

export function createSettlements({
  heightMap,
  rivers,
  lakes,
  biomes,
  temperatureMap,
  humidityMap,
  rainfallMap,
}: {
  heightMap: HeightMap;
  rivers: RiverMap;
  lakes: LakeMap;
  biomes: TerrainMap;
  temperatureMap: TemperatureMap;
  humidityMap: HumidityMap;
  rainfallMap: RainfallMap;
}): Settlement[] {
  const possibleSettlements = determineSettlements({
    heightMap,
    rivers,
    lakes,
    biomes,
    temperatureMap,
    humidityMap,
    rainfallMap,
  });

  const settlements: Settlement[] = [];
  const minDistance = 50;

  for (const settlement of possibleSettlements) {
    const biome = biomes[settlement.x][settlement.y];
    let isTooClose = false;

    // Check against all previously added settlements to ensure no two are too close
    for (const existingSettlement of settlements) {
      let distance = calculateManhattanDistance(
        settlement.x,
        settlement.y,
        existingSettlement.position.x,
        existingSettlement.position.y
      );

      switch (biome) {
        case 'moist-forest':
        case 'rainforest':
        case 'wet-forest':
          distance = distance * 3;
          break;
        case 'dry-forest':
        case 'very-dry-forest':
          distance = distance * 1.8;
          break;
        case 'desert-scrub':
        case 'dry-tundra':
        case 'moist-tundra':
        case 'rain-tundra':
        case 'steppe':
        case 'wet-tundra':
          distance = distance * 0.5;
          break;
      }

      if (distance < minDistance) {
        isTooClose = true;
        break;
      }
    }

    // If not too close, create the settlement
    if (!isTooClose) {
      const population = generatePopulation(biome);
      const resources = generateResources(biome, biomes, settlement.x, settlement.y);

      settlements.push({
        name: pickRandomCityName(),
        position: { x: settlement.x, y: settlement.y },
        population,
        resources,
        defense: {
          defenseLevel: Math.random() * 100,
          militaryStrength: Math.random() * 100,
          watchmen: Math.floor(Math.random() * 10),
          fortifications: Math.floor(Math.random() * 5),
        },
        morale: {
          publicOpinion: Math.random() * 100,
          crimeRate: Math.random() * 10,
          corruptionLevel: Math.random() * 5,
        },
        health: {
          healthcareLevel: Math.random() * 100,
          plagueRisk: Math.random() * 5,
          cleanliness: Math.random() * 100,
        },
        infrastructure: {
          housingCapacity: Math.random() * 100,
          buildingCapacity: Math.random() * 50,
          roadQuality: Math.random() * 100,
          markets: Math.floor(Math.random() * 10),
        },
        politics: {
          leadership: 'Mayor',
          laws: {
            taxation: Math.random() * 10,
            trade: Math.random() > 0.5,
          },
          rebellionRisk: Math.random() * 10,
        },
        religion: {
          faithLevel: Math.random() * 100,
          temples: Math.floor(Math.random() * 5),
        },
        diplomacy: {
          tradePartners: [],
          diplomaticRelations: {},
          tradeAgreements: {},
        },
      });
    }
  }

  return settlements;
}
