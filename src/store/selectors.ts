'use client';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const createSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

export const selectAttributes = () => createSelector((state) => state.character.attributes);
export const selectSkills = () => createSelector((state) => state.character.skills);
