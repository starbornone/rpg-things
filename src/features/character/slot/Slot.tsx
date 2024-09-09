import { Button } from '@/components';
import { Slots, WearableItem } from '@/types';

export const Slot = ({
  slot,
  slotItems,
  onRemove,
}: {
  slot: { name: string; value: Slots };
  slotItems: WearableItem[];
  onRemove: (item: WearableItem) => void;
}) => (
  <div className="grid grid-cols-4 gap-2">
    {slot.name}:{' '}
    {slotItems?.length > 0
      ? slotItems.map((item) =>
          item.equipmentDetails.currentSlots.includes(slot.value) ? (
            <div className="flex gap-2" key={item.id}>
              {item.name}
              <Button outline onClick={() => onRemove(item)}>
                Remove
              </Button>
            </div>
          ) : null
        )
      : null}
  </div>
);
