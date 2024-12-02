import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO users (handle, password_hash, bio) VALUES
    ('sound_explorer', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Field recording enthusiast capturing unique sounds from around the world. Always on the hunt for interesting sonic landscapes.'),
    ('synth_wizard', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Modular synthesis expert. Creating otherworldly sounds one patch at a time. Loves experimenting with new sound design techniques.'),
    ('foley_artist', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Professional foley artist with 10+ years experience. Specializing in creating unique sound effects for film and games.'),
    ('percussion_master', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Drummer and percussion enthusiast. Recording and sharing high-quality drum samples for producers worldwide.'),
    ('ambient_collector', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Dedicated to capturing peaceful and atmospheric sounds. Nature recordings specialist.'),
    ('sfx_designer', '$2b$12$cc1KoSkBiPZMrN1HQ1xMnulNKdIDFHty4/6Lya6c0BuiQQLPCeeEq', 'Sound designer focusing on sci-fi and fantasy effects. Always experimenting with new processing techniques.')
  `;
}

export async function down() {}
