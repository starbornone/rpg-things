import { Metadata } from 'next';
import AttributePage from './AttributePage';

export const metadata: Metadata = {
  title: 'Attributes & Skills',
  description:
    "On this page, you can view and modify your character's core Attributes and Skills, fine-tuning their capabilities to suit the challenges they face. Whether you're building a character focused on physical prowess, social influence, or intellectual mastery, balancing these elements will be key to your success in the game.",
};

export default function Page() {
  return <AttributePage />;
}
