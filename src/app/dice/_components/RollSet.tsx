import clsx from 'clsx';

interface RollSetProps {
  average: number;
  rollSet: number[];
  setIndex: number;
  successCount: number;
  successValue?: number;
}

export default function RollSet({ average, rollSet, setIndex, successCount, successValue }: RollSetProps) {
  return (
    <div className="my-6">
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        {rollSet.map((roll, rollIndex) => (
          <div
            className={clsx(
              'w-8 rounded px-2 py-1 text-center font-mono text-gray-900 dark:text-white',
              successValue && roll >= successValue
                ? 'bg-emerald-500 font-semibold dark:bg-emerald-700'
                : 'bg-gray-200 dark:bg-gray-800'
            )}
            key={`${setIndex}-${rollIndex}`}
          >
            {roll}
          </div>
        ))}
        <div className="text-center text-sm">
          Average: <span className="font-semibold">{average.toFixed(2)}</span>
        </div>
        {successValue && (
          <div className="text-right text-sm">
            Successes: <span className="font-semibold">{successCount.toFixed(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
