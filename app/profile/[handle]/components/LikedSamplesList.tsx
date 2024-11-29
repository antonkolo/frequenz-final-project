'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React, { Suspense } from 'react';
import { useUserContext } from '../../../../context/context';
import type {
  Category,
  Sample as SampleType,
  SampleCategory,
  SampleLike,
  User,
} from '../../../../types/types';
import Sample from '../../../components/Sample/Sample';
import SampleGrid from '../../../components/SampleGrid/SampleGrid';

export const GET_LIKED_SAMPLES = gql`
  query User($handle: String!) {
    user(handle: $handle) {
      sampleLikes {
        sample {
          user {
            handle
          }
          id
          sourceUrl
          title
          sampleCategories {
            category {
              name
            }
          }
        }
      }
    }
  }
`;

type Props = {
  handle: User['handle'];
};

type SampleCategoryWithCategory = SampleCategory & {
  Category: Category;
};

type SampleWithCategories = SampleType & {
  sampleCategories: SampleCategoryWithCategory[];
};

type SampleLikeWithSample = SampleLike & {
  sample: SampleWithCategories;
};

type UserWithSampleLikes = User & {
  sampleLikes: SampleLikeWithSample[];
};

export default function LikedSamplesList({ handle }: Props) {
  const { data } = useSuspenseQuery<{
    user: UserWithSampleLikes;
  }>(GET_LIKED_SAMPLES, {
    variables: { handle },
  });

  const user = useUserContext();
  return (
    <Suspense fallback={<div>Loading liked samples...</div>}>
      <SampleGrid>
        {data.user.sampleLikes.length > 0 ? (
          data.user.sampleLikes.map((sampleLike) => {
            return (
              <li key={String(sampleLike.sample.id)}>
                <Sample
                  creator={sampleLike.sample.user!.handle}
                  user={user}
                  id={sampleLike.sample.id}
                  title={sampleLike.sample.title}
                  sourceUrl={sampleLike.sample.sourceUrl}
                />
              </li>
            );
          })
        ) : (
          <p>You haven't liked any sounds yet.</p>
        )}
      </SampleGrid>
    </Suspense>
  );
}
