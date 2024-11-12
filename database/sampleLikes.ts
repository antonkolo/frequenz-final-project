import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { SampleLike } from '../types/types';
import { sql } from './connect';

// queries

export const getSampleLikesForUser = cache(async (userId: number) => {
  const samples = await sql<SampleLike[]>`
    SELECT * FROM sample_likes
  WHERE user_id=${userId}
  `;
  return samples.map(postgresToGraphql);
});

// mutations

export const createSampleLikeInsecure = cache(
  async (userId: number, sampleId: number) => {
    const [sampleLike] = await sql<SampleLike[]>`
      INSERT into sample_likes (user_id, sample_id) VALUES (${userId}, ${sampleId}) RETURNING *
  `;
    return postgresToGraphql(sampleLike);
  },
);

export const deleteSampleLikeInsecure = cache(async (id: number) => {
  const [deletedSampleLike] = await sql<SampleLike[]>`
      DELETE from sample_likes WHERE id=${id} RETURNING *
  `;
  return postgresToGraphql(deletedSampleLike);
});
