'use client';

import Link from 'next/link';
import React from 'react';
import { LogoutButton } from '../../(auth)/logout/LogoutButton';
import { useUserContext } from '../../../context/context';
import type { User } from '../../../types/types';

type HeaderUserProps = Pick<User, 'handle' | 'id'>;

export default function Header() {
  const user = useUserContext();

  return (
    <header style={{ fontSize: '1.5rem' }}>
      <nav>
        <ul style={{ display: 'flex', gap: '2rem' }}>
          <li>
            <Link href="/">Landing 🛬</Link>
          </li>

          <li>
            <Link href="/sounds">Sounds 🎛️</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href={`/profile/${user.handle}`}>My Profile 🧑‍🦲</Link>
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
    </header>
  );
}
