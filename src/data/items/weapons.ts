import { Ammunition, WeaponItem } from '@/types';

export const axe: WeaponItem = {
  id: 'axe001',
  name: 'Hand Axe',
  weight: 2,
  damage: 'sw+2 cut / thr+1 imp',
  reach: 1,
  stRequirement: 10,
  parry: 0,
  special: 'Can be thrown (range STx1.5)',
  durability: {
    current: 100,
    max: 100,
  },
  cost: 50,
};

export const shield: WeaponItem = {
  id: 'shield001',
  name: 'Medium Shield',
  weight: 4,
  damage: 'thr+2 cr',
  reach: 1,
  stRequirement: 10,
  block: 2,
  special: 'Provides cover; +2 to Block.',
  durability: {
    current: 150,
    max: 150,
  },
  cost: 60,
};

export const dagger: WeaponItem = {
  id: 'dagger001',
  name: 'Dagger',
  weight: 0.5,
  damage: 'thr imp / sw-1 cut',
  reach: 1,
  stRequirement: 5,
  parry: 0,
  special: 'Can be thrown (range STx0.5)',
  durability: {
    current: 100,
    max: 100,
  },
  cost: 20,
};

export const pistol: WeaponItem = {
  id: 'pistol001',
  name: '9mm Pistol',
  weight: 1.0,
  damage: '2d+2 pi',
  range: '150/1800',
  stRequirement: 9,
  rof: 3,
  shots: 15,
  bulk: -2,
  rcl: 2,
  special: 'Semi-automatic firearm',
  durability: {
    current: 100,
    max: 100,
  },
  cost: 600,
};

export const nineMmAmmo: Ammunition = {
  id: 'ammo9mm001',
  name: '9mm Rounds',
  caliber: '9mm',
  weight: 0.012, // Approx. 12 grams per round
  capacity: {
    current: 30,
    max: 30,
  },
};
