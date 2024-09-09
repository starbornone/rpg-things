import { templateHuman } from '@/data';
import { Attributes, Character, Item, Skills, Slots, WearableItem } from '@/types';
import {
  calculateCarryWeight,
  calculateCurrentLoad,
  calculateLift,
  calculateMaxHp,
  calculateMove,
  calculateSpeed,
  equipWearableItem,
  updateNestedProperty,
} from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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

const characterSlice = createSlice({
  name: 'character',
  initialState: templateHuman,
  reducers: {
    // Character-level actions
    characterCreate: (state, action: PayloadAction<Character>) => {
      return action.payload;
    },
    characterUpdate: (state, action: PayloadAction<{ path: string; value: any }>) => {
      updateNestedProperty(state, action.payload.path, action.payload.value);
    },
    characterReset: () => templateHuman,

    // Attribute actions
    characterAttributesUpdate: (state, action: PayloadAction<{ attribute: keyof Attributes; value: number }>) => {
      state.attributes[action.payload.attribute] = action.payload.value;
      recalculateDerivedValues(state);
    },

    // Skill actions
    characterSkillsUpdate: (state, action: PayloadAction<{ skill: keyof Skills; value: number }>) => {
      state.skills[action.payload.skill] = action.payload.value;
    },

    // Equipped items actions
    characterEquippedItemsAdd: (state, action: PayloadAction<{ item: WearableItem; options?: any }>) => {
      const newItem = { ...action.payload.item, id: uuidv4() };
      equipWearableItem(state.equippedItems, newItem, action.payload.options);
      calculateCurrentLoad(state);
    },
    characterEquippedItemsRemove: (state, action: PayloadAction<{ item: WearableItem; slot: Slots }>) => {
      const { item, slot } = action.payload;
      state.equippedItems[slot] =
        state.equippedItems[slot]?.filter((equippedItem) => equippedItem.id !== item.id) || [];
      state.carriedItems.push(item);
      calculateCurrentLoad(state);
    },

    // Carried items actions
    characterCarriedItemsAdd: (state, action: PayloadAction<Item[]>) => {
      const itemsWithUniqueIds = action.payload.map((item) => ({ ...item, id: uuidv4() }));
      state.carriedItems.push(...itemsWithUniqueIds);
      calculateCurrentLoad(state);
    },
    characterCarriedItemsRemove: (state, action: PayloadAction<string>) => {
      state.carriedItems = state.carriedItems.filter((item) => item.id !== action.payload);
      calculateCurrentLoad(state);
    },
  },
});

export const {
  characterCreate,
  characterUpdate,
  characterAttributesUpdate,
  characterSkillsUpdate,
  characterEquippedItemsAdd,
  characterCarriedItemsAdd,
  characterCarriedItemsRemove,
  characterEquippedItemsRemove,
  characterReset,
} = characterSlice.actions;

export default characterSlice.reducer;
