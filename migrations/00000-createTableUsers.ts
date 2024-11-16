import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  handle: z.string(),
  password: z.string(),
});

export async function up(sql: Sql) {
  await sql`CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    handle varchar(100) NOT NULL,
    password_hash varchar(72) NOT NULL,
    created_at timestamp NOT NULL default CURRENT_TIMESTAMP
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
  `;
}
