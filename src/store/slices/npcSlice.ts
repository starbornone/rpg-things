import { humans } from '@/data';
import { Character } from '@/types';
import {
  calculateCarryWeight,
  calculateCurrentLoad,
  calculateLift,
  calculateMaxHp,
  calculateMove,
  calculateSpeed,
} from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const recalculateDerivedValues = (state: Character) => {
  const { strength, stamina, dexterity, wits, resolve } = state.attributes;

  state.carryWeight = calculateCarryWeight(strength, stamina);
  state.lift = calculateLift(strength, stamina);
  state.move = calculateMove(dexterity, strength);
  state.speed = calculateSpeed(dexterity, wits);
  const maxHP = calculateMaxHp(stamina, resolve);
  state.health.currentHp = maxHP;
  state.health.maxHp = maxHP;
  calculateCurrentLoad(state);
};

const initialState: Character[] = humans.map((human) => {
  const newHuman = { ...human };
  recalculateDerivedValues(newHuman);
  return newHuman;
});

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
