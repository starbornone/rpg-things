import { Heading, Text } from '@/components';

interface SectionHeadingProps {
  children: React.ReactNode;
  text?: string;
}

export default function SectionHeading({ children, text }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between">
      <Heading level={2}>{children}</Heading>
      {text && <Text>{text}</Text>}
    </div>
  );
}
