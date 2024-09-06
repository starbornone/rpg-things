import { RollSet } from '@/features';
import { countSuccesses } from '@/utils';

interface RollHistoryProps {
  rolls: number[][];
  successValue?: number;
}

export function RollHistory({ rolls, successValue }: RollHistoryProps) {
  return (
    <div className="mx-auto my-6 flex max-w-lg flex-col gap-4">
      {rolls
        ?.slice()
        .reverse()
        .map((rollSet, setIndex) => {
          const average = rollSet.reduce((sum, roll) => sum + roll, 0) / rollSet.length;
          const successCount = successValue ? countSuccesses(rollSet, successValue) : 0;

          return (
            <RollSet
              average={average}
              key={setIndex}
              rollSet={rollSet}
              setIndex={setIndex}
              successCount={successCount}
              successValue={successValue}
            />
          );
        })}
    </div>
  );
}
