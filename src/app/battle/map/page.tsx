import { PageHeading } from '@/components';
import CanvasGrid from './CanvasGrid';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading>Map Battle Simulator</PageHeading>

      <CanvasGrid rows={10} cols={10} unitSize={50} />
    </div>
  );
}
