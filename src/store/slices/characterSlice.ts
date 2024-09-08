import { Attributes, Character, Skills } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Character = {
  id: 'sha001',
  name: 'Sha',
  body: {
    age: 35,
    gender: 'female',
    height: 180,
    species: 'human',
    weight: 65,
  },
  attributes: {
    strength: 3,
    dexterity: 3,
    stamina: 2,
    charisma: 3,
    manipulation: 2,
    composure: 2,
    intelligence: 2,
    wits: 2,
    resolve: 1,
  },
  skills: {
    athletics: 0,
    brawl: 0,
    craft: 0,
    drive: 0,
    firearms: 0,
    melee: 0,
    larceny: 0,
    stealth: 0,
    survival: 0,
    animalKen: 0,
    etiquette: 0,
    insight: 0,
    intimidation: 0,
    leadership: 0,
    performance: 0,
    persuasion: 0,
    streetwise: 0,
    subterfuge: 0,
    academics: 0,
    awareness: 0,
    finance: 0,
    investigation: 0,
    medicine: 0,
    occult: 0,
    politics: 0,
    science: 0,
    technology: 0,
  },
  health: {
    currentHp: 100,
    maxHp: 100,
  },
  lift: 5,
  speed: 5,
  move: 5,
  equippedItems: {},
  heldItems: {},
  carriedItems: [],
};

// Create the character slice
const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // Action to update a specific attribute
    updateAttribute: (state, action: PayloadAction<{ attribute: keyof Attributes; value: number }>) => {
      state.attributes[action.payload.attribute] = action.payload.value;
    },
    // Action to update a specific skill
    updateSkill: (state, action: PayloadAction<{ skill: keyof Skills; value: number }>) => {
      state.skills[action.payload.skill] = action.payload.value;
    },
    // Action to reset the character to initial state
    resetCharacter: () => initialState,
  },
});

// Export the actions
export const { updateAttribute, updateSkill, resetCharacter } = characterSlice.actions;

// Export the reducer to be used in the store
export default characterSlice.reducer;
