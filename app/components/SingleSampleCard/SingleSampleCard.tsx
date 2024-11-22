'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import type { SpriteAnimatorProps } from '@react-three/drei';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { useUserContext } from '../../../context/context';
import type {
  Category,
  Sample as SampleType,
  SampleCategory,
  User,
} from '../../../types/types';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import LikeButton from '../LikeButton/LikeButton';
import Sample from '../Sample/Sample';

type Props = {
  id: string;
};

type SampleCategoryWithCategory = SampleCategory & {
  category: Category;
};

type SampleWithSampleCategories = SampleType & {
  sampleCategories: SampleCategoryWithCategory[];
};

const GET_SAMPLE = gql`
  query Sample($sampleId: ID!) {
    sample(id: $sampleId) {
      id
      sourceUrl
      description
      title
      sampleCategories {
        category {
          name
        }
      }
    }
  }
`;

export default function SingleSampleCard({ id }: Props) {
  const user = useUserContext();
  const { data } = useSuspenseQuery<{ sample: SampleWithSampleCategories }>(
    GET_SAMPLE,
    { variables: { sampleId: id } },
  );
  const { sample } = data;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>{sample.title}</h2>
        <AudioPlayer sourceUrl={sample.sourceUrl} />
        {user ? (
          <LikeButton sampleId={Number(id)} user={user} />
        ) : (
          <Link href={'/sign-in'}>Login to save sounds</Link>
        )}
        <ul>
          {sample.sampleCategories.map((sampleCategory) => {
            return (
              <li key={sampleCategory.id}>
                <p>{sampleCategory.category.name}</p>
              </li>
            );
          })}
        </ul>
        <p>{sample.description}</p>
      </div>
    </Suspense>
  );
}
