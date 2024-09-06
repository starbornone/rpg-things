import { Attributes } from '@/types';

export const attributeNames: { key: keyof Attributes; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'stamina', label: 'Stamina' },
  { key: 'charisma', label: 'Charisma' },
  { key: 'manipulation', label: 'Manipulation' },
  { key: 'composure', label: 'Composure' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'wits', label: 'Wits' },
  { key: 'resolve', label: 'Resolve' },
];
