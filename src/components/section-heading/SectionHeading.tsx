import { Heading, Text } from '@/components';

interface SectionHeadingProps {
  children: React.ReactNode;
  text?: string;
}

export function SectionHeading({ children, text }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between">
      <Heading level={2}>{children}</Heading>
      {text && <Text>{text}</Text>}
    </div>
  );
}
