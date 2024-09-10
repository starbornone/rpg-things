export interface SettlementMap {
  x: number;
  y: number;
  desirability: number;
}

export interface Settlement {
  name: string;
  position: { x: number; y: number };
  population: {
    total: number;
    working: number;
    unemployed: number;
  };
  resources: {
    flora: string[];
    fauna: string[];
    minerals: string[];
  };
  production?: {
    foodRate: number;
    resourceRates: {
      wood: number;
      stone: number;
      metal: number;
    };
    goldRate: number;
    tradeVolume: number;
  };
  defense: {
    defenseLevel: number;
    militaryStrength: number;
    watchmen: number;
    fortifications: number;
  };
  morale: {
    publicOpinion: number;
    crimeRate: number;
    corruptionLevel: number;
  };
  health: {
    healthcareLevel: number;
    plagueRisk: number;
    cleanliness: number;
  };
  infrastructure: {
    housingCapacity: number;
    buildingCapacity: number;
    roadQuality: number;
    markets: number;
  };
  politics: {
    leadership: string;
    laws: Record<string, boolean | number>;
    rebellionRisk: number;
  };
  religion: {
    faithLevel: number;
    temples: number;
  };
  diplomacy: {
    tradePartners: string[];
    diplomaticRelations: Record<string, number>;
    tradeAgreements: Record<string, number>;
  };
}
