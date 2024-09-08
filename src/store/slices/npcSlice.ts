import { humans } from '@/data';
import { Character } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Character[] = humans;

interface UpdateHealthPayload {
  id: string;
  newHealth: number;
}

interface UpdateMapPayload {
  id: string;
  newX: number;
  newY: number;
  remainingMoves: number;
}

const npcSlice = createSlice({
  name: 'npc',
  initialState,
  reducers: {
    updateHealth: (state, action: PayloadAction<UpdateHealthPayload>) => {
      const { id, newHealth } = action.payload;
      const npc = state.find((character) => character.id === id);
      if (npc) {
        npc.health.currentHp = newHealth;
      }
    },

    updateMap: (state, action: PayloadAction<UpdateMapPayload>) => {
      const { id, newX, newY, remainingMoves } = action.payload;
      const npc = state.find((character) => character.id === id);
      if (npc && npc.map) {
        npc.map.x = newX;
        npc.map.y = newY;
        npc.map.remainingMoves = remainingMoves;
      }
    },
  },
});

export const { updateHealth, updateMap } = npcSlice.actions;
export default npcSlice.reducer;
