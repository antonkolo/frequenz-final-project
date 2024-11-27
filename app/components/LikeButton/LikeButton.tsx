'use client';

import { gql, useMutation, useSuspenseQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { Sample, SampleLike, User } from '../../../types/types';
import { GET } from '../../api/graphql/route';
import { GET_LIKED_SAMPLES } from '../../profile/[handle]/components/LikedSamplesList';
import BookmarkIcon from '../Icons/BookmarkIcon';

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

export default function LikeButton({
  user,
  sampleId,
}: {
  user: User | undefined;
  sampleId: Sample['id'];
}) {
  const router = useRouter();
  // query sample likes to check if there is a like for this user and sample, if the user is not provided, set user.id to 0, to always return nothing
  const { data } = useSuspenseQuery<{
    sampleLikeForUserAndSample: SampleLike;
  }>(GET_LIKE, {
    variables: {
      userId: user ? Number(user.id) : 0,
      sampleId: Number(sampleId),
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
    update(cache) {
      console.log(cache);
    },
    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },

    refetchQueries: [GET_LIKE, GET_LIKED_SAMPLES],
  });

  // add like creation mutation

  const [createSampleLike] = useMutation(CREATE_LIKE, {
    onError: (apolloError) => {
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
    },

    refetchQueries: [GET_LIKE, GET_LIKED_SAMPLES],
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
        variables: { userId: user.id, sampleId: Number(sampleId) },
      });

      setIsLiked(true);
      setSampleLikeId(newSampleLike.data.createSampleLike.id);
    }
  };

  return (
    <button disabled={user ? false : true} onClick={handleLikeClick}>
      {isLiked ? (
        <BookmarkIcon size="28" color="white" fill="black" />
      ) : (
        <BookmarkIcon size="28" color="black" fill="none" />
      )}
    </button>
  );
}
