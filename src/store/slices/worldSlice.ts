import {
  HeightMap,
  HumidityMap,
  LakeMap,
  MapType,
  RainfallMap,
  RiverMap,
  Settlement,
  TemperatureMap,
  TerrainMap,
  WindMap,
} from '@/types';
import {
  addLakes,
  addMountains,
  addRivers,
  applyHeightVariation,
  calculateRainfall,
  createSettlements,
  determineBiomes,
  generateHumidityMap,
  generateLandmass,
  generateTemperatureMap,
  generateWindMap,
} from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapType: 'pangea' as MapType,
  heightMap: null as HeightMap | null,
  temperatureMap: null as TemperatureMap | null,
  windMap: null as WindMap | null,
  rainfallMap: null as RainfallMap | null,
  humidityMap: null as HumidityMap | null,
  biomes: null as TerrainMap | null,
  rivers: null as RiverMap | null,
  lakes: null as LakeMap | null,
  settlements: null as Settlement[] | null,
  generated: false,
};

const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    setMapType: (state, action) => {
      state.mapType = action.payload;
    },
    generateWorld: (state) => {
      const width = 300;
      const height = 300;

      const landmassMap = generateLandmass(width, height, state.mapType as MapType);
      let heightMap = applyHeightVariation(landmassMap);
      heightMap = addMountains(heightMap);

      const temperatureMap = generateTemperatureMap({ width, height, heightMap });
      const windMap = generateWindMap({ width, height, heightMap, temperatureMap });
      const rainfallMap = calculateRainfall({ heightMap, temperatureMap, windMap });
      const humidityMap = generateHumidityMap({ heightMap, rainfallMap, temperatureMap, windMap });

      const lakes = addLakes({ heightMap, humidityMap, rainfallMap, temperatureMap });
      const rivers = addRivers({ heightMap, humidityMap, rainfallMap, temperatureMap, lakes });

      const biomes = determineBiomes({ heightMap, rivers, lakes, rainfallMap, temperatureMap, windMap });

      const settlements = createSettlements({
        heightMap,
        rivers,
        lakes,
        biomes,
        temperatureMap,
        humidityMap,
        rainfallMap,
      });

      state.heightMap = heightMap;
      state.temperatureMap = temperatureMap;
      state.windMap = windMap;
      state.rainfallMap = rainfallMap;
      state.humidityMap = humidityMap;
      state.biomes = biomes;
      state.rivers = rivers;
      state.lakes = lakes;
      state.settlements = settlements; // Store the settlements
      state.generated = true;
    },
  },
});

export const { setMapType, generateWorld } = worldSlice.actions;
export default worldSlice.reducer;
