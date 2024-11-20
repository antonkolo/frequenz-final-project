'use client';

import Link from 'next/link';
import React from 'react';
import { LogoutButton } from '../../(auth)/logout/LogoutButton';
import { useUserContext } from '../../../context/context';
import type { User } from '../../../types/types';
import styles from './Header.module.scss';

export default function Header() {
  const user = useUserContext();

  return (
    <header className={styles.header}>
      <div className={styles['inner-container']}>
        <nav>
          <ul style={{ display: 'flex', gap: '2rem' }}>
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/sounds">Sounds</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href={`/profile/${user.handle}`}>My Profile</Link>
                </li>
                <li>
                  <LogoutButton></LogoutButton>
                </li>
              </>
            ) : (
              <li>
                <Link href="/sign-in">Sign-in</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
