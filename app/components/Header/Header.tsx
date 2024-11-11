import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header style={{ fontSize: '1.5rem' }}>
      <ul style={{ display: 'flex', gap: '2rem' }}>
        <li>
          <Link href="/">Landing 🛬</Link>
        </li>
        <li>
          <Link href="/sounds">Sounds 🎛️</Link>
        </li>
        <li>
          <Link href="/profile/hacker3000">My Profile 🧑‍🦲</Link>
        </li>
      </ul>
    </header>
  );
}
