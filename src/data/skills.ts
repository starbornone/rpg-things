export interface Skills {
  [key: string]: number;
}

export const skillNames: { key: keyof Skills; label: string }[] = [
  // Physical Skills
  { key: 'athletics', label: 'Athletics' },
  { key: 'brawl', label: 'Brawl' },
  { key: 'craft', label: 'Craft' },
  { key: 'drive', label: 'Drive' },
  { key: 'firearms', label: 'Firearms' },
  { key: 'melee', label: 'Melee' },
  { key: 'larceny', label: 'Larceny' },
  { key: 'stealth', label: 'Stealth' },
  { key: 'survival', label: 'Survival' },

  // Social Skills
  { key: 'animalKen', label: 'Animal Ken' },
  { key: 'etiquette', label: 'Etiquette' },
  { key: 'insight', label: 'Insight' },
  { key: 'intimidation', label: 'Intimidation' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'performance', label: 'Performance' },
  { key: 'persuasion', label: 'Persuasion' },
  { key: 'streetwise', label: 'Streetwise' },
  { key: 'subterfuge', label: 'Subterfuge' },

  // Mental Skills
  { key: 'academics', label: 'Academics' },
  { key: 'awareness', label: 'Awareness' },
  { key: 'finance', label: 'Finance' },
  { key: 'investigation', label: 'Investigation' },
  { key: 'medicine', label: 'Medicine' },
  { key: 'occult', label: 'Occult' },
  { key: 'politics', label: 'Politics' },
  { key: 'science', label: 'Science' },
  { key: 'technology', label: 'Technology' },
];
