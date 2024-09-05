import { Metadata } from 'next';
import DicePage from './DicePage';

export const metadata: Metadata = {
  title: 'Basic Dice Roller',
  description:
    'This is a simple dice roller application. You can specify the number of dice and the number of sides on each die to roll. Click the "Roll" button to roll the dice and see the results. The chart below will display the count of each side rolled so far.',
};

export default function Page() {
  return <DicePage />;
}
