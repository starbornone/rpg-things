import { Character } from '@/types';

export const calculateCurrentLoad = (character: Character) => {
  const equippedWeight = Object.values(character.equippedItems)
    .flat()
    .reduce((total, item) => total + (item.weight || 0), 0);

  const carriedWeight = character.carriedItems.reduce((total, item) => total + (item.weight || 0), 0);

  character.currentLoad = equippedWeight + carriedWeight;
};
