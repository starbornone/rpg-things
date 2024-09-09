import { Metadata } from 'next';
import CharacterPage from './CharacterPage';

export const metadata: Metadata = {
  title: 'Character Sheet',
  description: '',
};

export default function Page() {
  return <CharacterPage />;
}
