import { Metadata } from 'next';
import SuccessPage from './SuccessPage';

export const metadata: Metadata = {
  title: 'Success Dice Roller',
  description:
    'This is a dice roller application which counts successes rolled in a pool of dice. You can specify the minimum number required for a die roll to be considered a success, the number of dice, and the number of sides on each die to roll. Click the "Roll" button to roll the dice and see the results. The chart below will display the count of each side rolled so far.',
};

export default function Page() {
  return <SuccessPage />;
}
