import React from 'react';
import { getUserInsecure } from '../../../database/users';
import Header from '../../components/Header/Header';
import NotFoundPage from '../../not-found';
import UserProfile from './components/UserProfile';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { handle } = await params;
  const user = await getUserInsecure(handle);

  if (!user) {
    return <NotFoundPage></NotFoundPage>;
  }
  return (
    <>
      <Header style="light" />
      <main className={styles.container}>
        <UserProfile handle={handle} />
      </main>
    </>
  );
}
