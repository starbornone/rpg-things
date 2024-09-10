import { Metadata } from 'next';
import WorldPage from './WorldPage';

export const metadata: Metadata = {
  title: 'World',
  description: '',
};

export default function Page() {
  return <WorldPage />;
}
