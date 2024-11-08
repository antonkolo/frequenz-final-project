import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { Sample } from '../types/types';
import { sql } from './connect';

export const getSamplesInsecure = cache(async () => {
  const samples = await sql<Sample[]>`
  SELECT * FROM samples
  `;
  return samples.map(postgresToGraphql);
});
