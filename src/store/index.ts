import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import characterReducer from './slices/characterSlice';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    character: characterReducer,
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
