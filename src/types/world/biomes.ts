export type altitudinalBelts = 'premontane' | 'lower montane' | 'montane' | 'subalpine' | 'alpine' | 'alvar';

export type humidityProvinces =
  | 'super-arid'
  | 'per-arid'
  | 'arid'
  | 'semi-arid'
  | 'sub-humid'
  | 'humid'
  | 'per-humid'
  | 'super-humid';

export type latitudinalRegions =
  | 'tropical'
  | 'subtropical'
  | 'warm temperate'
  | 'cool temperate'
  | 'boreal'
  | 'subpolar'
  | 'polar';

export type BiomeDetails = {
  altitudinalBelts: [altitudinalBelts, altitudinalBelts];
  annualPrecipitation: [number, number]; // Range in mm
  potentialEvapotranspiration: [number, number]; // Range in mm
  humidityProvinces: humidityProvinces;
  latitudinalRegions: [latitudinalRegions, latitudinalRegions];
  bioTemperature: [number, number]; // Range in °C
};

export type BiomeTypes =
  | 'rainforest'
  | 'wet-forest'
  | 'moist-forest'
  | 'dry-forest'
  | 'very-dry-forest'
  | 'thorn-woodland'
  | 'desert-scrub'
  | 'desert'
  // TODO: Add dry-scrub
  | 'dry-scrub'
  | 'woodland'
  | 'steppe'
  | 'rain-tundra'
  | 'wet-tundra'
  | 'moist-tundra'
  | 'dry-tundra'
  | 'polar'
  | 'lake'
  | 'river'
  | 'ocean'
  | 'mountain';
