'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { set } from 'zod';
import { useUserContext } from '../../../context/context';
import { type Category } from '../../../types/types';
import { UploadButton } from '../../../utils/uploadthing';
import ErrorMessage from '../../ErrorMessage';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

// grapqhl queries and mutations
const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

const CREATE_SAMPLE = gql`
  mutation CreateSampleWithSampleCategories(
    $title: String!
    $userId: Int!
    $sourceUrl: String!
    $categoryIds: [Int!]!
  ) {
    createSampleWithSampleCategories(
      title: $title
      userId: $userId
      sourceUrl: $sourceUrl
      categoryIds: $categoryIds
    ) {
      id
    }
  }
`;

type categoriesResponse = {
  categories: Category[];
};

export default function UploadSampleForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [sampleCreated, setSampleCreated] = useState(false);
  // query states
  const [error, setError] = useState('');

  // input states
  const [title, setTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [categoryIds, setCategoryIds] = useState<Category['id'][]>([]);

  // uploadthing states
  const [upload, setUpload] = useState(false);

  useEffect(() => setHasMounted(true), []);

  // get user from context
  const user = useUserContext();

  // prepare category values for the multiselect component
  const { data: categoryData, error: getCategoryError } =
    useSuspenseQuery<categoriesResponse>(GET_CATEGORIES);
  const options = categoryData.categories.map((category) => {
    return { value: category.id, label: category.name };
  });

  const [createSample] = useMutation(CREATE_SAMPLE, {
    onError: (apolloError) => {
      setError(apolloError.message);
    },
    onCompleted: () => {
      setSampleCreated(true);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createSample({
      variables: { title, userId: user!.id, sourceUrl, categoryIds },
    });
  }

  if (!sampleCreated) {
    return (
      <>
        {upload && <AudioPlayer sourceUrl={sourceUrl}></AudioPlayer>}
        {upload || (
          <UploadButton
            endpoint="audioSample"
            onClientUploadComplete={(res) => {
              // Do something with the response

              const [upload] = res;

              setSourceUrl(upload!.url);
              setUpload(true);
              setTitle(upload!.name);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              setError(error.message);
            }}
          />
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Give your sample a name
            <input
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            ></input>
          </label>
          <label>
            Choose Categories
            {hasMounted && (
              <Select
                onChange={(e) => {
                  const categoryIdsArray = e.map((category) =>
                    Number(category.value),
                  );
                  setCategoryIds(categoryIdsArray);
                }}
                options={options}
                isMulti
              />
            )}
          </label>
          <ErrorMessage>{error}</ErrorMessage>
          <button>Save</button>
        </form>
        <button onClick={closeDialog}>Close</button>
      </>
    );
  } else {
    return (
      <>
        <h3>Your Sound is now online!</h3>
        <p>Thanks for contributing to the community</p>
        <button onClick={closeDialog}>Close</button>
      </>
    );
  }
}
