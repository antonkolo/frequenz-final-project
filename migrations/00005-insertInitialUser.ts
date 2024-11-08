import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`INSERT INTO users (handle, password_hash)
VALUES ('admin', '$2a$12$BZepRTa6yVvJS9jx7UEEs.r2k8x2bGeNqTnnDzhysPR4aEp3.zU7C
')
  `;
}

export async function down() {}
