'use client';

import { gql, useSuspenseQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useUserContext } from '../../../context/context';
import type { Category, Sample } from '../../../types/types';
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
  return (
    <>
      <ul>
        <li>
          <div
            onClick={() => {
              setSelectedCategory(undefined);
            }}
          >
            <h3>All</h3>
            <p>Results</p>
          </div>
        </li>
        {data.categories.map((category) => {
          return (
            <li>
              <div
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
    </>
  );
}
