import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import Navigation from './Navigation';

type Props = {
  style: 'dark' | 'light';
};

export default function Header({ style }: Props) {
  return (
    <div
      className={
        style === 'dark' ? styles.container : styles['container--light']
      }
    >
      <header
        className={
          style === 'dark' ? styles['header-dark'] : styles['header-light']
        }
      >
        <Link href="/" className={styles['text-logo']}>
          Frequenz
        </Link>
        <Navigation style={style} />
      </header>
    </div>
  );
}
