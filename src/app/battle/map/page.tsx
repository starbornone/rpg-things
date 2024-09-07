import { PageHeading } from '@/components';
import { MapContainer } from './MapContainer';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading text="Welcome to the Map Battle Simulator, a dynamic and interactive tool for generating and exploring tactical battle maps. Choose your preferred biome—ranging from aquatic to tundra—and watch as the terrain evolves in real-time, complete with height variations and diverse terrain types. Whether you're strategizing for an intense battle or simply exploring different environments, this simulator lets you visualize various landscapes, from deep waters and rolling plains to towering mountains and dense forests. Dive in and start planning your next move in this immersive tactical world!">
        Map Battle Simulator
      </PageHeading>

      <MapContainer />
    </div>
  );
}
