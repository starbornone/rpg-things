'use client';

import { Button, Checkbox, Field, Heading, Label, PageHeading, Select } from '@/components';
import { attackTypeAttributes } from '@/data';
import { RollSet } from '@/features';
import { selectAttributes, selectSkills } from '@/store/selectors';
import { AttackTypeAttributes } from '@/types';
import { countSuccesses, findDifferenceWithMinimum, rollDiceSet } from '@/utils';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const successValue = 6;
const diceSides = 10;

export default function BattlePage() {
  const attributes = useSelector(selectAttributes);
  const skills = useSelector(selectSkills);

  const [attackType, setAttackType] = useState<keyof AttackTypeAttributes>('melee');
  const [weapon, setWeapon] = useState<number>(0);
  const [isContest, setIsContest] = useState<boolean>(true);
  const [armor, setArmor] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(2);
  const [currentRoll, setCurrentRoll] = useState<number[]>([]);
  const [currentSuccesses, setCurrentSuccesses] = useState<number>(0);
  const [opponentRoll, setOpponentRoll] = useState<number[]>([]);
  const [opponentSuccesses, setOpponentSuccesses] = useState<number>(0);
  const [currentDamage, setCurrentDamage] = useState<number>(0);

  /**
   * Calculates the number of dice to roll for the current attack type using attributes and skills.
   * Uses `useMemo` to optimize by recalculating only when `attackType`, `attributes`, or `skills` change.
   * @returns {number} The total number of dice to roll.
   */
  const diceCount = useMemo(() => {
    const [attr, skill] = attackTypeAttributes[attackType];
    return attributes[attr] + skills[skill];
  }, [attackType, attributes, skills]);

  /**
   * Updates the attack type and adjusts the weapon's base damage accordingly.
   * @param {keyof AttackTypeAttributes} newAttackType - The new attack type.
   */
  function handleUpdateAttackType(newAttackType: keyof AttackTypeAttributes) {
    setAttackType(newAttackType);
    setWeapon(newAttackType === 'firearms' ? 2 : 0);
  }

  /**
   * Calculates the damage dealt by the player character after considering the opponent's defenses.
   * Uses the `findDifferenceWithMinimum` utility function to ensure a minimum damage of 0.
   * @param {number} successes - The number of successes achieved by the player.
   * @param {number} opposingSuccesses - The number of successes achieved by the opponent (if in contest).
   * @returns {number} The calculated damage after adjustments.
   */
  function handleDamage(successes: number, opposingSuccesses: number) {
    return findDifferenceWithMinimum(successes, opposingSuccesses, 0);
  }

  /**
   * Rolls the dice for the player and opponent (if in a contest) and calculates the resulting damage.
   * Updates state values for current rolls, successes, and final damage.
   */
  function handleRoll() {
    const newRoll = rollDiceSet(diceCount, diceSides);
    const successes = countSuccesses(newRoll, successValue);
    setCurrentRoll(newRoll);
    setCurrentSuccesses(successes);

    if (isContest) {
      const newOpponentRoll = rollDiceSet(2, diceSides);
      const opponentSuccesses = countSuccesses(newOpponentRoll, successValue);
      setOpponentRoll(newOpponentRoll);
      setOpponentSuccesses(opponentSuccesses);

      // Calculate damage based on both player and opponent successes
      const finalDamage = handleDamage(weapon + successes, armor + opponentSuccesses);
      setCurrentDamage(finalDamage);
    } else {
      // Non-contested roll, damage is calculated against a fixed difficulty
      const finalDamage = successes > difficulty ? weapon + successes : 0;
      setCurrentDamage(finalDamage);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeading text="This page features a combat roll simulator designed to help you test different outcomes using a d10 dice pool system. In this simulator, your character's performance in combat is determined by key attributes such as strength and dexterity, which directly influence how many dice you can roll. Additionally, the skills your character possesses play a significant role in shaping the dice pool, as they further refine how effective a character is in specific combat scenarios.">
        Basic Battle Simulator
      </PageHeading>

      <div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            Strength: <span className="font-bold">{attributes.strength}</span>
          </div>
          <div>
            Dexterity: <span className="font-bold">{attributes.dexterity}</span>
          </div>
          <div>
            Stamina: <span className="font-bold">{attributes.stamina}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            Athletics: <span className="font-bold">{skills.athletics}</span>
          </div>
          <div>
            Brawl: <span className="font-bold">{skills.brawl}</span>
          </div>
          <div>
            Firearms: <span className="font-bold">{skills.firearms}</span>
          </div>
          <div>
            Melee: <span className="font-bold">{skills.melee}</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-4">
        <Field>
          <Label htmlFor="attack-type">Attack Type</Label>
          <Select id="attack-type" onChange={(e) => handleUpdateAttackType(e.currentTarget.value)} value={attackType}>
            <option value="melee">Melee</option>
            <option value="firearms">Ranged</option>
            <option value="brawl">Unarmed</option>
          </Select>
        </Field>
        {attackType !== 'brawl' && (
          <Field>
            <Label htmlFor="weapon">Weapon</Label>
            <Select id="weapon" onChange={(e) => setWeapon(parseInt(e.currentTarget.value))} value={weapon}>
              {attackType === 'melee' && <option value={0}>Improvised weapon</option>}
              {attackType === 'melee' && <option value={1}>Light impact</option>}
              {attackType === 'melee' && <option value={2}>Heavy impact</option>}
              <option value={2}>Light piercing</option>
              {attackType === 'firearms' && <option value={2}>Light gunshot</option>}
              {attackType === 'melee' && <option value={3}>Heavy melee</option>}
              {attackType === 'firearms' && <option value={4}>Medium gunshot</option>}
              {attackType === 'melee' && <option value={4}>Huge melee</option>}
            </Select>
          </Field>
        )}
        <Field className="flex gap-2">
          <Label htmlFor="is-contest">Contest?</Label>
          <Checkbox id="is-contest" checked={isContest} onChange={setIsContest} />
        </Field>
      </div>
      <div className="flex items-end gap-4">
        {isContest && (
          <Field>
            <Label htmlFor="armor">Armor</Label>
            <Select id="armor" onChange={(e) => setArmor(parseInt(e.currentTarget.value))} value={armor}>
              <option value={0}>None</option>
              <option value={2}>Reinforced clothing</option>
              <option value={2}>Ballistic cloth</option>
              <option value={4}>Kevlar jacket</option>
              <option value={6}>Tactical armor</option>
            </Select>
          </Field>
        )}
        {!isContest && (
          <Field>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select id="difficulty" onChange={(e) => setDifficulty(parseInt(e.currentTarget.value))} value={difficulty}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </Select>
          </Field>
        )}
        <Button color="dark" onClick={handleRoll}>
          Roll {diceCount}d10
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <div className="min-w-lg">
          {currentRoll.length > 0 && (
            <>
              <Heading level={3}>You</Heading>
              <RollSet
                rollSet={currentRoll}
                setIndex="current"
                successCount={currentSuccesses}
                successValue={successValue}
              />
            </>
          )}
        </div>
        <div className="min-w-lg">
          {opponentRoll.length > 0 && (
            <>
              <Heading level={3}>Opponent</Heading>
              <RollSet
                rollSet={opponentRoll}
                setIndex="opponent"
                successCount={opponentSuccesses}
                successValue={successValue}
              />
            </>
          )}
        </div>
        <div className="text-sm">
          {currentRoll.length > 0 ? (
            <>
              <Heading level={3}>Result</Heading>
              <div className="flex gap-2">
                <div>
                  {currentSuccesses === (isContest ? opponentSuccesses : difficulty) ? (
                    <div>Draw!</div>
                  ) : currentSuccesses > (isContest ? opponentSuccesses : difficulty) ? (
                    <div className="text-emerald-500">Success!</div>
                  ) : (
                    <div className="text-rose-500">Failure!</div>
                  )}
                </div>
                <div>
                  {currentSuccesses > (isContest ? opponentSuccesses : difficulty) ? (
                    <div className="text-emerald-500">
                      +{currentSuccesses - (isContest ? opponentSuccesses : difficulty)} successes
                    </div>
                  ) : (
                    '—'
                  )}
                </div>
              </div>
              <div>
                <div>
                  <span className="text-rose-500">{currentDamage}</span> damage dealt
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
