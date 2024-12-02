'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useUserContext } from '../../../context/context';
import { sampleSchema } from '../../../types/schemas';
import { type Category } from '../../../types/types';
import { UploadButton } from '../../../utils/uploadthing';
import { AudioPlayerFull } from '../AudioPlayerFull/AudioPlayerFull';
import ArrowBackIcon from '../Icons/ArrowBack';
import OpenIcon from '../Icons/OpenIcon';
import styles from './UploadSampleForm.module.scss';

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

type Props = {
  closeDialog: () => void;
  notify: (message: string) => void;
};

export default function UploadSampleForm({ closeDialog, notify }: Props) {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  // Form data
  const [title, setTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [fileKey, setFileKey] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const user = useUserContext();

  // Get categories for the select input
  const { data: categoryData } = useSuspenseQuery<{ categories: Category[] }>(
    GET_CATEGORIES,
  );
  const options = categoryData.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const [createSample] = useMutation(CREATE_SAMPLE, {
    onError: (error) => setError(error.message),
  });

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (categoryIds.length < 1) {
      setError('Select at least 1 category');
      return;
    }
    const newSample = { title, sourceUrl, description, fileKey };
    const { success, error } = sampleSchema.safeParse(newSample);

    if (!success) {
      setError(error.message);
      return;
    }

    const createdSample = await createSample({
      variables: {
        title,
        userId: user!.id,
        sourceUrl,
        categoryIds,
        description,
        fileKey,
      },
    });

    if (createdSample) {
      setCurrentStep(1);
      closeDialog();
      notify('Sound has been created. Thanks for sharing!');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles['info-wrapper']}>
        <div className={styles['title-wrapper']}>
          <h2 className={styles.title}>
            {currentStep === 1 ? 'UPLOAD FILE' : 'DESCRIBE SOUND'}
          </h2>
        </div>

        <div className={styles['step-wrapper']}>
          <p>STEP {currentStep}/2</p>
        </div>
      </div>

      {currentStep === 1 ? (
        // step 1
        <div className={styles['content-wrapper']}>
          <div className={styles['upload-wrapper']}>
            <OpenIcon size="36"></OpenIcon>
            <UploadButton
              className={styles['upload-button-container']}
              endpoint="audioSample"
              onClientUploadComplete={(res) => {
                const [upload] = res;
                if (upload) {
                  setSourceUrl(upload.url);
                  setTitle(upload.name);
                  setFileKey(upload.key);

                  setCurrentStep(2);
                }
              }}
              onUploadError={(error) => {
                setError(error.message);
              }}
            />
          </div>
          <div className={styles.instructions}>
            Audio files must be in MP3, WAV, AIFF, or FLAC format. Maximum file
            size is 50MB per upload. For the best audio quality, we recommend
            uncompressed WAV or AIFF files with a minimum sample rate of 44.1kHz
            and bit depth of 16-bit. Keep individual samples between 1-30
            seconds in length for optimal usability within the community
            library.
          </div>
        </div>
      ) : (
        // step 2
        <div className={styles['content-wrapper']}>
          <button onClick={handleBack} className={styles['back-button']}>
            <ArrowBackIcon size="28" /> Back
          </button>
          <div className={styles['player-wrapper']}>
            <AudioPlayerFull fullWidth sourceUrl={sourceUrl} />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            {hasMounted && (
              <>
                <label className={styles.select}>
                  Select Tag
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'black',
                        borderRadius: '0',
                        '&:hover': {
                          borderColor: 'black',
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor:
                          state.isSelected || state.isFocused
                            ? 'black'
                            : 'white',
                        color:
                          state.isSelected || state.isFocused
                            ? 'white'
                            : 'black',
                        '&:hover': {
                          backgroundColor: 'black',
                          color: 'white',
                        },
                      }),
                    }}
                    options={options}
                    isMulti
                    onChange={(selected) => {
                      setCategoryIds(
                        selected.map((item) => Number(item.value)),
                      );
                    }}
                  />
                </label>
              </>
            )}
            <label className={styles['text-input']}>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={255}
              />
            </label>

            <label className={styles['text-input']}>
              Description
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={510}
              />
            </label>

            {error && <div>{error}</div>}
            <div className={styles['button-wrapper']}>
              <button className={styles['save-button']} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
