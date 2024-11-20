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
      <button onClick={() => setIsOpen(true)}>Upload Sample</button>
      <Dialog
        className={styles.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogBackdrop className={styles.backdrop} />
        <div className={styles.container}>
          <DialogPanel className={styles.panel}>
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
