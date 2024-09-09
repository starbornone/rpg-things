import { Item } from '@/types';

export const money: Item = {
  id: 'money',
  name: 'Money',
  weight: 0.01,
  quantity: {
    current: 0,
  },
};

export const healthPotion: Item = {
  id: 'health-potion',
  name: 'Health Potion',
  weight: 0.2,
  quantity: {
    current: 1,
  },
};

export const rope: Item = {
  id: 'rope',
  name: 'Rope',
  weight: 1.0,
  durability: {
    current: 100,
    max: 100,
  },
};

export const lockpicks: Item = {
  id: 'lockpicks',
  name: 'Lockpicks',
  weight: 0.01,
  quantity: {
    current: 5,
  },
  durability: {
    current: 5,
    max: 5,
  },
};

export const bandages: Item = {
  id: 'bandages',
  name: 'Bandages',
  weight: 0.01,
  quantity: {
    current: 2,
  },
};

export const torch: Item = {
  id: 'torch',
  name: 'Torch',
  weight: 0.5,
  duration: {
    current: 120, // Remaining burn time in minutes
    max: 120, // Total burn time in minutes
  },
};

export const rations: Item = {
  id: 'rations',
  name: 'Rations',
  weight: 0.5,
  quantity: {
    current: 3,
  },
};
