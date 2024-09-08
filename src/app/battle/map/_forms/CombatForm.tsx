'use client';

import { Button, Field, Label, Select } from '@/components';
import { Character, CombatState, Grid, WeaponAttack, WeaponItem } from '@/types';
import { calculateManhattanDistance } from '@/utils';

interface CombatFormProps {
  availableWeapons: WeaponItem[];
  availableAttacks: WeaponAttack[];
  combatLog: string;
  grid: Grid | null;
  initiateCombat: () => void;
  combatState: {
    attacker: number | null;
    defender: number | null;
    weapon: string | null;
    attack: string | null;
  };
  setCombatState: (state: Partial<CombatState>) => void;
  units: Character[];
}

export const CombatForm = ({
  availableWeapons,
  availableAttacks,
  combatLog,
  grid,
  initiateCombat,
  combatState,
  setCombatState,
  units,
}: CombatFormProps) => {
  const { attacker, defender, weapon, attack } = combatState;

  return (
    <div className="flex items-end gap-4">
      <Field>
        <Label htmlFor="select-attacker">Select Attacker</Label>
        <Select
          id="select-attacker"
          onChange={(e) => setCombatState({ attacker: parseInt(e.target.value) })}
          value={attacker ?? ''}
        >
          <option value="">Select Attacker</option>
          {units.map((unit, index) => (
            <option key={unit.name} value={index}>
              {unit.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label htmlFor="select-weapon">Select Weapon</Label>
        <Select
          id="select-weapon"
          onChange={(e) => {
            const selected = e.target.value;
            const selectedWeaponObject = availableWeapons.find((weapon) => weapon.id === selected);

            setCombatState({
              weapon: selected,
              attack: selectedWeaponObject?.attacks[0].type ?? '',
            });
          }}
          value={weapon ?? ''}
        >
          <option value="">Select Weapon</option>
          {availableWeapons.map((weapon) => (
            <option key={weapon.id} value={weapon.id}>
              {weapon.name}
            </option>
          ))}
        </Select>
      </Field>

      {weapon && (
        <Field>
          <Label htmlFor="select-attack">Select Attack Type</Label>
          <Select id="select-attack" onChange={(e) => setCombatState({ attack: e.target.value })} value={attack ?? ''}>
            <option value="">Select Attack Type</option>
            {availableAttacks.map((atk) => {
              // Get attacker and defender map positions
              const attackerUnit = units[combatState.attacker!];
              const defenderUnit = units[combatState.defender!];

              // Get heights from the grid
              const attackerHeight = grid!.map[attackerUnit.map!.y][attackerUnit.map!.x].height;
              const defenderHeight = grid!.map[defenderUnit.map!.y][defenderUnit.map!.x].height;

              // Calculate the distance including height difference
              const distanceWithHeight = calculateManhattanDistance(
                attackerUnit.map!.x,
                attackerUnit.map!.y,
                // attackerHeight,
                defenderUnit.map!.x,
                defenderUnit.map!.y,
                // defenderHeight
              );

              // Check if the attack is out of range for melee or ranged attacks
              const isMeleeOutOfReach = atk.type !== 'ranged' && distanceWithHeight > atk.reach;
              const isRangedOutOfReach =
                atk.type === 'ranged' && distanceWithHeight > parseInt(atk.range.split('/')[1]);

              return (
                <option key={atk.id} value={atk.id} disabled={isMeleeOutOfReach || isRangedOutOfReach}>
                  {atk.name} ({atk.damageType}) {isMeleeOutOfReach || isRangedOutOfReach ? '- Out of range' : ''}
                </option>
              );
            })}
          </Select>
        </Field>
      )}

      <Field>
        <Label htmlFor="select-defender">Select Defender</Label>
        <Select
          id="select-defender"
          onChange={(e) => setCombatState({ defender: parseInt(e.target.value) })}
          value={defender ?? ''}
        >
          <option value="">Select Defender</option>
          {units.map((unit, index) => (
            <option key={unit.name} value={index}>
              {unit.name}
            </option>
          ))}
        </Select>
      </Field>

      <Button onClick={initiateCombat}>Initiate Combat</Button>
      <div className="min-w-sm max-w-sm text-sm">{combatLog && <p>{combatLog}</p>}</div>
    </div>
  );
};
