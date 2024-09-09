import { EquippedItems, SlotOptions, WearableItem } from '@/types';
import { canLayer, getHighestLayer, shiftItemsUp } from '@/utils';

function equipItemToLimbs(
  character: EquippedItems,
  item: WearableItem,
  limbType: 'hands' | 'feet' | 'arms' | 'legs',
  limb: 'left' | 'right' | 'both'
) {
  // Determine the correct limb slots based on the limbType and limb options
  const limbSlots =
    limb === 'both'
      ? [`left${limbType.slice(0, -1)}`, `right${limbType.slice(0, -1)}`]
      : [`${limb}${limbType.slice(0, -1)}`];

  limbSlots.forEach((limbSlot) => {
    const currentItems = character[limbSlot as keyof EquippedItems] as WearableItem[] | undefined;

    if (currentItems?.length) {
      const topLayer = currentItems[currentItems.length - 1];
      if (!canLayer(topLayer, item)) {
        console.log(`Cannot equip ${item.name} over ${topLayer.name}.`);
        return;
      }
    }

    shiftItemsUp(currentItems ?? [], item);
  });

  // Adjust quantity for equipping both limbs (applies for hands, feet, etc.)
  item.quantity.current = limb === 'both' ? item.quantity.current - 2 : item.quantity.current - 1;
}

export function equipWearableItem(character: EquippedItems, item: WearableItem, options?: SlotOptions): void {
  const primarySlot = item.equipmentDetails.primarySlot;

  // Determine the next available layer based on the primary slot
  const maxLayer = getHighestLayer(character, primarySlot as keyof EquippedItems);
  item.equipmentDetails.currentLayer = maxLayer + 1;

  // Apply the item to the appropriate slots with consistent layering
  item.equipmentDetails.slots.forEach((slot) => {
    if (slot === 'hands' && options?.hand) {
      equipItemToLimbs(character, item, 'hands', options.hand);
      return;
    }

    if (slot === 'feet' && options?.foot) {
      equipItemToLimbs(character, item, 'feet', options.foot);
      return;
    }

    if (slot === 'arms' && options?.arm) {
      equipItemToLimbs(character, item, 'arms', options.arm);
      return;
    }

    if (slot === 'legs' && options?.leg) {
      equipItemToLimbs(character, item, 'legs', options.leg);
      return;
    }

    const equipSlot = slot as keyof EquippedItems;
    const currentItems = character[equipSlot] as WearableItem[] | undefined;

    if (currentItems?.length) {
      shiftItemsUp(currentItems, item);
    } else {
      character[equipSlot] = [item];
    }
  });

  console.log(`${item.name} equipped on layer ${item.equipmentDetails.currentLayer}.`);
}
