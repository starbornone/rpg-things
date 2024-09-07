'use client';

import { Button, Field, Label, Select } from '@/components';
import { Biome } from '@/types';

interface MapGenerationFormProps {
  biome: Biome;
  generateMap: () => void;
  setBiome: React.Dispatch<React.SetStateAction<Biome>>;
}

export const MapGenerationForm = ({ biome, generateMap, setBiome }: MapGenerationFormProps) => {
  return (
    <div className="flex items-end gap-4">
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
        <Button onClick={generateMap}>Generate New Map</Button>
      </div>
    </div>
  );
};
