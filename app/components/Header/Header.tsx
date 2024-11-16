import Link from 'next/link';
import React from 'react';
import { LogoutButton } from '../../(auth)/logout/LogoutButton';
import type { User } from '../../../types/types';

type HeaderUserProps = Pick<User, 'handle' | 'id'>;

type Props = {
  user: HeaderUserProps | undefined;
};

export default function Header(props: Props) {
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
          {props.user ? (
            <>
              <li>
                <Link href={`/profile/${props.user.handle}`}>
                  My Profile 🧑‍🦲
                </Link>
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
