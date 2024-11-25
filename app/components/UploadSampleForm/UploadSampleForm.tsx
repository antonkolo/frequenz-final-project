'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useUserContext } from '../../../context/context';
import { sampleSchema } from '../../../types/schemas';
import { type Category } from '../../../types/types';
import { UploadButton } from '../../../utils/uploadthing';
import ErrorMessage from '../../ErrorMessage';
import { GET_UPLOADED_SAMPLES } from '../../profile/[handle]/components/UploadedSamplesList';
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
    $description: String!
    $fileKey: String!
    $categoryIds: [Int!]!
  ) {
    createSampleWithSampleCategories(
      title: $title
      userId: $userId
      sourceUrl: $sourceUrl
      categoryIds: $categoryIds
      description: $description
      fileKey: $fileKey
    ) {
      id
    }
  }
`;

type CategoriesResponse = {
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
  const [description, setDescription] = useState('');
  const [fileKey, setFileKey] = useState('');

  // uploadthing states
  const [upload, setUpload] = useState(false);

  useEffect(() => setHasMounted(true), []);

  // get user from context
  const user = useUserContext();

  // prepare category values for the multiselect component
  const { data: categoryData } =
    useSuspenseQuery<CategoriesResponse>(GET_CATEGORIES);
  const options = categoryData.categories.map((category) => {
    return { value: category.id, label: category.name };
  });

  const [createSample] = useMutation(CREATE_SAMPLE, {
    onError: (apolloError) => {
      setError(apolloError.message);
      console.log(apolloError.message);
    },
    onCompleted: () => {
      setSampleCreated(true);
      console.log('mutation completed');
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newSample = { title, sourceUrl, description, fileKey };

    console.log('submit clicked', newSample);
    const { success, error } = sampleSchema.safeParse(newSample);

    console.log(success);
    if (!success) {
      setError(error.message);
      return;
    }

    console.log('got past error check');
    const { data } = await createSample({
      variables: {
        title,
        userId: user!.id,
        sourceUrl,
        categoryIds,
        description,
        fileKey,
      },
      refetchQueries: [GET_UPLOADED_SAMPLES],
    });
    console.log(data);
  }

  return (
    <>
      {!sampleCreated ? (
        <>
          {upload && <AudioPlayer sourceUrl={sourceUrl}></AudioPlayer>}
          {upload || (
            <UploadButton
              endpoint="audioSample"
              onClientUploadComplete={(res) => {
                // Do something with the response

                const [upload] = res;

                if (upload) {
                  setSourceUrl(upload.url);
                  setUpload(true);
                  setTitle(upload.name);
                  setFileKey(upload.key);
                }
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
                placeholder="Soft whisper"
                maxLength={255}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              ></input>
            </label>
            <label>
              Description
              <input
                placeholder="Describe your sound"
                maxLength={255}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
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
        </>
      ) : (
        <div>
          <h3>Your Sound is now online!</h3>
          <p>Thanks for contributing to the community</p>
        </div>
      )}
      <button onClick={closeDialog}>Close</button>
    </>
  );
}
