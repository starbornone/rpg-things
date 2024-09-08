'use client';

import { countRolls, initializeCounts, rollDiceSet, updateRollCounts } from '@/utils';
import { useEffect, useState } from 'react';

export function useDiceRoller(initialDiceCount: number, initialDiceSides: number) {
  const [diceCount, setDiceCount] = useState(initialDiceCount);
  const [diceSides, setDiceSides] = useState(initialDiceSides);
  const [totalRolls, setTotalRolls] = useState(0);
  const [rolls, setRolls] = useState<number[][]>([]);
  const [rollCounts, setRollCounts] = useState<Record<number, number>>(initializeCounts(initialDiceSides));

  useEffect(() => {
    clearData();
  }, [diceSides]);

  function updateData() {
    const newRolls = rollDiceSet(diceCount, diceSides);
    setTotalRolls(totalRolls + 1);
    setRolls((rolls) => [...(rolls || []), newRolls]);

    const newCounts = countRolls(newRolls, diceSides);
    const updatedRollCounts = updateRollCounts(rollCounts, newCounts);
    setRollCounts(updatedRollCounts);
  }

  function clearData() {
    setRollCounts(initializeCounts(diceSides));
    setRolls([]);
    setTotalRolls(0);
  }

  return {
    diceCount,
    setDiceCount,
    diceSides,
    setDiceSides,
    totalRolls,
    rolls,
    rollCounts,
    updateData,
    clearData,
  };
}
