import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`INSERT INTO samples (title, user_id, source_url)
VALUES ('slapped bass', 1, 'https://utfs.io/f/tE9AkEwGtc0NMsxquo627lbZ1jEqLQWBFrnzkA3o9fc5y0Ui')
  `;
}

export async function down() {}
