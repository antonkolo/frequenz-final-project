import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link href="/sounds">Sounds</Link>
        </li>
      </ul>
    </header>
  );
}
