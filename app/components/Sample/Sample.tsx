'use client';

import Link from 'next/link';
import React, { Suspense, useContext, useState } from 'react';
import { useUserContext } from '../../../context/context';
import { type Sample, type User } from '../../../types/types';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import LikeButton from '../LikeButton/LikeButton';

type Props = {
  id: number;
  title: string;
  sourceUrl: string;

  user: User | undefined;
};

export default function Sample(props: Props) {
  const user = useUserContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>{props.title}</h2>
        <AudioPlayer sourceUrl={props.sourceUrl} />
        {user ? (
          <LikeButton sampleId={props.id} user={props.user} />
        ) : (
          <Link href={'/sign-in'}>Login to save sounds</Link>
        )}
      </div>
    </Suspense>
  );
}
