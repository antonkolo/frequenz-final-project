'use client';

import React, { useState } from 'react';
import type { Sample as SampleType, User } from '../../../types/types';
import Sample from '../../components/Sample/Sample';
import styles from './SamplesList.module.scss';

type Props = {
  user: User | undefined;
  samples: (SampleType | undefined)[] | undefined;
};

export function SamplesList({ samples, user }: Props) {
  return (
    <>
      {samples ? (
        <ul className={styles.container}>
          {samples.map((sample) => {
            return (
              <li key={sample!.id}>
                <Sample
                  creator={sample!.user!.handle}
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
