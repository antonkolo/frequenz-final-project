'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React from 'react';
import type { Sample } from '../../types/types';

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
  const { data } = useSuspenseQuery<{ samples: Sample[] }>(samples);
  console.log('samples', data);

  return (
    <div>
      <ul>
        {data.samples.map((sample) => {
          return (
            <li key={sample.id}>
              <div>
                <h2>{sample.title}</h2>
                <audio controls src={sample.sourceUrl}></audio>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
