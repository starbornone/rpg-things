'use client';

import { updateMap } from '@/store/slices/npcSlice';
import { Character, Grid, WeaponItem } from '@/types';
import {
  calculateEuclideanDistanceWithHeight,
  calculateManhattanDistance,
  calculateMoveDistance,
  getMovableTiles,
  getTerrainColor,
} from '@/utils';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface CanvasGridProps {
  grid: Grid | null;
  units: Character[];
  currentTurnIndex: number;
  availableWeapons: WeaponItem[];
  combatState: {
    attacker: number | null;
    defender: number | null;
    weapon: string | null;
    attack: string | null;
  };
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  grid,
  units,
  currentTurnIndex,
  availableWeapons,
  combatState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileSize = 64;
  const dispatch = useDispatch();

  const moveUnit = (direction: string) => {
    const unit = units[currentTurnIndex];
    const { map } = unit;

    if (!map || map.remainingMoves <= 0) return;

    let newX = map.x;
    let newY = map.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, map.y - 1);
        break;
      case 'down':
        newY = Math.min(grid!.height - 1, map.y + 1);
        break;
      case 'left':
        newX = Math.max(0, map.x - 1);
        break;
      case 'right':
        newX = Math.min(grid!.width - 1, map.x + 1);
        break;
    }

    const distanceMoved = calculateMoveDistance(map.x, map.y, newX, newY);

    if (distanceMoved <= map.remainingMoves) {
      dispatch(
        updateMap({
          id: unit.id,
          newX,
          newY,
          remainingMoves: map.remainingMoves - distanceMoved,
        })
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (units[currentTurnIndex] && units[currentTurnIndex].map!.remainingMoves > 0) {
        switch (e.key) {
          case 'ArrowUp':
            moveUnit('up');
            break;
          case 'ArrowDown':
            moveUnit('down');
            break;
          case 'ArrowLeft':
            moveUnit('left');
            break;
          case 'ArrowRight':
            moveUnit('right');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [units, currentTurnIndex]);

  /**
   * useEffect hook that renders the grid, terrain, and units on the canvas whenever
   * the grid, units, or current turn index changes.
   * It sets the canvas size based on the grid dimensions and then draws the terrain tiles,
   * movable tiles, and units. It also updates the health bar for each unit and highlights
   * the current unit's tile.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx && grid) {
      canvas.width = grid.width * tileSize;
      canvas.height = grid.height * tileSize;

      // Draw the grid with terrain types
      grid.map.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
          ctx.fillStyle = getTerrainColor(tile.terrainType, tile.height, 'aquatic');
          ctx.fillRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize);

          ctx.strokeStyle = 'rgb(113 113 122)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize);
        });
      });

      const currentUnit = units[currentTurnIndex];
      const { x: unitX, y: unitY } = currentUnit.map!;
      const movableTiles = getMovableTiles(unitX, unitY, currentUnit.map!.remainingMoves, grid);

      // Highlight movable tiles for the current unit
      ctx.fillStyle = 'rgba(173, 216, 230, 0.5)';
      movableTiles.forEach(({ x, y }) => {
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      });

      // Draw each unit on the grid
      units.forEach((unit, index) => {
        if (unit.map?.image.loaded) {
          ctx.drawImage(unit.map.image.element!, unit.map.x * tileSize, unit.map.y * tileSize, tileSize, tileSize);

          // Draw health bar
          ctx.fillStyle = '#333';
          ctx.fillRect(unit.map.x * tileSize, (unit.map.y + 1) * tileSize - 6, tileSize, 5);
          const hpBarWidth = (unit.health.currentHp / unit.health.maxHp) * tileSize;
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
          ctx.fillRect(unit.map.x * tileSize, (unit.map.y + 1) * tileSize - 6, hpBarWidth, 5);

          // Highlight the current unit
          if (index === currentTurnIndex) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(unit.map.x * tileSize, unit.map.y * tileSize, tileSize, tileSize);
          }
        }
      });

      // Check if a weapon is selected and show reach or range
      const selectedWeapon = availableWeapons.find((w) => w.id === combatState.weapon);
      if (combatState.attacker !== null && selectedWeapon) {
        const attackerUnit = units[combatState.attacker];

        // Loop through all units to highlight possible targets
        // Example for highlighting units in range
        units.forEach((unit) => {
          if (unit.id !== attackerUnit.id) {
            const defenderHeight = grid.map[unit.map!.y][unit.map!.x].height; // Get height for defender
            const attackerHeight = grid.map[attackerUnit.map!.y][attackerUnit.map!.x].height; // Get height for attacker

            const distanceWithHeight = calculateManhattanDistance(
              attackerUnit.map!.x,
              attackerUnit.map!.y,
              // attackerHeight,
              unit.map!.x,
              unit.map!.y,
              // defenderHeight
            );

            // Show reach for melee weapons
            selectedWeapon.attacks.forEach((attack) => {
              if (attack.type !== 'ranged' && attack.reach && distanceWithHeight <= attack.reach) {
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.lineWidth = 3;
                ctx.strokeRect(unit.map!.x * tileSize, unit.map!.y * tileSize, tileSize, tileSize);
              }
            });

            // Show range for ranged weapons
            selectedWeapon.attacks.forEach((attack) => {
              if (attack.type === 'ranged') {
                const [halfRange, maxRange] = attack.range.split('/').map(Number);
                const distanceWithHeight = calculateEuclideanDistanceWithHeight(
                  attackerUnit.map!.x,
                  attackerUnit.map!.y,
                  attackerHeight,
                  unit.map!.x,
                  unit.map!.y,
                  defenderHeight
                );

                if (distanceWithHeight <= maxRange) {
                  ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(unit.map!.x * tileSize, unit.map!.y * tileSize, tileSize, tileSize);
                }
              }
            });
          }
        });
      }
    }
  }, [grid, units, currentTurnIndex, availableWeapons, combatState]);

  return <canvas ref={canvasRef} className="border border-gray-500" />;
};
