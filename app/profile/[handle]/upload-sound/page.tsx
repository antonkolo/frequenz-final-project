import type { Params } from 'next/dist/server/request/params';
import React from 'react';
import UploadSampleForm from '../../../components/UploadSampleForm/UploadSampleForm';

export default async function UploadSoundPage() {
  return (
    <>
      <h1>Upload new sound</h1>
      <UploadSampleForm />
    </>
  );
}
