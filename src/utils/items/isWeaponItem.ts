import { Item, WeaponItem, WearableItem } from '@/types';

export function isWeaponItem(item: Item | WearableItem | WeaponItem): item is WeaponItem {
  return (item as WeaponItem).attacks !== undefined;
}
