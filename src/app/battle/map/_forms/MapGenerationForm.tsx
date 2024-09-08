'use client';

import { Button, Field, Label, Select } from '@/components';
import { RootState } from '@/store';
import { generateNewMap, setBiome } from '@/store/slices/mapSlice';
import { Biome } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

export const MapGenerationForm: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current biome from the store
  const biome: Biome = useSelector((state: RootState) => state.map.biome);

  // Handle biome selection
  const handleBiomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setBiome(e.target.value as Biome));
  };

  // Handle map generation
  const handleGenerateMap = () => {
    dispatch(generateNewMap());
  };

  return (
    <div className="flex items-end gap-4">
      <Field>
        <Label htmlFor="Select biome">Select biome</Label>
        <Select id="Select biome" onChange={handleBiomeChange} value={biome}>
          <option value="aquatic">Aquatic</option>
          <option value="grassland">Grassland</option>
          <option value="forest">Forest</option>
          <option value="desert">Desert</option>
          <option value="tundra">Tundra</option>
        </Select>
      </Field>
      <div>
        <Button onClick={handleGenerateMap}>Generate New Map</Button>
      </div>
    </div>
  );
};
