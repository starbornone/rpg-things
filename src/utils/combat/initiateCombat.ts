import { updateHealth } from '@/store/slices/npcSlice';
import { Character, WeaponAttack, WeaponItem } from '@/types';
import { evaluateDicePool } from '@/utils';
import { Dispatch } from 'react';

/**
 * Initiates combat between an attacker and a defender, evaluates the attack and defense rolls,
 * calculates the resulting damage (if any), and updates the combat log and defender's health.
 * @param attacker - The character initiating the attack.
 * @param defender - The character defending against the attack.
 * @param weapon - The weapon being used in the attack.
 * @param weaponAttack - The specific attack type (e.g., swing, thrust) of the weapon.
 * @param dispatch - The Redux dispatch function to update the defender's health in the store.
 * @param setCombatLog - A function to update the combat log with the result of the combat action.
 */
export const initiateCombat = ({
  attacker,
  defender,
  weapon,
  weaponAttack,
  dispatch,
  setCombatLog,
}: {
  attacker: Character;
  defender: Character;
  weapon: WeaponItem;
  weaponAttack: WeaponAttack;
  dispatch: Dispatch<any>;
  setCombatLog: (log: string) => void;
}) => {
  const attackType = weaponAttack.type;
  const [attackerAttribute, attackerSkill] =
    attackType === 'ranged'
      ? ['dexterity', 'firearms']
      : attackType === 'melee' || attackType === 'swing' || attackType === 'thrust'
        ? ['strength', 'melee']
        : ['strength', 'brawl'];

  const attackRoll = evaluateDicePool(
    attacker.attributes[attackerAttribute] + attacker.skills[attackerSkill],
    10,
    6,
    10
  );

  const defenseRoll = evaluateDicePool(defender.attributes.dexterity + defender.skills.athletics, 10, 6, 10);
  const netSuccesses = attackRoll.successes - defenseRoll.successes;

  if (netSuccesses > 0) {
    const baseDamage = netSuccesses + weaponAttack.damageModifier;

    dispatch(updateHealth({ id: defender.id, newHealth: defender.health.currentHp - baseDamage }));

    setCombatLog(
      `${attacker.name} attacked ${defender.name} with ${weapon.name} ${weaponAttack.name}, dealing ${baseDamage} damage. ${defender.name} now has ${
        defender.health.currentHp - baseDamage
      } HP.`
    );
  } else {
    setCombatLog(`${attacker.name} attacked with ${weapon.name} ${weaponAttack.name} but missed ${defender.name}.`);
  }
};
