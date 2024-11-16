'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { Suspense, useEffect, useState } from 'react';
import type { SampleLike } from '../../../types/types';
import ErrorMessage from '../../ErrorMessage';

type Props = {
  id: number;
  title: string;
  sourceUrl: string;
  user: { id: number };
};

const sampleLike = gql`
  query sampleLike($sampleId: ID!, $userId: ID!) {
    sampleLikeForUserAndSample(sampleId: $sampleId, userId: $userId) {
      id
      userId
      sampleId
    }
  }
`;

const deleteSampleLikeMutation = gql`
  mutation deleteSampleLike($id: Int!) {
    deleteSampleLike(id: $id) {
      id
    }
  }
`;

const createSampleLikeMutation = gql`
  mutation createSampleLike($userId: Int!, $sampleId: Int!) {
    createSampleLike(userId: $userId, sampleId: $sampleId) {
      id
    }
  }
`;

export default function Sample(props: Props) {
  const { data } = useSuspenseQuery<{
    sampleLikeForUserAndSample: SampleLike;
  }>(sampleLike, {
    variables: { userId: Number(props.user.id), sampleId: Number(props.id) },
  });

  const initialLikedState = data.sampleLikeForUserAndSample ? true : false;

  const [errorMessage, setErrorMessage] = useState('');
  const [isLiked, setIsLiked] = useState(initialLikedState);
  const [sampleLikeId, setSampleLikeId] = useState(
    initialLikedState ? data.sampleLikeForUserAndSample.id : undefined,
  );

  const [deleteSampleLike] = useMutation(deleteSampleLikeMutation, {
    variables: {
      sampleLikeId,
    },

    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },
  });

  const [createSampleLike] = useMutation(createSampleLikeMutation, {
    variables: {
      userId: 1,
      sampleLikeId: sampleLikeId,
    },

    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>{props.title}</h2>
        <audio controls src={props.sourceUrl}></audio>
        <button
          onClick={async () => {
            if (isLiked) {
              setIsLiked(false);
              // todo: set variables to the correct one
              const deletedSampleLike = await deleteSampleLike({
                variables: { id: Number(sampleLikeId) },
              });
              console.log(deletedSampleLike);
            } else {
              const newSampleLike = await createSampleLike({
                variables: { userId: 1, sampleId: Number(props.id) },
              });
              console.log(newSampleLike);
              setIsLiked(true);
              setSampleLikeId(newSampleLike.data.createSampleLike.id);
            }
          }}
        >
          {isLiked ? 'Remove Like' : 'Like'}
        </button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </Suspense>
  );
}
