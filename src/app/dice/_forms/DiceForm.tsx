import { Field, Input, Label } from '@/components';

interface DiceFormProps {
  diceCount: number;
  diceSides: number;
  onDiceCountChange: (value: number) => void;
  onDiceSidesChange: (value: number) => void;
}

export function DiceForm({ diceCount, diceSides, onDiceCountChange, onDiceSidesChange }: DiceFormProps) {
  return (
    <>
      <Field>
        <Label htmlFor="dice-sides">Number of sides</Label>
        <Input
          id="dice-sides"
          onChange={(e) => onDiceSidesChange(parseInt(e.currentTarget.value))}
          type="number"
          value={diceSides}
        />
      </Field>
      <Field>
        <Label htmlFor="dice-count">Number of dice</Label>
        <Input
          id="dice-count"
          onChange={(e) => onDiceCountChange(parseInt(e.currentTarget.value))}
          type="number"
          value={diceCount}
        />
      </Field>
    </>
  );
}
