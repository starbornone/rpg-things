import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BattleState {
  isBattleActive: boolean;
  currentTurn: number;
  currentRound: number;
  totalRounds: number;
  activeCombatantId: string | null;
}

const initialState: BattleState = {
  isBattleActive: false,
  currentTurn: 1,
  currentRound: 1,
  totalRounds: 10,
  activeCombatantId: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    startBattle: (state) => {
      state.isBattleActive = true;
      state.currentTurn = 1;
      state.currentRound = 1;
      state.activeCombatantId = null;
    },
    endBattle: (state) => {
      state.isBattleActive = false;
      state.currentTurn = 1;
      state.currentRound = 1;
      state.activeCombatantId = null;
    },
    nextTurn: (state, action: PayloadAction<string>) => {
      state.currentTurn += 1;
      state.activeCombatantId = action.payload;
    },
    nextRound: (state) => {
      state.currentRound += 1;
      state.currentTurn = 1; // Reset the turn count at the start of a new round
    },
    setActiveCombatant: (state, action: PayloadAction<string>) => {
      state.activeCombatantId = action.payload;
    },
  },
});

export const { startBattle, endBattle, nextTurn, nextRound, setActiveCombatant } = battleSlice.actions;

export default battleSlice.reducer;
