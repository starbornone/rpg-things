import { Heading, Text } from '@/components';

interface PageHeadingProps {
  children: React.ReactNode;
  text?: string;
}

export default function PageHeading({ children, text }: PageHeadingProps) {
  return (
    <div>
      <Heading className="mb-3" level={1}>
        {children}
      </Heading>
      {text && <Text>{text}</Text>}
    </div>
  );
}
