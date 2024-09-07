'use client';

import { Button, Field, Label, Select } from '@/components';
import { initialUnits } from '@/data';
import { Biome, Character, Grid } from '@/types';
import { generateBiomeTerrain, generateHeightmap } from '@/utils';
import { useEffect, useState } from 'react';
import { CanvasGrid } from './CanvasGrid';

export const MapContainer: React.FC = () => {
  const [biome, setBiome] = useState<Biome>('aquatic');
  const [grid, setGrid] = useState<Grid | null>(null);
  const [units, setUnits] = useState<Character[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [remainingMoves, setRemainingMoves] = useState<number>(0);

  const characterImage = '/vampiric_lord_female.png';

  useEffect(() => {
    // Load character images and update units
    initialUnits.forEach((unit, index) => {
      if (unit.map) {
        unit.map.image.src = characterImage;
        unit.map.image.onload = () => {
          setUnits((prevUnits) => {
            const updatedUnits = [...prevUnits];
            updatedUnits[index] = {
              ...unit,
              map: { ...unit.map, loaded: true },
            };
            return updatedUnits;
          });
        };
      }
    });

    setUnits(initialUnits);
  }, []);

  // Generate the terrain based on the selected biome
  useEffect(() => {
    const heightmap = generateHeightmap(50, 50, biome);
    const grid = generateBiomeTerrain(heightmap, biome);
    setGrid(grid);
  }, [biome]);

  // Reset remaining moves at the beginning of each unit's turn
  useEffect(() => {
    if (units[currentTurnIndex]) {
      setRemainingMoves(units[currentTurnIndex].move);
    }
  }, [currentTurnIndex, units]);

  // End the current unit's turn and move to the next one
  const endTurn = () => {
    const nextTurnIndex = (currentTurnIndex + 1) % units.length; // Loop through units
    setCurrentTurnIndex(nextTurnIndex); // Set the next unit's turn
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-6 items-end gap-4">
        <Field>
          <Label htmlFor="Select biome">Select biome</Label>
          <Select id="Select biome" onChange={(e) => setBiome(e.target.value as Biome)} value={biome}>
            <option value="aquatic">Aquatic</option>
            <option value="grassland">Grassland</option>
            <option value="forest">Forest</option>
            <option value="desert">Desert</option>
            <option value="tundra">Tundra</option>
          </Select>
        </Field>
        <div>
          <Button onClick={endTurn} disabled={remainingMoves > 0}>
            End Turn
          </Button>
        </div>
      </div>
      <CanvasGrid
        grid={grid}
        units={units}
        currentTurnIndex={currentTurnIndex}
        remainingMoves={remainingMoves}
        setUnits={setUnits}
        setRemainingMoves={setRemainingMoves}
      />
    </div>
  );
};
