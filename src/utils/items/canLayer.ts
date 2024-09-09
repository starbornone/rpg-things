import { WearableItem } from '@/types';

export function canLayer(existingItem: WearableItem, newItem: WearableItem): boolean {
  const existingLayerRange = existingItem.equipmentDetails.layeringLevel;
  const newLayerRange = newItem.equipmentDetails.layeringLevel;

  // Check if the new item can fit within the existing item's layer range
  if (newLayerRange[0] > existingLayerRange[1] || newLayerRange[1] < existingLayerRange[0]) {
    return true; // They don't overlap, so layering is allowed
  }

  return false; // Layering is not possible if ranges overlap
}
