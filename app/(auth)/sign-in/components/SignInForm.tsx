'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getSafeReturnToPath } from '../../../../utils/validation';
import ErrorMessage from '../../../ErrorMessage';

const loginMutation = gql`
  mutation Login($handle: String!, $password: String!) {
    login(handle: $handle, password: $password) {
      id
      handle
    }
  }
`;

type Props = {
  returnTo?: string | string[];
};

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [login] = useMutation(loginMutation, {
    variables: {
      handle: username,
      password,
    },

    onError: (apolloError) => {
      setError(apolloError.message);
    },

    onCompleted: () => {
      router.push(getSafeReturnToPath(props.returnTo) || '/sounds');
      router.refresh();
    },
  });

  return (
    <div>
      <div>
        <h1>Welcome Back</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await login();
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
        </form>
        <ErrorMessage>{error}</ErrorMessage>

        <p>
          Not a user yet? <Link href={'/sign-up'}>Sing-up</Link>
        </p>
      </div>
    </div>
  );
}
