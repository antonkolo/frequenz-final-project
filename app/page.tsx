import Link from 'next/link';
import ArrowIcon from './components/ArrowIcon/ArrowIcon';
import { FeaturesList } from './components/FeaturesList/FeaturesList';
import RandomWavePlayer from './components/RandomWavePlayer/RandomWavePlayer';
import styles from './page.module.scss';

// import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles['inner-container']}>
          <div className={styles['content-left']}>
            <hgroup>
              <h1 className={styles.title}>Your Next Sound Awaits.</h1>
              <p className={styles.subtitle}>
                Explore an ever-expanding universe of sound samples, from
                studio-grade essentials to unique sonic experiments
              </p>
            </hgroup>
            <Link href={'/sounds'} className={styles['explore-button']}>
              <ArrowIcon color="#fff" size="26" /> Explore now
            </Link>
          </div>
          <RandomWavePlayer />
        </div>
        <div className={styles['ticker-container']}>
          <div className={styles.ticker}>
            <span>
              Best sounds Best sounds Best sounds Best sounds Best sounds
            </span>
            <span>
              Best sounds Best sounds Best sounds Best sounds Best sounds
            </span>
          </div>
          <div className={styles['ticker-black']}>
            <span>For free For free For free For free For free For free</span>
            <span>For free For free For free For free For free For free </span>
          </div>
        </div>
      </section>

      <FeaturesList />
    </main>
  );
}
