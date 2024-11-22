import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { Sample } from '../types/types';
import { sql } from './connect';

// insecure queries
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

export const createSampleInsecure = cache(
  async ({
    title,
    userId,
    sourceUrl,
  }: {
    title: string;
    userId: number;
    sourceUrl: string;
  }) => {
    const [newSample] = await sql<Sample[]>`
      INSERT into samples (title, user_id, source_url) VALUES (${title}, ${userId}, ${sourceUrl}) RETURNING *
  `;
    return postgresToGraphql(newSample);
  },
);

export const deleteSampleInsecure = cache(async (id: number) => {
  const [deletedSample] = await sql<Sample[]>`
      DELETE from samples WHERE id=${id} RETURNING *
  `;
  return postgresToGraphql(deletedSample);
});

export const editSampleInsecure = cache(
  async (id: number, newTitle: string) => {
    const [updatedSample] = await sql<Sample[]>`
      UPDATE samples SET title=${newTitle} WHERE id=${id} RETURNING *
  `;
    return postgresToGraphql(updatedSample);
  },
);

// secure queries

export const deleteSample = cache(
  async (sessionToken: string, id: number, userId: number) => {
    const [sample] = await sql<Sample[]>`
    DELETE FROM samples USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND samples.id = ${id}
      AND samples.user_id = ${userId}
    RETURNING
      samples.*
  `;

    return postgresToGraphql(sample);
  },
);

export const createSample = cache(
  async (
    sessionToken: string,
    newSample: Omit<Sample, 'id' | 'createdAt' | 'editedAt'>,
  ) => {
    const [sample] = await sql<Sample[]>`
      INSERT INTO
        samples (title, user_id, source_url, description) (
          SELECT
            ${newSample.title},
            ${newSample.userId},
            ${newSample.sourceUrl},
            ${newSample.description}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        *
    `;

    return postgresToGraphql(sample);
  },
);
