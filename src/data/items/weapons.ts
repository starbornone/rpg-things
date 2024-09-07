import { Ammunition, WeaponItem } from '@/types';

export const axe: WeaponItem = {
  id: 'axe001',
  name: 'Hand Axe',
  weight: 2,
  attacks: [
    {
      id: 'axe001swing',
      name: 'Swing',
      type: 'swing',
      damageModifier: 2,
      damageType: 'cut',
      reach: 1,
    },
    {
      id: 'axe001thrust',
      name: 'Thrust',
      type: 'thrust',
      damageModifier: 1,
      damageType: 'impale',
      reach: 1,
    },
  ],
  strengthRequirement: 10,
  parry: 0,
  durability: {
    current: 100,
    max: 100,
  },
  cost: 50,
};

export const dagger: WeaponItem = {
  id: 'dagger001',
  name: 'Dagger',
  weight: 0.5,
  attacks: [
    {
      id: 'dagger001stab',
      name: 'Stab',
      type: 'thrust',
      damageModifier: 0,
      damageType: 'impale',
      reach: 1,
    },
    {
      id: 'dagger001slash',
      name: 'Slash',
      type: 'swing',
      damageModifier: -1,
      damageType: 'cut',
      reach: 1,
    },
  ],
  strengthRequirement: 5,
  parry: 0,
  durability: {
    current: 100,
    max: 100,
  },
  cost: 20,
};

export const nineMmAmmo: Ammunition = {
  id: 'ammo9mm001',
  name: '9mm Rounds',
  caliber: '9mm',
  weight: 0.012,
  capacity: {
    current: 30,
    max: 30,
  },
};

export const pistol: WeaponItem = {
  id: 'pistol001',
  name: '9mm Pistol',
  weight: 1.0,
  attacks: [
    {
      id: 'pistol001fire',
      name: 'Fire',
      type: 'ranged',
      damageModifier: 2,
      damageType: 'pierce',
      // range: '130/1800', // Half-damage range and maximum range in meters
      range: '8/13', // FIXME: Just using low values for testing the arc.
      shots: 15,
      rateOfFire: 3,
    },
    {
      id: 'pistol001whip',
      name: 'Pistol Whip',
      type: 'swing',
      damageModifier: 0,
      damageType: 'crush',
      reach: 1,
    },
  ],
  strengthRequirement: 9,
  bulk: -2,
  recoil: 2,
  durability: {
    current: 100,
    max: 100,
  },
  cost: 600,
};

export const shield: WeaponItem = {
  id: 'shield001',
  name: 'Medium Shield',
  weight: 4,
  attacks: [
    {
      id: 'shield001bash',
      name: 'Shield Bash',
      type: 'melee',
      damageModifier: 2,
      damageType: 'crush',
      reach: 1,
    },
  ],
  strengthRequirement: 10,
  block: 2,
  durability: {
    current: 150,
    max: 150,
  },
  cost: 60,
};

export const sword: WeaponItem = {
  id: 'sword001',
  name: 'Broadsword',
  weight: 1.6,
  attacks: [
    {
      id: 'sword001swing',
      name: 'Swing',
      type: 'swing',
      damageModifier: 1,
      damageType: 'cut',
      reach: 1,
    },
    {
      id: 'sword001thrust',
      name: 'Thrust',
      type: 'thrust',
      damageModifier: 0,
      damageType: 'impale',
      reach: 1,
    },
    {
      id: 'sword001pommel',
      name: 'Pommel Strike',
      type: 'thrust',
      damageModifier: 0,
      damageType: 'crush',
      reach: 1,
    },
  ],
  strengthRequirement: 10,
  parry: 0,
  durability: {
    current: 100,
    max: 100,
  },
  cost: 600,
};
