import { EquippedItems, HeldItems, Item } from '@/types';

export interface Attributes {
  strength: number;
  dexterity: number;
  stamina: number;
  charisma: number;
  manipulation: number;
  composure: number;
  intelligence: number;
  wits: number;
  resolve: number;
}

export interface Skills {
  athletics: number;
  brawl: number;
  craft: number;
  drive: number;
  firearms: number;
  melee: number;
  larceny: number;
  stealth: number;
  survival: number;
  animalKen: number;
  etiquette: number;
  insight: number;
  intimidation: number;
  leadership: number;
  performance: number;
  persuasion: number;
  streetwise: number;
  subterfuge: number;
  academics: number;
  awareness: number;
  finance: number;
  investigation: number;
  medicine: number;
  occult: number;
  politics: number;
  science: number;
  technology: number;
}

export interface Character {
  id: string;
  name: string;
  body: {
    age: number;
    gender: string;
    height: number;
    species: Species;
    weight: number;
  };
  attributes: Attributes;
  skills: Skills;
  health: {
    currentHp: number;
    maxHp: number;
    statusEffects?: StatusEffect[];
  };
  lift: number;
  speed: number;
  move: number;
  equippedItems?: EquippedItems;
  heldItems?: HeldItems;
  carriedItems?: Item[];
  map?: {
    image: {
      element?: HTMLImageElement;
      loaded: boolean;
      src: string;
    };
    remainingMoves: number;
    x: number;
    y: number;
  };
}

export type Species = 'human';

export interface StatusEffect {
  name: string;
  duration: number;
  severity?: number;
}
