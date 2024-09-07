import { Character, WeaponItem } from '@/types';

/**
 * Retrieves the available weapons from the attacker's held items (left and right hands).
 * Only items that are classified as `WeaponItem` (i.e., have attacks) are included.
 * @param attacker - The character whose available weapons are being retrieved.
 * @returns An array of `WeaponItem` that the attacker is holding in either hand.
 */
export const getAvailableWeapons = (attacker: Character): WeaponItem[] => {
  const weapons: WeaponItem[] = [];

  if (attacker.heldItems?.leftHand && 'attacks' in attacker.heldItems.leftHand) {
    weapons.push(attacker.heldItems.leftHand as WeaponItem);
  }

  if (attacker.heldItems?.rightHand && 'attacks' in attacker.heldItems.rightHand) {
    weapons.push(attacker.heldItems.rightHand as WeaponItem);
  }

  return weapons;
};
