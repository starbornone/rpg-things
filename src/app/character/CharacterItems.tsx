'use client';

import { Button, Heading, SectionHeading } from '@/components';
import { Slot } from '@/features';
import {
  characterCarriedItemsAdd,
  characterCarriedItemsRemove,
  characterEquippedItemsAdd,
  characterEquippedItemsRemove,
} from '@/store/slices/characterSlice';
import { EquippedItems, HeldItems, Item, SlotOptions, Slots, WeaponItem, WearableItem } from '@/types';
import { isWearableItem } from '@/utils';
import { useDispatch } from 'react-redux';

interface CharacterItemsProps {
  carriedItems?: (Item | WearableItem | WeaponItem)[];
  heldItems?: HeldItems;
  equippedItems?: EquippedItems;
}

export function CharacterItems({ carriedItems, heldItems, equippedItems }: CharacterItemsProps) {
  const dispatch = useDispatch();

  const handleEquipAndRemoveFromCarried = (item: WearableItem, options?: SlotOptions) => {
    dispatch(characterEquippedItemsAdd({ item, options }));
    dispatch(characterCarriedItemsRemove(item.id));
  };

  const handleRemoveEquippedItem = (item: WearableItem, slot: Slots) => {
    dispatch(characterEquippedItemsRemove({ item, slot }));
    dispatch(characterCarriedItemsAdd([item]));
  };

  return (
    <div>
      <SectionHeading>Items</SectionHeading>

      {heldItems && (
        <div>
          <Heading level={3}>Held Items</Heading>
          <div>
            <div>Left Hand: {heldItems?.leftHand?.name || '—'}</div>
            <div>Right Hand: {heldItems?.rightHand?.name || '—'}</div>
          </div>
        </div>
      )}

      {equippedItems && (
        <div>
          <Heading level={3}>Equipped Items</Heading>
          <div>
            {/* Use the Slot component to handle each slot */}
            <Slot
              slot={{ name: 'Head', value: 'head' }}
              slotItems={equippedItems?.head || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'head')}
            />
            <Slot
              slot={{ name: 'Torso', value: 'torso' }}
              slotItems={equippedItems?.torso || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'torso')}
            />
            <Slot
              slot={{ name: 'Left Arm', value: 'leftArm' }}
              slotItems={equippedItems?.leftArm || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'leftArm')}
            />
            <Slot
              slot={{ name: 'Right Arm', value: 'rightArm' }}
              slotItems={equippedItems?.rightArm || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'rightArm')}
            />
            <Slot
              slot={{ name: 'Left Hand', value: 'leftHand' }}
              slotItems={equippedItems?.leftHand || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'leftHand')}
            />
            <Slot
              slot={{ name: 'Right Hand', value: 'rightHand' }}
              slotItems={equippedItems?.rightHand || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'rightHand')}
            />
            <Slot
              slot={{ name: 'Groin', value: 'groin' }}
              slotItems={equippedItems?.groin || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'groin')}
            />
            <Slot
              slot={{ name: 'Left Leg', value: 'leftLeg' }}
              slotItems={equippedItems?.leftLeg || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'leftLeg')}
            />
            <Slot
              slot={{ name: 'Right Leg', value: 'rightLeg' }}
              slotItems={equippedItems?.rightLeg || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'rightLeg')}
            />
            <Slot
              slot={{ name: 'Left Foot', value: 'leftFoot' }}
              slotItems={equippedItems?.leftFoot || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'leftFoot')}
            />
            <Slot
              slot={{ name: 'Right Foot', value: 'rightFoot' }}
              slotItems={equippedItems?.rightFoot || []}
              onRemove={(item) => handleRemoveEquippedItem(item, 'rightFoot')}
            />
          </div>
        </div>
      )}

      {carriedItems && (
        <div>
          <Heading level={3}>Carried Items</Heading>
          {carriedItems.map((item) => (
            <div className="my-2 grid grid-cols-4 gap-4" key={item.id}>
              {item.name}
              {item.quantity
                ? ` (${item.quantity?.current}${item.quantity.max ? `/${item.quantity?.max}` : ''})`
                : null}

              {/* Equip Button */}
              {isWearableItem(item) ? (
                <div className="col-span-2 flex gap-2">
                  {/* For items like gloves or boots, we check if options for left/right are needed */}
                  {item.equipmentDetails.primarySlot === 'hands' && (
                    <>
                      {item.equipmentDetails.slots.includes('leftHand') && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              { ...item, equipmentDetails: { ...item.equipmentDetails, currentSlots: ['leftHand'] } },
                              { hand: 'left' }
                            )
                          }
                        >
                          Equip Left Hand
                        </Button>
                      )}
                      {item.equipmentDetails.slots.includes('rightHand') && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              { ...item, equipmentDetails: { ...item.equipmentDetails, currentSlots: ['rightHand'] } },
                              { hand: 'right' }
                            )
                          }
                        >
                          Equip Right Hand
                        </Button>
                      )}
                      {item.quantity.current > 1 && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              {
                                ...item,
                                equipmentDetails: { ...item.equipmentDetails, currentSlots: ['leftHand', 'rightHand'] },
                              },
                              { hand: 'both' }
                            )
                          }
                        >
                          Equip Both Hands
                        </Button>
                      )}
                    </>
                  )}
                  {item.equipmentDetails.primarySlot === 'feet' && (
                    <>
                      {item.equipmentDetails.slots.includes('leftFoot') && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              { ...item, equipmentDetails: { ...item.equipmentDetails, currentSlots: ['leftFoot'] } },
                              { foot: 'left' }
                            )
                          }
                        >
                          Equip Left Foot
                        </Button>
                      )}
                      {item.equipmentDetails.slots.includes('rightFoot') && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              { ...item, equipmentDetails: { ...item.equipmentDetails, currentSlots: ['rightFoot'] } },
                              { foot: 'right' }
                            )
                          }
                        >
                          Equip Right Foot
                        </Button>
                      )}
                      {item.quantity.current > 1 && (
                        <Button
                          outline
                          onClick={() =>
                            handleEquipAndRemoveFromCarried(
                              {
                                ...item,
                                equipmentDetails: { ...item.equipmentDetails, currentSlots: ['leftFoot', 'rightFoot'] },
                              },
                              { foot: 'both' }
                            )
                          }
                        >
                          Equip Both Feet
                        </Button>
                      )}
                    </>
                  )}
                  {/* Equip without options */}
                  {item.equipmentDetails.primarySlot !== 'hands' && item.equipmentDetails.primarySlot !== 'feet' && (
                    <Button
                      outline
                      onClick={() =>
                        handleEquipAndRemoveFromCarried({
                          ...item,
                          equipmentDetails: {
                            ...item.equipmentDetails,
                            currentSlots: [item.equipmentDetails.primarySlot],
                          },
                        })
                      }
                    >
                      Equip
                    </Button>
                  )}
                </div>
              ) : (
                <div className="col-span-2"></div>
              )}

              {/* Drop Button */}
              {/* TODO: Set a drop quantity. */}
              <Button outline onClick={() => dispatch(characterCarriedItemsRemove(item.id))}>
                Drop
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
