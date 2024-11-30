// Modal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import UploadSampleForm from '../../../components/UploadSampleForm/UploadSampleForm';
import styles from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notify: (message: string) => void;
};

export default function Modal({ isOpen, setIsOpen, notify }: Props) {
  // Always render the modal, but control its visibility
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // First render the modal
      setShowModal(true);
    } else {
      // Hide the modal and handle unmounting in CSS
      setShowModal(false);
    }
  }, [isOpen]);

  // Handle clicking outside
  const handleBackdropClick = () => {
    setShowModal(false);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.modal} ${showModal ? styles.modalVisible : ''}`}>
      <div className={styles.backdrop} onClick={handleBackdropClick} />
      <div className={styles.container}>
        <div className={styles.panel}>
          <button
            className={styles['close-button']}
            onClick={handleBackdropClick}
          >
            &times;
          </button>
          <UploadSampleForm
            notify={notify}
            closeDialog={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
