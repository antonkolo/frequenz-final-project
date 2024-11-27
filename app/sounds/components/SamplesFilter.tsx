'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useUserContext } from '../../../context/context';
import type { Category, Sample } from '../../../types/types';
import styles from './SamplesFilter.module.scss';
import { SamplesList } from './SamplesList';

const GET_CATEGORIES_WITH_SAMPLE_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      sampleCategories {
        sample {
          id
          sourceUrl
          fileKey
          title
          user {
            handle
          }
        }
      }
    }
  }
`;

export default function SamplesFilter() {
  const { data } = useSuspenseQuery<{ categories: Category[] }>(
    GET_CATEGORIES_WITH_SAMPLE_CATEGORIES,
  );

  const allSamples = data.categories
    .flatMap((category) => category.sampleCategories)
    .flatMap((sampleCategory) => sampleCategory!.sample);
  //

  const uniqueSamples = allSamples.reduce<Sample[]>((acc, sample) => {
    // Only add if this is the first occurrence of the ID
    if (!acc.some((existingSample) => existingSample.id === sample!.id)) {
      acc.push(sample!);
    }
    return acc;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const user = useUserContext();

  // 1. clicking on a div has to set the classname of this div to 'selected'
  // 2. clicking on a div has to set selected category to the category this div refers to

  return (
    <div className={styles.container}>
      <div className={styles['nav-wrapper']}>
        <div className={styles['title-wrapper']}>
          <h2 className={styles['menu-title']}>Menu</h2>
        </div>
        <ul className={styles.nav}>
          <li>
            <div
              className={!selectedCategory ? styles.selected : ''}
              onClick={() => {
                setSelectedCategory(undefined);
              }}
            >
              <h3>All</h3>
              <p>{uniqueSamples.length} Results</p>
            </div>
          </li>
          {data.categories.map((category) => {
            return (
              <li>
                <div
                  className={
                    selectedCategory?.id === category.id ? styles.selected : ''
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                >
                  <h3>{category.name}</h3>
                  <p>{category.sampleCategories?.length} Results</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles['sample-list-wrapper']}>
        <h2>Browse</h2>
        <SamplesList
          samples={
            selectedCategory
              ? selectedCategory!.sampleCategories!.length > 0
                ? selectedCategory!.sampleCategories?.flatMap(
                    (sampleCategory) => sampleCategory.sample,
                  )
                : undefined
              : uniqueSamples
          }
          user={user}
        />
      </div>
    </div>
  );
}
