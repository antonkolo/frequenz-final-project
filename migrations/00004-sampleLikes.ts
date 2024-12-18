import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`CREATE TABLE sample_likes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users ON DELETE cascade,
    sample_id integer NOT NULL REFERENCES samples ON DELETE cascade
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE sample_likes
  `;
}
