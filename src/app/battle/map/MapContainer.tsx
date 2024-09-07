'use client';

import { Button } from '@/components';
import { RootState } from '@/store';
import { Biome, Character, CombatState, Grid, WeaponAttack, WeaponItem } from '@/types';
import {
  calculateEuclideanDistance,
  calculateManhattanDistance,
  generateMap,
  getAvailableWeapons,
  handleMapUpdate,
  initiateCombat,
} from '@/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasGrid } from './CanvasGrid';
import { CombatForm, MapGenerationForm } from './_forms';

export const MapContainer: React.FC = () => {
  const [biome, setBiome] = useState<Biome>('forest');
  const [grid, setGrid] = useState<Grid | null>(null);
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

  const units: Character[] = useSelector((state: RootState) => state.npc);
  const dispatch = useDispatch();

  const generateNewMap = () => {
    setGrid(generateMap(biome));
  };

  /**
   * useEffect hook to update the available weapons whenever the attacker changes.
   * It retrieves the attacker's weapons and resets the selected weapon and attack in the combat state.
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
   * It finds the selected weapon from the available weapons and updates the available attacks.
   */
  useEffect(() => {
    if (combatState.weapon) {
      const selectedWeaponObject = availableWeapons.find((weapon) => weapon.id === combatState.weapon);
      if (selectedWeaponObject) {
        setAvailableAttacks(selectedWeaponObject.attacks);
      }
    }
  }, [combatState.weapon]);

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

    // Calculate distance between attacker and defender
    const distance = calculateManhattanDistance(
      attackerUnit.map!.x,
      attackerUnit.map!.y,
      defenderUnit.map!.x,
      defenderUnit.map!.y
    );

    // Handle melee reach check
    if (weaponAttack.type === 'melee' || weaponAttack.type === 'swing' || weaponAttack.type === 'thrust') {
      if (distance > weaponAttack.reach) {
        setCombatLog('Defender is out of reach for this melee attack.');
        return;
      }
    }

    // Handle ranged weapon check
    if (weaponAttack.type === 'ranged') {
      const [halfRange, maxRange] = weaponAttack.range.split('/').map(Number);
      const euclideanDistance = calculateEuclideanDistance(
        attackerUnit.map!.x,
        attackerUnit.map!.y,
        defenderUnit.map!.x,
        defenderUnit.map!.y
      );

      if (euclideanDistance > maxRange) {
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
   * It increments the turn to the next unit and updates their position and movement on the map.
   * If the turn index reaches the end, it increments the round.
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

  return (
    <div className="flex flex-col gap-4">
      <MapGenerationForm biome={biome} generateMap={generateNewMap} setBiome={setBiome} />
      <div className="mb-4 flex justify-between gap-4">
        <CombatForm
          availableAttacks={availableAttacks}
          availableWeapons={availableWeapons}
          combatLog={combatLog}
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
