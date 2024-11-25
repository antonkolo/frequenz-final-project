import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['inner-container']}>
        <div className={styles['content-left']}>
          <a className={styles['text-logo']}>Frequenz</a>
          <Link href="https://github.com/antonkolo" target="_blank">
            © 2024 anton kolo
          </Link>
        </div>
        <ul className={styles['link-list']}>
          <li>
            <Link href="/">Legal Notice</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
          <li>
            <Link href="/">Cookies</Link>
          </li>
          <li>
            <Link href="/">Terms of use</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
