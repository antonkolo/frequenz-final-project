import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import Navigation from './Navigation';

export default function Header() {
  return (
    <div className={styles.container}>
      <header className={styles['header-dark']}>
        <Link href="/" className={styles['text-logo']}>
          Frequenz
        </Link>
        <Navigation />
      </header>
    </div>
  );
}
