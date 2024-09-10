import { RootState } from '@/store';

export const selectCharacter = (state: RootState) => state.character;
export const selectAttributes = (state: RootState) => state.character.attributes;
export const selectSkills = (state: RootState) => state.character.skills;

export const selectBiomes = (state: RootState) => state.world.biomes;
export const selectHeightMap = (state: RootState) => state.world.heightMap;
export const selectIsWorldGenerated = (state: RootState) => state.world.generated;
export const selectLakes = (state: RootState) => state.world.lakes;
export const selectMapType = (state: RootState) => state.world.mapType;
export const selectRainfallMap = (state: RootState) => state.world.rainfallMap;
export const selectRivers = (state: RootState) => state.world.rivers;
export const selectTemperature = (state: RootState) => state.world.temperatureMap;
export const selectWorld = (state: RootState) => state.world;

export const selectSettlements = (state: RootState) => state.world.settlements;
