import { Metadata } from 'next';
import CharacterCreatePage from './CharacterCreatePage';

export const metadata: Metadata = {
  title: 'Character Create',
  description: '',
};

export default function Page() {
  return <CharacterCreatePage />;
}
