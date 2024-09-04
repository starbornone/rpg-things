import { countSuccesses } from '@/utils';
import RollSet from './RollSet';

interface RollHistoryProps {
  rolls: number[][];
  successValue?: number;
}

export default function RollHistory({ rolls, successValue }: RollHistoryProps) {
  return (
    <div className="mx-auto mt-6 max-w-lg">
      {rolls
        ?.slice()
        .reverse()
        .map((rollSet, setIndex) => {
          const average = rollSet.reduce((sum, roll) => sum + roll, 0) / rollSet.length;
          const successCount = successValue ? countSuccesses(rollSet, successValue) : 0;

          return (
            <RollSet
              average={average}
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
