'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import useDownloader from 'react-use-downloader';
import { useUserContext } from '../../../context/context';
import { UPLOADTHING_URL } from '../../../lib/constants';
import type { Sample } from '../../../types/types';
import { timestampToDate } from '../../../utils/timestampToDate';
import { AudioPlayerFull } from '../AudioPlayerFull/AudioPlayerFull';
import ArrowBackIcon from '../Icons/ArrowBack';
import BookmarkIcon from '../Icons/BookmarkIcon';
import DownloadIcon from '../Icons/DonwloadIcon';
import LikeButton from '../LikeButton/LikeButton';
import styles from './SingleSampleCard.module.scss';

type Props = {
  id: string;
};

// type SampleCategoryWithCategory = SampleCategory & {
//   category: Category;
// };

// type SampleWithSampleCategories = SampleType & {
//   sampleCategories: SampleCategoryWithCategory[];
// };

const GET_SAMPLE = gql`
  query Sample($sampleId: ID!) {
    sample(id: $sampleId) {
      id
      sourceUrl
      description
      title
      createdAt
      fileKey
      user {
        handle
      }
      sampleCategories {
        category {
          name
        }
      }
    }
  }
`;

export default function SingleSampleCard({ id }: Props) {
  // query necessary data
  const user = useUserContext();
  const { data } = useSuspenseQuery<{ sample: Sample }>(GET_SAMPLE, {
    variables: { sampleId: id },
  });
  const { sample } = data;

  const router = useRouter();
  const { download } = useDownloader();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* back to results  */}
      <div className={styles.container}>
        <button onClick={() => router.back()} className={styles['back-button']}>
          <ArrowBackIcon size="24" /> Back to results
        </button>

        {/* categories */}
        <ul className={styles['categories-wrapper']}>
          {sample.sampleCategories?.map((sampleCategory) => {
            return (
              <li className={styles.category} key={sampleCategory.id}>
                <p>{sampleCategory?.category?.name}</p>
              </li>
            );
          })}
        </ul>

        {/* sample info */}
        <h2 className={styles.title}>{sample.title}</h2>
        <AudioPlayerFull sourceUrl={sample.sourceUrl} />
        <div className={styles['info-wrapper']}>
          <Link href={`/profile/${sample.user?.handle}`}>
            {`${sample.user?.handle}`}
          </Link>
          <p>{timestampToDate(sample.createdAt)}</p>
        </div>

        <div className={styles['bottom-content']}>
          <p>{sample.description}</p>

          {/* icon stuff */}
          <div className={styles['icons-wrapper']}>
            {user ? (
              <LikeButton sampleId={Number(id)} user={user} />
            ) : (
              <Link
                className={styles['bookmark-wrapper']}
                href={'/sign-in'}
                target="blank"
              >
                <BookmarkIcon size="32" color="black" fill="none" />
              </Link>
            )}
            <button
              onClick={() =>
                download(
                  `${UPLOADTHING_URL}${sample.fileKey}`,
                  `${sample.title}.wav`,
                )
              }
              className={styles['download-button']}
            >
              <DownloadIcon size="28" />
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
