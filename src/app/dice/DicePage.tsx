'use client';

import { Button, PageHeading, SectionHeading } from '@/components';
import { diceChartOptions } from '@/data';
import { RollHistory } from '@/features';
import { useDiceRoller } from '@/hooks/useDiceRoller';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import tailwindColors from 'tailwindcss/colors';
import { DiceForm } from './_forms';

export default function DicePage() {
  const { diceCount, setDiceCount, diceSides, setDiceSides, totalRolls, rolls, rollCounts, updateData, clearData } =
    useDiceRoller(6, 6);

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

  // Update chart data when rollCounts or diceSides change
  useEffect(() => {
    setChartData({
      labels: Array.from({ length: diceSides }, (_, index) => `${index + 1}`),
      datasets: [
        {
          ...chartData.datasets[0],
          data: Object.values(rollCounts), // Update chart with the latest roll counts
        },
      ],
    });
  }, [rollCounts, diceSides]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading text="A simple dice roller. Specify the number of dice and sides, roll, and see results below.">
        Basic Dice Roller
      </PageHeading>

      <div className="flex flex-wrap items-end gap-4">
        <DiceForm
          diceCount={diceCount}
          diceSides={diceSides}
          onDiceCountChange={setDiceCount}
          onDiceSidesChange={setDiceSides}
        />
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
