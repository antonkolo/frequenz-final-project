import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`CREATE TABLE samples (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(255) NOT NULL,
    source_url varchar(510) NOT NULL,
    user_id integer NOT NULL REFERENCES users,
    created_at timestamp NOT NULL default CURRENT_TIMESTAMP,
    edited_at timestamp NOT NULL default CURRENT_TIMESTAMP
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE samples
  `;
}
