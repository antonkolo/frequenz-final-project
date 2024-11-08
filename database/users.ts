import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { User } from '../types/types';
import { sql } from './connect';

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
  SELECT * FROM users
  `;
  return users.map(postgresToGraphql);
});

export const getUserInsecure = cache(async (id: number) => {
  const [user] = await sql<User[]>`
  SELECT * FROM users where id = ${id}
  `;
  return postgresToGraphql(user);
});
