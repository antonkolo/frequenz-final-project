'use client';
import { gql, useSuspenseQuery } from '@apollo/client';
import React from 'react';
import { useUserContext } from '../../../../context/context';
import type { User } from '../../../../types/types';

const GET_USER = gql`
  query Query($handle: String!) {
    user(handle: $handle) {
      id
      handle
      createdAt
    }
  }
`;

export function UserDetail({ handle }: { handle: string }) {
  const viewingUser = useUserContext();
  const { data: userData } = useSuspenseQuery<{ user: User }>(GET_USER, {
    variables: { handle },
  });
  const isEditable = viewingUser ? viewingUser.handle === handle : false;
  console.log(userData);
  return (
    <section>
      {/* <h2>User Information</h2>
      <div>
        <p>Username:</p>
        <p>{userData.user.handle}</p>
      </div>
      <div>
        <p>Created:</p>
        <p>{userData.user.createdAt.toLocaleString('en-GB')}</p>
      </div>
      {isEditable && <button>Edit information</button>} */}
    </section>
  );
}
