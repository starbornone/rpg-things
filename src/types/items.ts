export type Slots =
  | 'feet'
  | 'hands'
  | 'leftHand'
  | 'rightHand'
  | 'head'
  | 'torso'
  | 'arms'
  | 'leftArm'
  | 'rightArm'
  | 'groin'
  | 'legs'
  | 'leftLeg'
  | 'rightLeg'
  | 'leftFoot'
  | 'rightFoot';

export interface SlotOptions {
  hand?: 'left' | 'right' | 'both';
  foot?: 'left' | 'right' | 'both';
  arm?: 'left' | 'right' | 'both';
  leg?: 'left' | 'right' | 'both';
}

export interface EquippedItems {
  head?: WearableItem[];
  torso?: WearableItem[];
  leftArm?: WearableItem[];
  rightArm?: WearableItem[];
  leftHand?: WearableItem[];
  rightHand?: WearableItem[];
  groin?: WearableItem[];
  leftLeg?: WearableItem[];
  rightLeg?: WearableItem[];
  leftFoot?: WearableItem[];
  rightFoot?: WearableItem[];
}

export interface HeldItems {
  leftHand?: Item;
  rightHand?: Item;
}

interface ItemDetails {
  cost?: number;
  id: string;
  name: string;
  weight: number;
}

export interface WearableItem extends Item {
  bulk?: number;
  damageReduction?: {
    type: 'ballistic' | 'cut' | 'pierce' | 'crush';
    amount: number;
  }[];
  equipmentDetails: {
    slots: Slots[];
    primarySlot: Slots;
    currentSlots: Slots[] | [];
    layeringLevel: [number, number];
    currentLayer: number;
  };
}

export interface Item extends ItemDetails {
  durability?: {
    current: number;
    max: number;
  };
  duration?: {
    current: number;
    max: number;
  };
  quantity: {
    current: number;
    max?: number;
  };
}

export interface WeaponAttack {
  id: string;
  name: string;
  damageModifier: number;
  damageType: 'cut' | 'impale' | 'crush' | 'pierce';
  range?: string;
  rateOfFire?: number;
  reach?: number;
  shots?: number;
  type: 'swing' | 'thrust' | 'ranged' | 'melee' | 'pommel';
}

export interface WeaponItem extends Item {
  attacks: WeaponAttack[];
  block?: number;
  bulk?: number;
  cost?: number;
  durability: {
    current: number;
    max: number;
  };
  parry?: number;
  recoil?: number;
  strengthRequirement: number;
  weight: number;
}

export interface Ammunition extends Item {
  caliber: string;
  capacity: {
    current: number;
    max: number;
  };
  weight: number;
}
