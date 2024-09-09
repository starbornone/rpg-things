import { WearableItem } from '@/types';

export const sunglasses: WearableItem = {
  id: 'sunglasses',
  name: 'Sunglasses',
  weight: 0.1,
  durability: {
    current: 10,
    max: 10,
  },
  equipmentDetails: {
    slots: ['head'],
    primarySlot: 'head',
    currentSlots: [],
    layeringLevel: [1, 1],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const bra: WearableItem = {
  id: 'bra',
  name: 'Bra',
  weight: 0.1,
  durability: {
    current: 5,
    max: 5,
  },
  equipmentDetails: {
    slots: ['torso'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [1, 1],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const tShirt: WearableItem = {
  id: 't-shirt',
  name: 'T-shirt',
  weight: 0.5,
  durability: {
    current: 10,
    max: 10,
  },
  equipmentDetails: {
    slots: ['torso'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [1, 3],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const longSleeveShirt: WearableItem = {
  id: 'long-sleeve-shirt',
  name: 'Long-Sleeve Shirt',
  weight: 0.6,
  durability: {
    current: 12,
    max: 12,
  },
  equipmentDetails: {
    slots: ['torso', 'leftArm', 'rightArm'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [1, 3],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const kevlarVest: WearableItem = {
  id: 'kevlar-vest',
  name: 'Kevlar Vest',
  weight: 3,
  durability: {
    current: 50,
    max: 50,
  },
  damageReduction: [
    {
      type: 'ballistic',
      amount: 8,
    },
    {
      type: 'pierce',
      amount: 5,
    },
  ],
  equipmentDetails: {
    slots: ['torso'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [3, 5],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const hoodie: WearableItem = {
  id: 'hoodie',
  name: 'Hoodie',
  weight: 1.0,
  durability: {
    current: 20,
    max: 20,
  },
  equipmentDetails: {
    slots: ['torso', 'leftArm', 'rightArm', 'head'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [2, 4],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const leatherJacket: WearableItem = {
  id: 'leather-jacket',
  name: 'Leather Jacket',
  weight: 1.5,
  durability: {
    current: 30,
    max: 30,
  },
  equipmentDetails: {
    slots: ['torso', 'leftArm', 'rightArm'],
    primarySlot: 'torso',
    currentSlots: [],
    layeringLevel: [3, 5],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const watch: WearableItem = {
  id: 'watch',
  name: 'Watch',
  weight: 0.1,
  durability: {
    current: 20,
    max: 20,
  },
  equipmentDetails: {
    slots: ['leftHand', 'rightHand'],
    primarySlot: 'hands',
    currentSlots: [],
    layeringLevel: [1, 2],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const leatherGloves: WearableItem = {
  id: 'leather-gloves',
  name: 'Leather Gloves',
  weight: 0.3,
  durability: {
    current: 15,
    max: 15,
  },
  equipmentDetails: {
    slots: ['leftHand', 'rightHand'],
    primarySlot: 'hands',
    currentSlots: [],
    layeringLevel: [1, 2],
    currentLayer: 0,
  },
  quantity: {
    current: 2,
  },
};

export const underwear: WearableItem = {
  id: 'underwear',
  name: 'Underwear',
  weight: 0.2,
  durability: {
    current: 5,
    max: 5,
  },
  equipmentDetails: {
    slots: ['groin'],
    primarySlot: 'groin',
    currentSlots: [],
    layeringLevel: [1, 1],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const jeans: WearableItem = {
  id: 'jeans',
  name: 'Jeans',
  weight: 1.0,
  durability: {
    current: 40,
    max: 40,
  },
  equipmentDetails: {
    slots: ['leftLeg', 'rightLeg'],
    primarySlot: 'legs',
    currentSlots: [],
    layeringLevel: [1, 3],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};

export const socks: WearableItem = {
  id: 'socks',
  name: 'Socks',
  weight: 0.1,
  durability: {
    current: 5,
    max: 5,
  },
  equipmentDetails: {
    slots: ['leftFoot', 'rightFoot'],
    primarySlot: 'feet',
    currentSlots: [],
    layeringLevel: [1, 1],
    currentLayer: 0,
  },
  quantity: {
    current: 2,
  },
};

export const leatherBoots: WearableItem = {
  id: 'leather-boots',
  name: 'Leather Boots',
  weight: 1.2,
  durability: {
    current: 20,
    max: 20,
  },
  damageReduction: [
    {
      type: 'cut',
      amount: 2,
    },
  ],
  equipmentDetails: {
    slots: ['leftFoot', 'rightFoot'],
    primarySlot: 'feet',
    currentSlots: [],
    layeringLevel: [2, 3],
    currentLayer: 0,
  },
  quantity: {
    current: 1,
  },
};
