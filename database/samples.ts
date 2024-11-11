import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { Sample } from '../types/types';
import { sql } from './connect';

export const getSamplesInsecure = cache(async () => {
  const samples = await sql<Sample[]>`
  SELECT * FROM samples
  `;
  return samples.map((sample) => ({
    ...postgresToGraphql(sample),
    userId: sample.userId, // Keep the userId for resolving the user field
  }));
});

export const getSampleInsecure = cache(async (id: number) => {
  const [sample] = await sql<Sample[]>`
  SELECT * FROM samples
  WHERE id= ${id}
  `;

  return postgresToGraphql(sample);
});

export const getSamplesForUser = cache(async (userId: number) => {
  const samples = await sql<Sample[]>`
    SELECT * FROM samples
  WHERE user_id=${userId}
  `;
  return samples.map(postgresToGraphql);
});
