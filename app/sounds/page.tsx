'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { useState } from 'react';
import { type Sample as SampleType } from '../../types/types';
import Sample from '../components/Sample/Sample';

const samples = gql`
  query Samples {
    samples {
      id
      title
      sourceUrl
    }
  }
`;

export default function page() {
  const [errorMessage, setErrorMessage] = useState('');

  const { data } = useSuspenseQuery<{ samples: SampleType[] }>(samples);

  return (
    <div>
      <ul>
        {data.samples.map((sample) => {
          return (
            <li key={sample.id}>
              <Sample
                user={{ id: 1 }}
                id={sample.id}
                sourceUrl={sample.sourceUrl}
                title={sample.title}
              ></Sample>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
