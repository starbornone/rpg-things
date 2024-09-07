import { rollDiceSet } from '@/utils';

/**
 * Rolls a dice pool and evaluates successes, failures, and critical hits.
 * @param diceCount - The number of dice to roll.
 * @param diceSides - The number of sides on each die.
 * @param successThreshold - The value at or above which a roll is considered a success.
 * @param critThreshold - The value at or above which a roll is considered a critical hit.
 * @returns An object containing counts of successes, criticals, and failures.
 */
export function evaluateDicePool(
  diceCount: number,
  diceSides: number = 10,
  successThreshold: number = 6,
  critThreshold: number = 10
) {
  const rolls = rollDiceSet(diceCount, diceSides);
  const successes = rolls.filter((roll) => roll >= successThreshold).length;
  const criticals = rolls.filter((roll) => roll >= critThreshold).length;
  const failures = rolls.filter((roll) => roll === 1).length;

  const botch = failures > 0 && successes === 0; // No successes but rolled 1's

  return {
    rolls,
    successes,
    criticals,
    failures,
    botch,
  };
}
