export interface EquippedItems {
  head?: Item;
  torso?: Item;
  leftArm?: Item;
  rightArm?: Item;
  leftHand?: Item;
  rightHand?: Item;
  leftLeg?: Item;
  rightLeg?: Item;
  leftFoot?: Item;
  rightFoot?: Item;
}

export interface HeldItems {
  leftHand?: Item;
  rightHand?: Item;
}

interface ItemDetails {
  id: string;
  name: string;
  weight: number;
  cost?: number;
}

export interface Item extends ItemDetails {
  durability?: {
    current: number;
    max: number;
  };
  quantity?: {
    current: number;
    max?: number;
  };
  duration?: {
    current: number;
    max: number;
  };
}

export interface WeaponItem extends Item {
  damage: string;
  weight: number;
  reach?: number;
  stRequirement: number;
  parry?: number;
  block?: number;
  range?: string;
  rof?: number;
  shots?: number;
  bulk?: number;
  rcl?: number;
  special?: string;
  cost?: number;
}

export interface Ammunition extends Item {
  caliber: string;
  weight: number;
  capacity: {
    current: number;
    max: number;
  };
}
