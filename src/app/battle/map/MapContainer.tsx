'use client';

import { Button } from '@/components';
import { RootState } from '@/store';
import { Character, CombatState, WeaponAttack, WeaponItem } from '@/types';
import {
  calculateEuclideanDistanceWithHeight,
  calculateManhattanDistance,
  getAvailableWeapons,
  handleMapUpdate,
  initiateCombat,
  loadImage,
} from '@/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasGrid } from './CanvasGrid';
import { CombatForm, MapGenerationForm } from './_forms';

export const MapContainer: React.FC = () => {
  const dispatch = useDispatch();

  const grid = useSelector((state: RootState) => state.map.grid);
  const reduxUnits: Character[] = useSelector((state: RootState) => state.npc);

  const [units, setUnits] = useState<Character[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [combatLog, setCombatLog] = useState<string>('');
  const [combatState, setCombatState] = useState<CombatState>({
    attacker: 0,
    defender: 1,
    weapon: null,
    attack: null,
  });
  const [availableWeapons, setAvailableWeapons] = useState<WeaponItem[]>([]);
  const [availableAttacks, setAvailableAttacks] = useState<WeaponAttack[]>([]);

  /**
   * Load images for all units.
   */
  useEffect(() => {
    let loadedImages = 0;
    const updatedUnits = [...reduxUnits];

    updatedUnits.forEach((unit, index) => {
      if (unit.map?.image) {
        const { element, src, loaded } = loadImage(unit.map.image.src);

        element.onload = () => {
          loadedImages += 1;

          const updatedMap = {
            ...updatedUnits[index].map,
            image: {
              element,
              src,
              loaded,
            },
          };
          const updatedUnit = {
            ...updatedUnits[index],
            map: updatedMap,
          };

          updatedUnits[index] = updatedUnit;

          if (loadedImages === updatedUnits.length) {
            setUnits(updatedUnits);
            setImagesLoaded(true);
          }
        };

        element.onerror = () => {
          console.error(`Failed to load image for unit ${unit.name}`);
        };
      }
    });
  }, [reduxUnits]);

  /**
   * useEffect hook to update the available weapons whenever the attacker changes.
   */
  useEffect(() => {
    if (units.length > 0 && combatState.attacker !== null) {
      const attacker = units[combatState.attacker];
      const weapons = getAvailableWeapons(attacker);

      setAvailableWeapons(weapons);
      setCombatState((prevState) => ({
        ...prevState,
        weapon: null,
        attack: null,
      }));
    }
  }, [combatState.attacker, units]);

  /**
   * useEffect hook to update the available attacks whenever the selected weapon changes.
   */
  useEffect(() => {
    if (combatState.weapon) {
      const selectedWeaponObject = availableWeapons.find((weapon) => weapon.id === combatState.weapon);
      if (selectedWeaponObject) {
        setAvailableAttacks(selectedWeaponObject.attacks);
      }
    }
  }, [combatState.weapon, availableWeapons]);

  /**
   * Handles the combat action by ensuring that an attacker, defender, weapon, and attack are selected.
   */
  const handleCombat = () => {
    const { attacker, defender, weapon, attack } = combatState;

    if (attacker === null || defender === null || !weapon || !attack) {
      setCombatLog('Please select both an attacker, a defender, a weapon, and an attack type.');
      return;
    }

    const attackerUnit = units[attacker];
    const defenderUnit = units[defender];
    const weaponItem = availableWeapons.find((w) => w.id === weapon);
    const weaponAttack = availableAttacks.find((atk) => atk.id === attack);

    if (!weaponItem || !weaponAttack) return;

    // Get the height values for the attacker and defender
    const attackerHeight = grid!.map[attackerUnit.map!.y][attackerUnit.map!.x].height;
    const defenderHeight = grid!.map[defenderUnit.map!.y][defenderUnit.map!.x].height;

    // Calculate distance between attacker and defender, including height
    const distanceWithHeight = calculateManhattanDistance(
      attackerUnit.map!.x,
      attackerUnit.map!.y,
      // attackerHeight,
      defenderUnit.map!.x,
      defenderUnit.map!.y
      // defenderHeight
    );

    // Handle melee reach check
    if (weaponAttack.type === 'melee' || weaponAttack.type === 'swing' || weaponAttack.type === 'thrust') {
      if (distanceWithHeight > weaponAttack.reach) {
        setCombatLog('Defender is out of reach for this melee attack.');
        return;
      }
    }

    // Handle ranged weapon check
    if (weaponAttack.type === 'ranged') {
      const [halfRange, maxRange] = weaponAttack.range.split('/').map(Number);
      const euclideanDistanceWithHeight = calculateEuclideanDistanceWithHeight(
        attackerUnit.map!.x,
        attackerUnit.map!.y,
        attackerHeight,
        defenderUnit.map!.x,
        defenderUnit.map!.y,
        defenderHeight
      );

      if (euclideanDistanceWithHeight > maxRange) {
        setCombatLog('Defender is out of range for this ranged attack.');
        return;
      }
    }

    // Proceed with combat initiation
    initiateCombat({
      attacker: attackerUnit,
      defender: defenderUnit,
      weapon: weaponItem,
      weaponAttack,
      dispatch,
      setCombatLog,
    });
  };

  /**
   * Handles the end of a turn by updating the current turn index and performing any necessary map updates.
   */
  const endTurn = () => {
    const nextTurnIndex = (currentTurnIndex + 1) % units.length;
    const currentUnit = units[nextTurnIndex];

    handleMapUpdate(currentUnit.id, currentUnit.map!.x, currentUnit.map!.y, currentUnit.move, dispatch);

    if (nextTurnIndex === 0) {
      setRound((prevRound) => prevRound + 1);
    }

    setCurrentTurnIndex(nextTurnIndex);
  };

  if (!imagesLoaded) {
    return <div>Loading unit images...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <MapGenerationForm />
      <div className="mb-4 flex justify-between gap-4">
        <CombatForm
          availableAttacks={availableAttacks}
          availableWeapons={availableWeapons}
          combatLog={combatLog}
          grid={grid}
          initiateCombat={handleCombat}
          combatState={combatState}
          setCombatState={(newState) => setCombatState((prev) => ({ ...prev, ...newState }))}
          units={units}
        />

        <div className="flex items-end gap-4">
          <Button onClick={endTurn}>End Turn</Button>
          <div className="my-2">Current Round: {round}</div>
        </div>
      </div>

      {grid && (
        <CanvasGrid
          availableWeapons={availableWeapons}
          combatState={combatState}
          currentTurnIndex={currentTurnIndex}
          grid={grid}
          units={units}
        />
      )}
    </div>
  );
};
