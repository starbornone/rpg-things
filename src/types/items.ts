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
  cost?: number;
  id: string;
  name: string;
  weight: number;
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
  quantity?: {
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
