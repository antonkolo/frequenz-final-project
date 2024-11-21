import { cache } from 'react';
import { postgresToGraphql } from '../graphql/transform';
import type { Session, User, UserWithPasswordHash } from '../types/types';
import { sql } from './connect';

export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.handle,
      users.id,
      users.created_at
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
  SELECT * FROM users
  `;
  return users.map(postgresToGraphql);
});

export const getUserInsecure = cache(async (handle: User['handle']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.handle,
      users.created_at
    FROM
      users
    WHERE
      handle = ${handle.toLowerCase()}
  `;
  return postgresToGraphql(user);
});

export const getUserByIdInsecure = cache(async (id: User['id']) => {
  const [user] = await sql<User[]>`
    SELECT
*
    FROM
      users
    WHERE
      id = ${id}
  `;
  return postgresToGraphql(user);
});

export const getUserWithPasswordHashInsecure = cache(
  async (handle: User['handle']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        handle = ${handle.toLowerCase()}
    `;
    return user;
  },
);

export const createUserInsecure = cache(
  async (
    handle: User['handle'],
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (handle, password_hash)
      VALUES
        (
          ${handle.toLowerCase()},
          ${passwordHash}
        )
      RETURNING
        users.id,
        users.handle
    `;
    return postgresToGraphql(user);
  },
);
