import { SectionHeading } from '@/components';
import { Character } from '@/types';

interface DerivedStatsProps {
  character: Character;
}

export function DerivedStats({ character }: DerivedStatsProps) {
  return (
    <div>
      <SectionHeading>Derived Values</SectionHeading>
      <div className="grid w-full grid-cols-3 gap-4">
        <div>
          <div>Health</div>
          <div>
            {character.health.currentHp}/{character.health.maxHp}
          </div>
        </div>
        <div>
          <div>Carry</div>
          <div>{character.carryWeight}</div>
        </div>
        <div>
          <div>Lift</div>
          <div>{character.lift}</div>
        </div>
        <div>
          <div>Speed</div>
          <div>{character.speed}</div>
        </div>
        <div>
          <div>Move</div>
          <div>{character.move}</div>
        </div>
      </div>
    </div>
  );
}
