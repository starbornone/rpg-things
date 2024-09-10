import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import battleReducer from './slices/battleSlice';
import characterReducer from './slices/characterSlice';
import mapReducer from './slices/mapSlice';
import npcReducer from './slices/npcSlice';
import worldReducer from './slices/worldSlice';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    character: characterReducer,
    map: mapReducer,
    npc: npcReducer,
    world: worldReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    character: store.getState().character,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
