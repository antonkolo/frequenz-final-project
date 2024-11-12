import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { SampleCategory } from '../types/types';
import { sql } from './connect';

// queries

export const getSampleCategoriesForSample = cache(async (sampleId: number) => {
  const sampleCategories = await sql<SampleCategory[]>`
    SELECT * from sample_categories WHERE sample_id=${sampleId}
    `;
  return sampleCategories.map(postgresToGraphql);
});

export const getSamplesForCategory = cache(async (categoryId: number) => {
  const sampleCategories = await sql<SampleCategory[]>`
    SELECT * FROM sample_categories
  WHERE category_id=${categoryId}
  `;
  return sampleCategories.map(postgresToGraphql);
});

// mutations

export const createSampleCategoryInsecure = cache(
  async (sampleId: number, categoryId: number) => {
    const [newSampleCategory] = await sql<SampleCategory[]>`
      INSERT into sample_categories (sample_id, category_id) VALUES (${sampleId}, ${categoryId}) RETURNING *
  `;
    return postgresToGraphql(newSampleCategory);
  },
);

export const deleteSampleCategoryInsecure = cache(async (id: number) => {
  const [deletedSampleCategory] = await sql<SampleCategory[]>`
      DELETE from sample_categories WHERE id=${id} RETURNING *
  `;
  return postgresToGraphql(deletedSampleCategory);
});
