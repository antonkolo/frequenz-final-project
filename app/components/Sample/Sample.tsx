'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import React, { Suspense, useContext, useState } from 'react';
import { useUserContext } from '../../../context/context';
import { type Sample, type SampleLike } from '../../../types/types';
import ErrorMessage from '../../ErrorMessage';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

type Props = {
  id: number;
  title: string;
  sourceUrl: string;
};

// define queries and mutations
const GET_LIKE = gql`
  query sampleLike($sampleId: ID!, $userId: ID!) {
    sampleLikeForUserAndSample(sampleId: $sampleId, userId: $userId) {
      id
      userId
      sampleId
    }
  }
`;

const DELETE_LIKE = gql`
  mutation deleteSampleLike($id: Int!) {
    deleteSampleLike(id: $id) {
      id
    }
  }
`;

const CREATE_LIKE = gql`
  mutation createSampleLike($userId: Int!, $sampleId: Int!) {
    createSampleLike(userId: $userId, sampleId: $sampleId) {
      id
    }
  }
`;

export default function Sample(props: Props) {
  const user = useUserContext();

  // query sample likes to check if there is a like for this user and sample, if the user is not provided, set user.id to 0, to always return nothing
  const { data } = useSuspenseQuery<{
    sampleLikeForUserAndSample: SampleLike;
  }>(GET_LIKE, {
    variables: {
      userId: user ? Number(user.id) : 0,
      sampleId: Number(props.id),
    },
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLiked, setIsLiked] = useState(() => {
    return user && data.sampleLikeForUserAndSample ? true : false;
  });
  const [sampleLikeId, setSampleLikeId] = useState<Sample['id'] | undefined>(
    () => {
      return user && data.sampleLikeForUserAndSample
        ? data.sampleLikeForUserAndSample.id
        : undefined;
    },
  );

  // add like deletion mutation
  const [deleteSampleLike] = useMutation(DELETE_LIKE, {
    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },

    refetchQueries: [GET_LIKE],
  });

  // add like creation mutation

  const [createSampleLike] = useMutation(CREATE_LIKE, {
    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },

    refetchQueries: [GET_LIKE],
  });

  const handleLikeClick = async () => {
    if (!user) {
      return;
    }
    if (isLiked) {
      setIsLiked(false);
      // todo: set variables to the correct one
      const deletedSampleLike = await deleteSampleLike({
        variables: { id: Number(sampleLikeId) },
      });
    } else {
      const newSampleLike = await createSampleLike({
        variables: { userId: user.id, sampleId: Number(props.id) },
      });

      setIsLiked(true);
      setSampleLikeId(newSampleLike.data.createSampleLike.id);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>{props.title}</h2>
        <AudioPlayer sourceUrl={props.sourceUrl} />
        <button disabled={user ? false : true} onClick={handleLikeClick}>
          {isLiked ? 'Remove Like' : 'Like'}
        </button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </Suspense>
  );
}
