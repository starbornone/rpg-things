import { Field, Input, Label, Select } from '@/components';
import { characterUpdate } from '@/store/slices/characterSlice';
import { Character, Species } from '@/types';
import { useDispatch } from 'react-redux';

interface BioFormProps {
  character: Character;
}

export const BioForm = ({ character }: BioFormProps) => {
  const dispatch = useDispatch();

  function handleBioChange(path: string, value: any) {
    dispatch(characterUpdate({ path, value }));
  }

  return (
    <form className="grid w-full grid-cols-3 gap-4">
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" onChange={(e) => handleBioChange('name', e.currentTarget.value)} value={character.name} />
      </Field>
      <Field>
        <Label htmlFor="species">Species</Label>
        <Select
          id="species"
          onChange={(e) => handleBioChange('body.species', e.currentTarget.value as Species)}
          value={character.body.species}
        >
          <option value="human">Human</option>
        </Select>
      </Field>
      <Field>
        <Label htmlFor="gender">Gender</Label>
        <Input
          id="gender"
          onChange={(e) => handleBioChange('body.gender', e.currentTarget.value)}
          value={character.body.gender}
        />
      </Field>
      <Field>
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          onChange={(e) => handleBioChange('body.height', parseInt(e.currentTarget.value))}
          type="number"
          value={character.body.height}
        />
      </Field>
      <Field>
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          onChange={(e) => handleBioChange('body.weight', parseInt(e.currentTarget.value))}
          type="number"
          value={character.body.weight}
        />
      </Field>
      <Field>
        <Label htmlFor="age">Age (yrs)</Label>
        <Input
          id="age"
          onChange={(e) => handleBioChange('body.age', parseInt(e.currentTarget.value))}
          type="number"
          value={character.body.age}
        />
      </Field>
    </form>
  );
};
