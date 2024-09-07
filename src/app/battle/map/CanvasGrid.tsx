'use client';

import { Character, Grid } from '@/types';
import { getTerrainColor } from '@/utils';
import { useEffect, useRef } from 'react';

interface CanvasGridProps {
  grid: Grid | null;
  units: Character[];
  currentTurnIndex: number;
  remainingMoves: number;
  setUnits: React.Dispatch<React.SetStateAction<Character[]>>;
  setRemainingMoves: React.Dispatch<React.SetStateAction<number>>;
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  grid,
  units,
  currentTurnIndex,
  remainingMoves,
  setUnits,
  setRemainingMoves,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileSize = 64;

  // Function to handle unit movement
  const moveUnit = (direction: string) => {
    if (remainingMoves <= 0) return; // No more moves available
    const unit = units[currentTurnIndex];
    const { map } = unit;

    if (!map) return;

    let newX = map.x;
    let newY = map.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, map.y - 1); // Move up one tile
        break;
      case 'down':
        newY = Math.min(grid!.height - 1, map.y + 1); // Move down one tile
        break;
      case 'left':
        newX = Math.max(0, map.x - 1); // Move left one tile
        break;
      case 'right':
        newX = Math.min(grid!.width - 1, map.x + 1); // Move right one tile
        break;
    }

    const updatedUnits = [...units];
    updatedUnits[currentTurnIndex] = {
      ...unit,
      map: {
        ...map,
        x: newX,
        y: newY,
      },
    };

    setUnits(updatedUnits);
    setRemainingMoves(remainingMoves - 1); // Decrement remaining moves after a successful move
  };

  // Handle keyboard input for movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (remainingMoves > 0) {
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
  }, [remainingMoves, units, currentTurnIndex]);

  // Render the canvas, including terrain and units
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx && grid) {
      canvas.width = grid.width * tileSize;
      canvas.height = grid.height * tileSize;

      // Render terrain tiles
      grid.map.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
          ctx.fillStyle = getTerrainColor(tile.terrainType, tile.height, 'aquatic');
          ctx.fillRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize);

          ctx.strokeStyle = 'rgb(113 113 122)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(colIndex * tileSize, rowIndex * tileSize, tileSize, tileSize);
        });
      });

      // Render units if their image has been loaded
      units.forEach((unit, index) => {
        if (unit.map?.loaded) {
          // Draw the character image at map coordinates
          ctx.drawImage(unit.map.image, unit.map.x * tileSize, unit.map.y * tileSize, tileSize, tileSize);

          // Draw the HP bar background
          ctx.fillStyle = '#333'; // Dark background for HP bar
          ctx.fillRect(unit.map.x * tileSize, (unit.map.y + 1) * tileSize - 6, tileSize, 5); // Position just below the character

          // Draw the HP bar foreground
          const hpBarWidth = (unit.health.currentHp / unit.health.maxHp) * tileSize;
          ctx.fillStyle = '#FF0000'; // Red for HP
          ctx.fillRect(unit.map.x * tileSize, (unit.map.y + 1) * tileSize - 6, hpBarWidth, 5);

          // Highlight the current unit
          if (index === currentTurnIndex) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(unit.map.x * tileSize, unit.map.y * tileSize, tileSize, tileSize);
          }
        }
      });
    }
  }, [grid, units, currentTurnIndex]);

  return <canvas ref={canvasRef} className="border border-gray-500" />;
};
