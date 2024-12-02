import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO sample_categories (sample_id, category_id) VALUES
    (1, 2), -- Sci-fi Title -> Synthesizers
    (1, 8), -- Sci-fi Title -> Pads
    (2, 5), -- Mountain River -> Field Recordings
    (3, 5), -- Dawn Chorus -> Field Recordings
    (4, 1), -- Taiko Drum -> Drums
    (4, 10), -- Taiko Drum -> Percussion
    (5, 2), -- Robot Pain -> Synthesizers
    (6, 2), -- Sci-fi Whales -> Synthesizers
    (6, 8), -- Sci-fi Whales -> Pads
    (7, 5), -- Crow Field -> Field Recordings
    (8, 5), -- Stone Door -> Field Recordings
    (8, 10), -- Stone Door -> Percussion
    (9, 5), -- Water Splash -> Field Recordings
    (10, 10), -- Glass Collision -> Percussion
    (11, 10), -- Crash Impact -> Percussion
    (12, 1), -- Paiste Crash -> Drums
    (12, 10), -- Paiste Crash -> Percussion
    (13, 5)  -- Swoosh Effect -> Field Recordings
  `;
}

export async function down() {}
