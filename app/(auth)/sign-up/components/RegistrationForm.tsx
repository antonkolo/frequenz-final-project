'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ErrorMessage from '../../../ErrorMessage';

const registerMutation = gql`
  mutation register($handle: String!, $password: String!) {
    register(handle: $handle, password: $password) {
      id
      handle
    }
  }
`;

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const [register] = useMutation(registerMutation, {
    variables: {
      handle: username,
      password,
    },

    onError: (apolloError) => {
      console.log(apolloError.message);
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
      router.push('/sounds');
    },
  });

  return (
    <div>
      <h1>Become a member</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await register();
        }}
      >
        <label>
          Username
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          ></input>
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            type="password"
          ></input>
        </label>
        <button>Sign in</button>

        <ErrorMessage>{errorMessage}</ErrorMessage>
      </form>
    </div>
  );
}
