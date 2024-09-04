'use client';

import { Button, Field, Input, Label } from '@/components';
import { diceChartOptions } from '@/data';
import { countRolls, countSuccessesInArrays, rollDiceSet, updateRollCounts } from '@/utils';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import tailwindColors from 'tailwindcss/colors';
import PageHeading from '../_components/PageHeading';
import RollHistory from '../_components/RollHistory';
import SectionHeading from '../_components/SectionHeading';

export default function Page() {
  /**
   * State for the number of dice to roll
   * @type {number}
   * @default 6
   */
  const [diceCount, setDiceCount] = useState(6);

  /**
   * State for the number of sides on each die
   * @type {number}
   * @default 6
   */
  const [diceSides, setDiceSides] = useState(6);

  /**
   * State representing the success value for a roll of the dice.
   * This determines the threshold number required to succeed.
   * @type {number}
   * @default 6
   */
  const [successValue, setSuccessValue] = useState(6);

  /**
   * State for tracking the total number of rolls made so far
   * @type {number}
   * @default 0
   */
  const [totalRolls, setTotalRolls] = useState(0);

  /**
   * State for storing all the rolls made so far
   * Each roll is represented as an array of numbers, with each number corresponding to the result of a die roll.
   * @type {number[][]}
   * @default []
   */
  const [rolls, setRolls] = useState<number[][]>([]);

  /**
   * State for tracking the count of each die side from all rolls
   * The index corresponds to the side of the die (e.g., index 0 for side 1), and the value at that index is the count of how many times that side has been rolled.
   * @type {number[]}
   * @default Array of zeros, length equal to diceSides
   */
  const [rollCounts, setRollCounts] = useState<number[]>(Array(diceSides).fill(0));

  /**
   * Reference to the canvas element where the chart will be rendered
   * @type {React.RefObject<HTMLCanvasElement>}
   * @default null
   */
  const chartRef = useRef<HTMLCanvasElement>(null);

  /**
   * State for storing the data used by the chart
   * - labels: An array of numbers representing each side of the die (from 1 to diceSides).
   * - datasets: An array of datasets for the chart. Currently, it contains one dataset representing the count of rolls for each die side.
   * @type {object}
   * @property {number[]} labels - The labels for the x-axis, representing each side of the die.
   * @property {object[]} datasets - The datasets for the chart, where each dataset contains:
   *   - label: A string describing the dataset.
   *   - data: An array of numbers representing the count of rolls for each side of the die.
   *   - min: The minimum value for the chart (0).
   *   - max: The maximum value for the chart (equal to diceSides).
   */
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: diceSides }, (_, index) => index + 1),
    datasets: [
      {
        backgroundColor: tailwindColors.cyan[700], // Tailwind cyan color for bars
        data: Array(diceSides).fill(0),
        label: 'Dice Rolls',
        max: diceSides,
        min: 0,
      },
    ],
  });

  /**
   * Effect hook to initialize and update the chart when chartData changes
   * - Initializes the chart on mount and destroys it on unmount to avoid memory leaks.
   * - The chart is re-rendered every time chartData changes.
   */
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, diceChartOptions(chartData));

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  /**
   * Main function to update the chart data
   * Rolls a new set of dice, updates the roll counts, and updates the chart data to reflect the new counts.
   * This function is the primary handler for updating the chart based on user interaction or other triggers.
   */
  function updateData() {
    // Roll the dice and get the new results
    const newRolls = rollDiceSet(diceCount, diceSides);

    // Increments the totalRolls state by 1 to account for this new roll set
    setTotalRolls(totalRolls + 1);

    // Add the new rolls to the existing set of rolls
    setRolls((rolls) => [...(rolls || []), newRolls]);

    // Count the occurrences of each side in the new rolls
    const newCounts = countRolls(newRolls, diceSides);

    // Update the roll counts with the new counts
    const updatedRollCounts = updateRollCounts(rollCounts, newCounts);

    // Update the roll counts state
    setRollCounts(updatedRollCounts);

    // Update the chart data to reflect the updated roll counts
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: updatedRollCounts, // Set the updated counts as the data for the chart
        },
      ],
    });
  }

  /**
   * Resets the application's state related to dice roll data.
   * This function is typically used to clear all existing data
   * and prepare the state for a new set of dice rolls.
   */
  function clearData() {
    /**
     * Resets the roll counts for each side of the dice.
     * - Creates an array of length `diceSides`, filled with 0.
     * - This array represents the count of rolls for each side,
     *   initialized to zero.
     */
    setRollCounts(Array(diceSides).fill(0));

    /**
     * Clears the array storing individual roll results.
     * - This empties the list of previous rolls, resetting it to an empty array.
     */
    setRolls([]);

    /**
     * Resets the total number of rolls to zero.
     * - This indicates that no rolls have been made after the reset.
     */
    setTotalRolls(0);

    /**
     * Resets the chart data by clearing all datasets.
     * - Keeps the existing chart structure intact by spreading `chartData`,
     *   but removes all data in the `datasets` array.
     * - This effectively clears the visual data from the chart,
     *   readying it for new data to be added.
     */
    setChartData({
      ...chartData,
      datasets: [],
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        text='This is a dice roller application which counts successes rolled in a pool of dice. You can specify the minimum
          number required for a die roll to be considered a success, the number of dice, and the number of sides on each
          die to roll. Click the "Roll" button to roll the dice and see the results. The chart below will
          display the count of each side rolled so far.'
      >
        Success Dice Roller
      </PageHeading>

      <div className="flex items-end justify-between gap-2">
        <Field>
          <Label htmlFor="success-value">Success value</Label>
          <Input
            id="success-value"
            onChange={(e) => setSuccessValue(parseInt(e.currentTarget.value))}
            type="number"
            value={successValue}
            className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
        </Field>
        <Field>
          <Label htmlFor="dice-sides">Number of sides</Label>
          <Input
            id="dice-sides"
            onChange={(e) => setDiceSides(parseInt(e.currentTarget.value))}
            type="number"
            value={diceSides}
            className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
        </Field>
        <Field>
          <Label htmlFor="dice-count">Number of dice</Label>
          <Input
            id="dice-count"
            onChange={(e) => setDiceCount(parseInt(e.currentTarget.value))}
            type="number"
            value={diceCount}
            className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
        </Field>
        <Button color="dark" onClick={updateData}>
          Roll
        </Button>
        <Button onClick={clearData} outline>
          Clear
        </Button>
      </div>

      <div>
        <SectionHeading text={`${totalRolls} total rolls`}>Rolls</SectionHeading>
        <canvas id="dice-roller-chart" ref={chartRef} width="512" height="300" className="bg-white dark:bg-gray-900" />

        {totalRolls > 0 && (
          <div className="mt-4 text-center">
            Average succcesses per roll:{' '}
            <span className="font-semibold">
              {(countSuccessesInArrays(rolls, successValue) / totalRolls).toFixed(2)}
            </span>
          </div>
        )}

        <RollHistory rolls={rolls} successValue={successValue} />
      </div>
    </div>
  );
}
