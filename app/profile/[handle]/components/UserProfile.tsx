'use client';
import { title } from 'process';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { style } from 'wavesurfer.js/src/util';
import { useUserContext } from '../../../../context/context';
import SampleGrid from '../../../components/SampleGrid/SampleGrid';
import LikedSamplesList from './LikedSamplesList';
import Modal from './Modal';
import ProfileNavigation from './ProfileNavigation';
import UploadedSamplesList from './UploadedSamplesList';
import { UserDetail } from './UserDetail';
import styles from './UserProfile.module.scss';

type Props = {
  handle: string;
};

// create toast function
const notify = (message: string) => toast(message);
export default function UserProfile({ handle }: Props) {
  const [selectedTab, setSelectedTab] = useState<
    'saved' | 'detail' | 'uploads'
  >('saved');
  const [isOpen, setIsOpen] = useState(false);

  const viewingUser = useUserContext();
  let isPageOwner = false;

  if (viewingUser) {
    isPageOwner = handle === viewingUser.handle;
  }
  return (
    <div className={styles['inner-container']}>
      <ProfileNavigation
        isPageOwner={isPageOwner}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* saved samples tab*/}
      {selectedTab === 'saved' && (
        <div className={styles['tab-wrapper']}>
          <h1 className={styles.title}>Collection</h1>
          <LikedSamplesList isPageOwner={isPageOwner} handle={handle} />
        </div>
      )}
      {/* uploaded samples tab */}
      {selectedTab === 'uploads' && (
        <>
          <div className={styles['upload-tab-wrapper']}>
            {/* Upload new Sample Modal */}
            <button
              className={styles['upload-button']}
              onClick={() => setIsOpen(true)}
            >
              Upload<span>*</span>
            </button>
            <p className={styles.disclaimer}>
              * Share your unique sounds and musical creations with the FREQUENZ
              community. Whether you've captured rare field recordings, crafted
              captivating synth textures, or experimented with sound design in
              innovative ways, your contributions can inspire and elevate the
              work of fellow artists and producers. Remember to respect
              intellectual property rights when uploading content. Follow
              community guidelines and obtain necessary permissions before
              sharing any samples or recordings that you do not own or have
              rights to.
            </p>
          </div>
          <Modal notify={notify} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}

      {/* user data tab*/}
      {selectedTab === 'detail' && (
        <div className={styles['user-tab']}>
          <h1 className={styles.title}>{handle}</h1>
          <UserDetail handle={handle} />
          <p>
            A passionate tech enthusiast and DIY electronics hobbyist since
            2018. Known in maker communities for creating innovative home
            automation solutions and sharing detailed project tutorials.
            Currently focused on exploring the intersection of IoT and machine
            learning. When not tinkering with microcontrollers or writing code,
            you can find me experimenting with modular synthesis or contributing
            to open-source hardware projects. Based in Toronto, proud cat
            parent, and firm believer in the democratization of technology.
            Previous collaborations include an award-winning smart greenhouse
            monitoring system and a series of popular workshops on building
            custom mechanical keyboards. Always excited to connect with fellow
            tech enthusiasts and makers!
          </p>

          <div className={styles['ticker-wrapper']}>
            <div className={styles.ticker}>
              <span>
                Contributions Contributions Contributions Contributions
              </span>
              <span>
                Contributions Contributions Contributions Contributions
              </span>
            </div>
          </div>

          <UploadedSamplesList handle={handle} />
        </div>
      )}
      <Toaster
        toastOptions={{
          className: styles.toast,
        }}
      />
    </div>
  );
}
