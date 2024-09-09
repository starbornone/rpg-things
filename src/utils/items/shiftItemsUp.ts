import { WearableItem } from '@/types';

export function shiftItemsUp(currentItems: WearableItem[], newItem: WearableItem): void {
  // Shift all items currently in the slot up by one layer
  currentItems.forEach((item) => {
    if (item.equipmentDetails.currentLayer >= newItem.equipmentDetails.currentLayer) {
      item.equipmentDetails.currentLayer += 1;
    }
  });

  // Add the new item to the current items list
  currentItems.push(newItem);
}
