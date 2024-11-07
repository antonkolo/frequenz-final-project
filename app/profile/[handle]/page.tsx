import type { Params } from 'next/dist/server/request/params';
import React from 'react';
import UploadSampleForm from '../../components/UploadSampleForm/UploadSampleForm';

type Props = {
  params: Promise<Params>;
};

export default async function UserDashboard({ params }: Props) {
  const { handle } = await params;

  return (
    <>
      <h1>Profile Page: {handle}</h1>
      <UploadSampleForm />
    </>
  );
}
