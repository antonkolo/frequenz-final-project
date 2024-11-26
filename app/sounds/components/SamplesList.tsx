'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useUserContext } from '../../../context/context';
import type { Sample as SampleType, User } from '../../../types/types';
import Sample from '../../components/Sample/Sample';
import ErrorMessage from '../../ErrorMessage';

type Props = {
  user: User | undefined;
  samples: (SampleType | undefined)[] | undefined;
};

// const GET_SAMPLES = gql`
//   query Samples {
//     samples {
//       id
//       user {
//         handle
//       }
//       fileKey
//       sourceUrl
//       title
//     }
//   }
// `;

export function SamplesList({ samples, user }: Props) {
  // if (!samples) {
  //   const { data } = useSuspenseQuery<{
  //     samples: SampleType[] & { user: User }[];
  //   }>(GET_SAMPLES);
  //   samples = data.samples;
  // }

  return (
    <>
      {samples ? (
        <ul>
          {samples.map((sample) => {
            return (
              <li key={sample!.id}>
                <Sample
                  user={user}
                  id={sample!.id}
                  sourceUrl={sample!.sourceUrl}
                  title={sample!.title}
                ></Sample>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No sounds found</div>
      )}
    </>
  );
}
