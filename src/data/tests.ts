import { TypeAttributes } from '@/types';

export const attackTypeAttributes: TypeAttributes = {
  melee: ['strength', 'melee'],
  firearms: ['dexterity', 'firearms'],
  brawl: ['strength', 'brawl'],
};

export const defenseTypeAttributes: TypeAttributes = {
  dodge: ['dexterity', 'athletics'],
  parry: ['dexterity', 'melee'],
  block: ['strength', 'brawl'],
};
