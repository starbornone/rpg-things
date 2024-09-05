const SkeletonRow = () => (
  <div className="flex flex-col gap-2">
    <div className="h-4 w-full rounded bg-gray-100"></div>
    <div className="h-10 w-full rounded bg-gray-100"></div>
  </div>
);

export const SkeletonLoader = () => (
  <div className="grid w-full animate-pulse grid-cols-3 gap-4">
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </div>
);
