import { Attributes, Skills } from '@/types';

export type AttackTypeAttributes = {
  [key: string]: [keyof Attributes, keyof Skills];
};
