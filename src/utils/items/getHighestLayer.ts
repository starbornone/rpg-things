import { EquippedItems, WearableItem } from '@/types';

export function getHighestLayer(character: EquippedItems, slot: keyof EquippedItems): number {
  const itemsInSlot = character[slot] as WearableItem[] | undefined;
  return itemsInSlot && itemsInSlot.length ? itemsInSlot[itemsInSlot.length - 1].equipmentDetails.currentLayer : 0;
}
