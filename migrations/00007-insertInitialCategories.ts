import type { Sql } from 'postgres';

const categories = [
  { name: 'Drums' },
  { name: 'Synthesizers' },
  { name: 'Guitar' },
  { name: 'Brass' },
  { name: 'Field Recordings' },
  { name: 'Vocals' },
  { name: 'Keys' },
  { name: 'Pads' },
  { name: 'Bass' },
  { name: 'Percussion' },
];

export async function up(sql: Sql) {
  for (const category of categories) {
    await sql`
      INSERT INTO
        categories (name)
      VALUES
        (
${category.name}
        )
    `;
  }
}

export async function down() {}
