'use client';

import React from 'react';
import { useUserContext } from '../../../../context/context';
import type { User } from '../../../../types/types';
import styles from './ProfileNavigation.module.scss';

type Props = {
  setSelectedTab: React.Dispatch<
    React.SetStateAction<'saved' | 'detail' | 'uploads'>
  >;
  selectedTab: string;
};
export default function ProfileNavigation({
  setSelectedTab,
  selectedTab,
}: Props) {
  const user = useUserContext();
  return (
    <div className={styles['nav-wrapper']}>
      <ul className={styles.nav}>
        <li>
          <div
            onClick={() => {
              setSelectedTab('saved');
            }}
            className={selectedTab === 'saved' ? styles.selected : ''}
          >
            <h3>Saved Sounds</h3>
            <p> Your collection</p>
          </div>
        </li>
        {user && (
          <li>
            <div
              onClick={() => {
                setSelectedTab('uploads');
              }}
              className={selectedTab === 'uploads' ? styles.selected : ''}
            >
              <h3>Upload</h3>
              <p>Contribute to the community</p>
            </div>
          </li>
        )}

        <li>
          <div
            onClick={() => {
              setSelectedTab('detail');
            }}
            className={selectedTab === 'detail' ? styles.selected : ''}
          >
            <h3>User Info</h3>
            <p>View Details and Uploads</p>
          </div>
        </li>
      </ul>
      <div className={styles['title-wrapper']}>
        {' '}
        <h2 className={styles['menu-title']}>Profile</h2>
      </div>
    </div>
  );
}
