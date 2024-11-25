import Link from 'next/link';
import React from 'react';
import styles from './FeaturesList.module.scss';

export function FeaturesList({}) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <article className={styles.feature}>
          <h2>Discover New Sonic Possibilities</h2>
          <div>
            <p>
              Dive into our ever-growing library of high-quality sound samples,
              spanning a wide range of genres and styles. Find the perfect
              starting point for your next musical creation, from vintage synth
              textures to field recordings captured around the world.
            </p>
            <Link href="/sounds">Explore Sounds</Link>
          </div>
        </article>
        <article className={styles.feature}>
          <h2>Collaborate with the Community</h2>
          <div>
            <p>
              Connect with like-minded artists and producers in the FREQUENZ
              community. Share your own sound samples, provide feedback, and
              find inspiration through curated playlists and collections
              contributed by fellow creators.
            </p>
            <Link href="/sign-up">Create Profile</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
