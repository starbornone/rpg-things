import { RootState } from '@/store';

export const selectAttributes = (state: RootState) => state.character.attributes;
export const selectSkills = (state: RootState) => state.character.skills;
