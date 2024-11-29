'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React, { Suspense } from 'react';
import { useUserContext } from '../../../../context/context';
import type { Sample as SampleType, User } from '../../../../types/types';
import Sample from '../../../components/Sample/Sample';
import SampleGrid from '../../../components/SampleGrid/SampleGrid';

export const GET_UPLOADED_SAMPLES = gql`
  query User($handle: String!) {
    user(handle: $handle) {
      samples {
        id
        sourceUrl
        title
        user {
          handle
        }
      }
    }
  }
`;

type Props = {
  handle: User['handle'];
};

type UserWithSamples = User & {
  samples: SampleType[];
};

export default function UploadedSamplesList({ handle }: Props) {
  const { data } = useSuspenseQuery<{
    user: UserWithSamples;
  }>(GET_UPLOADED_SAMPLES, {
    variables: { handle },
  });

  const user = useUserContext();

  const isPageOwner = user ? user.handle === handle : false;
  return (
    <Suspense fallback={<div>Loading liked samples...</div>}>
      <SampleGrid>
        {data.user.samples.map((sample) => {
          return (
            <li key={String(sample.id)}>
              <Sample
                creator={sample.user!.handle}
                user={user}
                id={sample.id}
                title={sample.title}
                sourceUrl={sample.sourceUrl}
              />
            </li>
          );
        })}
      </SampleGrid>
    </Suspense>
  );
}
