import type { Params } from 'next/dist/server/request/params';
import React from 'react';
import { useUserContext } from '../../../context/context';
import LikedSamplesList from './components/LikedSamplesList';
import Modal from './components/Modal';
import UploadedSamplesList from './components/UploadedSamplesList';
import { UserDetail } from './components/UserDetail';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function UserDashboard({ params }: Props) {
  const { handle } = await params;

  return (
    <div className={styles.container}>
      <h1>Profile Page: {handle}</h1>
      {/* user data */}
      <UserDetail handle={handle} />
      {/* saved samples */}
      <LikedSamplesList handle={handle} />
      {/* uploaded samples */}
      <UploadedSamplesList handle={handle} />
      {/* Upload new Sample Modal */}
      <Modal />
    </div>
  );
}
