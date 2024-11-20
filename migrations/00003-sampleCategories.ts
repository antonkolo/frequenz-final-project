import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`CREATE TABLE sample_categories (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer NOT NULL REFERENCES categories,
    sample_id integer NOT NULL REFERENCES samples ON DELETE cascade
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE sample_categories
  `;
}
