'use client';

import { Button, Field, Input, Label, PageHeading, SectionHeading } from '@/components';
import { diceChartOptions } from '@/data';
import { RollHistory } from '@/features';
import { countRolls, rollDiceSet, updateRollCounts } from '@/utils';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import tailwindColors from 'tailwindcss/colors';

export default function DicePage() {
  const [diceCount, setDiceCount] = useState(6);
  const [diceSides, setDiceSides] = useState(6);

  const [totalRolls, setTotalRolls] = useState(0);
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
   * Effect hook to initialize and update the chart when chartData changes.
   * - Initializes the chart on mount and destroys it on unmount to avoid memory leaks.
   * - The chart is re-rendered every time chartData changes.
   */
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Create a new chart instance with the provided context and options
    const chart = new Chart(ctx, diceChartOptions(chartData));

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  /**
   * Main function to update the chart data.
   * - Rolls a new set of dice, updates the roll counts, and re-renders the chart to reflect the new data.
   * - This function handles user interactions or other triggers that require a chart update.
   */
  function updateData() {
    // Roll the dice and get a new set of results based on the number of dice and sides
    const newRolls = rollDiceSet(diceCount, diceSides);

    // Increment the totalRolls state by 1 to track the number of total rolls made
    setTotalRolls(totalRolls + 1);

    // Add the new rolls to the existing rolls array in the state
    setRolls((rolls) => [...(rolls || []), newRolls]);

    // Count the occurrences of each side in the new roll set
    const newCounts = countRolls(newRolls, diceSides);

    // Update the roll counts state with the new counts
    const updatedRollCounts = updateRollCounts(rollCounts, newCounts);

    // Set the updated roll counts in the state
    setRollCounts(updatedRollCounts);

    // Update the chart data by copying the existing data and setting the updated counts
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: updatedRollCounts, // Update the dataset with the new roll counts
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
     * - This array represents the count of rolls for each side, initialized to zero.
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
        text='This is a simple dice roller application. You can specify the number of dice and the number of sides on each
          die to roll. Click the "Roll" button to roll the dice and see the results. The chart below will
          display the count of each side rolled so far.'
      >
        Basic Dice Roller
      </PageHeading>

      <div className="flex flex-wrap items-end gap-4">
        <Field>
          <Label htmlFor="dice-sides">Number of sides</Label>
          <Input
            id="dice-sides"
            onChange={(e) => setDiceSides(parseInt(e.currentTarget.value))}
            type="number"
            value={diceSides}
          />
        </Field>
        <Field>
          <Label htmlFor="dice-count">Number of dice</Label>
          <Input
            id="dice-count"
            onChange={(e) => setDiceCount(parseInt(e.currentTarget.value))}
            type="number"
            value={diceCount}
          />
        </Field>
        <Button color="dark" onClick={updateData}>
          Roll {diceCount}d{diceSides}
        </Button>
        <Button onClick={clearData} outline>
          Clear
        </Button>
      </div>

      <div>
        <SectionHeading text={`${totalRolls} total rolls`}>Rolls</SectionHeading>
        <canvas id="dice-roller-chart" ref={chartRef} width="512" height="300" className="bg-white dark:bg-gray-900" />

        <RollHistory rolls={rolls} />
      </div>
    </div>
  );
}
