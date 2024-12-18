'use client';

import Link from 'next/link';
import React from 'react';
import { LogoutButton } from '../../(auth)/logout/LogoutButton';
import { useUserContext } from '../../../context/context';
import styles from './Navigation.module.scss';

type Props = {
  style: 'dark' | 'light';
};

export default function Nav({ style }: Props) {
  const user = useUserContext();
  return (
    <nav>
      <ul
        className={`${styles.nav} ${style === 'light' && styles['nav--light']}`}
      >
        <li>
          <Link href="/sounds">Sounds</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href={`/profile/${user.handle}`}>Hey, {user.handle}</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign-in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
