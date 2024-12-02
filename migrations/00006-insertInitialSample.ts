import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO samples (title, user_id, source_url, description, file_key) VALUES
    ('Sci-fi Title Sequence', 6, 'https://utfs.io/f/tE9AkEwGtc0Nn3bpNBHh24AwZPD1vpSgketY9s3naNcMC6UW', 'Epic cinematic sci-fi sound design perfect for title sequences and intros', 'tE9AkEwGtc0Nn3bpNBHh24AwZPD1vpSgketY9s3naNcMC6UW'),

    ('Mountain River Ambience', 5, 'https://utfs.io/f/tE9AkEwGtc0NurasH3pqiNltDMJH6SBngE0QuP3eW5mrcaw4', 'Peaceful recording of a mountain river, captured at dawn with pristine equipment', 'tE9AkEwGtc0NurasH3pqiNltDMJH6SBngE0QuP3eW5mrcaw4'),

    ('Dawn Chorus Ocean', 5, 'https://utfs.io/f/tE9AkEwGtc0NnuB4eth24AwZPD1vpSgketY9s3naNcMC6UW7', 'Beautiful morning bird songs mixed with distant ocean waves', 'tE9AkEwGtc0NnuB4eth24AwZPD1vpSgketY9s3naNcMC6UW7'),

    ('Taiko Drum Loop', 4, 'https://utfs.io/f/tE9AkEwGtc0NMfdDOOR627lbZ1jEqLQWBFrnzkA3o9fc5y0U', 'Traditional taiko drum performance, perfect for epic soundtracks', 'tE9AkEwGtc0NMfdDOOR627lbZ1jEqLQWBFrnzkA3o9fc5y0U'),

    ('Robot Pain SFX', 6, 'https://utfs.io/f/tE9AkEwGtc0NLyjHXF0b9hwafsJglZMtiFxTcyG7nN8eECmj', 'Unique robot sound effect expressing mechanical distress', 'tE9AkEwGtc0NLyjHXF0b9hwafsJglZMtiFxTcyG7nN8eECmj'),

    ('Tonal Sci-fi Whales', 2, 'https://utfs.io/f/tE9AkEwGtc0NlXwM9T5tRFwQJa7Y58js4M0h6ycoViA1zZIE', 'Synthesized whale-like sounds with a sci-fi twist', 'tE9AkEwGtc0NlXwM9T5tRFwQJa7Y58js4M0h6ycoViA1zZIE'),

    ('Crow Field Recording', 1, 'https://utfs.io/f/tE9AkEwGtc0NUm0HLno2vzsQBi6wIC5pFrEfqcYuOUdPX84b', 'Authentic crow calls recorded in natural habitat', 'tE9AkEwGtc0NUm0HLno2vzsQBi6wIC5pFrEfqcYuOUdPX84b'),

    ('Stone Door Impact', 3, 'https://utfs.io/f/tE9AkEwGtc0Nk0iGGcZcHT5NvAprb8IQ4y61VMxWuz3kdEnq', 'Heavy stone door movement, perfect for game sound design', 'tE9AkEwGtc0Nk0iGGcZcHT5NvAprb8IQ4y61VMxWuz3kdEnq'),

    ('Water Splash', 3, 'https://utfs.io/f/tE9AkEwGtc0NRIhEffqjuIXVFD8oU3mzSwtsKqQfP6xGWZHc', 'Clean water splash recording for foley purposes', 'tE9AkEwGtc0NRIhEffqjuIXVFD8oU3mzSwtsKqQfP6xGWZHc'),

    ('Glass Collision', 3, 'https://utfs.io/f/tE9AkEwGtc0NDuHTgkGzqNMUdYysGmFPHnIoK5OLkEuSjJpe', 'High-quality glass impact sound effect', 'tE9AkEwGtc0NDuHTgkGzqNMUdYysGmFPHnIoK5OLkEuSjJpe'),

    ('Crash Impact', 4, 'https://utfs.io/f/tE9AkEwGtc0NtTHJ4pwGtc0Nb5eWYQy71AzFpJ3VhEIPdisa', 'Heavy crash impact suitable for action sequences', 'tE9AkEwGtc0NtTHJ4pwGtc0Nb5eWYQy71AzFpJ3VhEIPdisa'),

    ('Paiste Crash Cymbal', 4, 'https://utfs.io/f/tE9AkEwGtc0N5NfvL1i3BKzJsvmUEcRphG1gCLi7FMwdPbWT', 'Professional recording of a Paiste PST5 17" crash cymbal', 'tE9AkEwGtc0N5NfvL1i3BKzJsvmUEcRphG1gCLi7FMwdPbWT'),

    ('Swoosh Effect', 3, 'https://utfs.io/f/tE9AkEwGtc0NUHaCZko2vzsQBi6wIC5pFrEfqcYuOUdPX84b', 'Clean swoosh sound effect recorded with MXL993', 'tE9AkEwGtc0NUHaCZko2vzsQBi6wIC5pFrEfqcYuOUdPX84b')
  `;
}

export async function down() {}
