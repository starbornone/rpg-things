interface DiceProps {
  number: number;
  type: 4 | 6 | 8 | 10 | 12 | 20;
}

export const Dice = ({ number, type = 6 }: DiceProps) => {
  return <div></div>;
};
