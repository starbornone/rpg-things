import { Heading, Text } from '@/components';

interface PageHeadingProps {
  children: React.ReactNode;
  text?: string | string[];
}

export function PageHeading({ children, text }: PageHeadingProps) {
  return (
    <div>
      <Heading className="mb-4" level={1}>
        {children}
      </Heading>
      {text && Array.isArray(text)
        ? text.map((txt, index) => (
            <Text className="my-4" key={index}>
              {txt}
            </Text>
          ))
        : text && <Text>{text}</Text>}
    </div>
  );
}
