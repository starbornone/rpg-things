'use client';

import { Button, Field, Label, Select } from '@/components';
import {
  selectBiomes,
  selectHeightMap,
  selectIsWorldGenerated,
  selectLakes,
  selectMapType,
  selectRainfallMap,
  selectRivers,
  selectSettlements,
  selectTemperature,
} from '@/store/selectors';
import { generateWorld, setMapType } from '@/store/slices/worldSlice';
import { drawMap, drawRainfallOverlay, drawTemperatureOverlay } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorldPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();

  const mapType = useSelector(selectMapType);
  const heightMap = useSelector(selectHeightMap);
  const rainfallMap = useSelector(selectRainfallMap);
  const temperature = useSelector(selectTemperature);
  const biomes = useSelector(selectBiomes);
  const rivers = useSelector(selectRivers);
  const lakes = useSelector(selectLakes);
  const settlements = useSelector(selectSettlements);
  const isWorldGenerated = useSelector(selectIsWorldGenerated);

  const [showRainfallOverlay, setShowRainfallOverlay] = useState(false);
  const [showTemperatureOverlay, setShowTemperatureOverlay] = useState(false);

  function handleMapTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setMapType(e.target.value as typeof mapType));
  }

  function handleRainfallOverlayChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShowRainfallOverlay(e.target.checked);
  }

  function handleTemperatureOverlayChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShowTemperatureOverlay(e.target.checked);
  }

  function handleGenerateWorld() {
    dispatch(generateWorld());
  }

  useEffect(() => {
    if (!isWorldGenerated || !canvasRef.current || !biomes || !rivers || !lakes || !heightMap) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 300;
    const height = 300;
    const tileSize = 3;
    canvas.width = width * tileSize;
    canvas.height = height * tileSize;

    // Draw the base map
    drawMap(tileSize, ctx, biomes, rivers, lakes, heightMap);

    // Overlay rainfall if checked
    if (showRainfallOverlay && rainfallMap) {
      drawRainfallOverlay(ctx, rainfallMap, width, height, tileSize);
    }

    // Overlay temperature if checked
    if (showTemperatureOverlay && temperature) {
      drawTemperatureOverlay(ctx, temperature, width, height, tileSize);
    }

    // Draw the settlements in red
    if (settlements && settlements.length > 0) {
      settlements.forEach((settlement) => {
        const { x, y } = settlement.position;

        // Set the color to red for settlements
        ctx.fillStyle = 'red';

        // Draw a red square for the settlement
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      });
    }
  }, [
    isWorldGenerated,
    showRainfallOverlay,
    showTemperatureOverlay,
    biomes,
    rivers,
    lakes,
    rainfallMap,
    temperature,
    settlements,
  ]);

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 items-center gap-4">
        <Field className="flex gap-2">
          <Label htmlFor="show-rainfall-overlay">Rainfall Overlay</Label>
          <input
            checked={showRainfallOverlay}
            id="show-rainfall-overlay"
            onChange={handleRainfallOverlayChange}
            type="checkbox"
          />
        </Field>
        <Field className="flex gap-2">
          <Label htmlFor="show-temperature-overlay">Temperature Overlay</Label>
          <input
            checked={showTemperatureOverlay}
            id="show-temperature-overlay"
            onChange={handleTemperatureOverlayChange}
            type="checkbox"
          />
        </Field>
        <Field>
          <Select id="map-type" value={mapType} onChange={handleMapTypeChange}>
            <option value="archipelago">Archipelago</option>
            <option value="pangea">Pangea</option>
            <option value="continents">Continents</option>
          </Select>
        </Field>
        <Button onClick={handleGenerateWorld}>Generate World</Button>
      </div>
      <canvas ref={canvasRef} className="border border-gray-500" />
      <div className="my-4 grid grid-cols-1 gap-4">
        {settlements &&
          settlements.map((settlement, index) => (
            <div key={index} className="">
              <div className="font-bold">{settlement.name}</div>
              <div>
                Map Coordinates: x:{settlement.position.x}, y:{settlement.position.y}
              </div>
              <div>
                Population: {settlement.population.total} ({settlement.population.working} working,{' '}
                {settlement.population.unemployed} unemployed)
              </div>
              <div>
                <div>Available Resources</div>
                <div className="text-sm">
                  <div className="flex gap-2">
                    <div className="font-semibold">Flora</div>
                    <div>{settlement.resources.flora.join(', ')}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-semibold">Fauna</div>
                    <div>{settlement.resources.fauna.join(', ')}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-semibold">Minerals</div>
                    <div>{settlement.resources.minerals.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
