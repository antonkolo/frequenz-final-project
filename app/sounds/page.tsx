'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useUserContext } from '../../context/context';
import { type Sample as SampleType } from '../../types/types';
import Sample from '../components/Sample/Sample';
import ErrorMessage from '../ErrorMessage';

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
  const user = useUserContext();
  const [errorMessage, setErrorMessage] = useState('');

  const { data, error } = useSuspenseQuery<{ samples: SampleType[] }>(samples);

  return (
    <div>
      {error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : (
        <ul>
          {data.samples.map((sample) => {
            return (
              <li key={sample.id}>
                <Sample
                  user={user}
                  id={sample.id}
                  sourceUrl={sample.sourceUrl}
                  title={sample.title}
                ></Sample>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
