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

export interface CharacterState {
  attributes: Attributes;
  skills: Skills;
}
