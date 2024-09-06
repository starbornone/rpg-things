import { Metadata } from 'next';
import BattlePage from './BattlePage';

export const metadata: Metadata = {
  title: 'Basic Battle Simulator',
  description: '',
};

export default function Page() {
  return <BattlePage />;
}
