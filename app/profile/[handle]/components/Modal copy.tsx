'use client';

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React, { useState } from 'react';
import UploadSampleForm from '../../../components/UploadSampleForm/UploadSampleForm';
import styles from './Modal.module.scss';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
        innovative ways, your contributions can inspire and elevate the work of
        fellow artists and producers. Remember to respect intellectual property
        rights when uploading content. Follow community guidelines and obtain
        necessary permissions before sharing any samples or recordings that you
        do not own or have rights to.
      </p>
      <Dialog
        className={styles.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogBackdrop className={styles.backdrop} />
        <div className={styles.container}>
          <DialogPanel
            transition
            className={`${styles.panel} ${isOpen ? styles.open : ''}`}
          >
            <DialogTitle>Add new sound</DialogTitle>
            <UploadSampleForm
              closeDialog={() => {
                setIsOpen(false);
              }}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
