import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { Category } from '../types/types';
import { sql } from './connect';

export const getCategoriesInsecure = cache(async () => {
  const categories = await sql<Category[]>`
  SELECT * FROM categories
  `;
  return categories.map(postgresToGraphql);
});

export const getCategoryInsecure = cache(async (id: number) => {
  const [category] = await sql<Category[]>`
  SELECT * FROM categories where id = ${id}
  `;
  return postgresToGraphql(category);
});
