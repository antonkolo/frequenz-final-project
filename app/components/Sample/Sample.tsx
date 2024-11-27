'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';
import { type User } from '../../../types/types';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import LikeButton from '../LikeButton/LikeButton';
import BookmarkIcon from './BookmarkIcon';
import styles from './Sample.module.scss';

type Props = {
  id: number;
  title: string;
  sourceUrl: string;
  creator: User['handle'];
  user: User | undefined;
};

export default function Sample(props: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
        <div className={styles['top-wrapper']}>
          <h3>{props.title}</h3>
          {/* <Link href={`/sounds/${props.id}`}></Link> */}
          <AudioPlayer sourceUrl={props.sourceUrl} />
        </div>
        <div className={styles['info-wrapper']}>
          <Link href={`/profile/${props.creator}`}>{props.creator}</Link>

          <div>
            {props.user ? (
              <LikeButton sampleId={props.id} user={props.user} />
            ) : (
              <Link href={'/sign-in'} target="blank">
                <BookmarkIcon size="28" color="black" fill="none" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
