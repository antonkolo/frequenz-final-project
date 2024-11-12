import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
      INSERT INTO
        sample_categories (category_id, sample_id)
      VALUES
        (
          9, 1
        )
    `;
}

export async function down() {}
