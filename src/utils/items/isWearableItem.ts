import { Item, WeaponItem, WearableItem } from '@/types';

export function isWearableItem(item: Item | WearableItem | WeaponItem): item is WearableItem {
  return (item as WearableItem).equipmentDetails?.slots !== undefined;
}
