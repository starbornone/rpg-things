'use client';

import { Button, Field, Input, Label, PageHeading, SectionHeading } from '@/components';
import { diceChartOptions } from '@/data';
import { RollHistory } from '@/features';
import { useDiceRoller } from '@/hooks';
import { countSuccessesInArrays } from '@/utils';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import tailwindColors from 'tailwindcss/colors';
import { DiceForm } from '../_forms';

export default function SuccessPage() {
  const { diceCount, setDiceCount, diceSides, setDiceSides, totalRolls, rolls, rollCounts, updateData, clearData } =
    useDiceRoller(6, 6);

  const [successValue, setSuccessValue] = useState(6);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: diceSides }, (_, index) => `${index + 1}`),
    datasets: [
      {
        backgroundColor: tailwindColors.cyan[700],
        data: Object.values(rollCounts),
        label: 'Dice Rolls',
        max: diceSides,
        min: 0,
      },
    ],
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, diceChartOptions(chartData));

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  useEffect(() => {
    setChartData({
      labels: Array.from({ length: diceSides }, (_, index) => `${index + 1}`),
      datasets: [
        {
          ...chartData.datasets[0],
          data: Object.values(rollCounts),
        },
      ],
    });
  }, [rollCounts, diceSides]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading text="This is a dice roller application which counts successes rolled in a pool of dice.">
        Success Dice Roller
      </PageHeading>

      <div className="flex flex-wrap items-end gap-4">
        <DiceForm
          diceCount={diceCount}
          diceSides={diceSides}
          onDiceCountChange={setDiceCount}
          onDiceSidesChange={setDiceSides}
        />
        <Field>
          <Label htmlFor="success-value">Success value</Label>
          <Input
            id="success-value"
            onChange={(e) => setSuccessValue(parseInt(e.currentTarget.value))}
            type="number"
            value={successValue}
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

        {totalRolls > 0 && (
          <div className="mt-4 text-center">
            Average successes per roll:{' '}
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
``;
