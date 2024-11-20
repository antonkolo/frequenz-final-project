import type { Params } from 'next/dist/server/request/params';
import React from 'react';
import Modal from './components/Modal';
import styles from './page.module.scss';

type Props = {
  params: Promise<Params>;
};

export default async function UserDashboard({ params }: Props) {
  const { handle } = await params;

  return (
    <div className={styles.container}>
      <h1>Profile Page: {handle}</h1>
      <Modal />
    </div>
  );
}
