import { Biome, Grid } from '@/types';
import { generateMap } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  grid: Grid | null;
  biome: Biome;
}

const initialState: MapState = {
  grid: null,
  biome: 'forest',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Grid>) => {
      state.grid = action.payload;
    },
    setBiome: (state, action: PayloadAction<Biome>) => {
      state.biome = action.payload;
    },
    generateNewMap: (state) => {
      state.grid = generateMap(state.biome);
    },
  },
});

export const { setMap, setBiome, generateNewMap } = mapSlice.actions;

export default mapSlice.reducer;
