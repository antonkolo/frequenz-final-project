import { cache } from 'react';
import type { Session, User } from '../types/types';
import { sql } from './connect';

export const getValidSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    SELECT
      sessions.id,
      sessions.token,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND expiry_timestamp > now()
  `;
  return session;
});

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.id,
      sessions.token
  `;
  return session;
});

// Secure database queries start here
// All queries not marked `Insecure` use session tokens to authenticate the user

export const createSessionInsecure = cache(
  async (token: Session['token'], userId: User['id']) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.id,
        sessions.token,
        sessions.user_id
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        expiry_timestamp < now()
    `;

    return session;
  },
);
