import { Attributes, Skills } from '@/types';

export type TypeAttributes = {
  [key: string]: [keyof Attributes, keyof Skills];
};
