'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { style } from 'wavesurfer.js/src/util';
import { getSafeReturnToPath } from '../../../../utils/validation';
import Header from '../../../components/Header/Header';
import RandomWavePlayer from '../../../components/RandomWavePlayer/RandomWavePlayer';
import ErrorMessage from '../../../ErrorMessage';
import styles from './SignInForm.module.scss';

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
    <>
      <Header style="dark" />
      <div className={styles.container}>
        <div className={styles['inner-container']}>
          <RandomWavePlayer />
          <div className={styles['form-wrapper']}>
            <h1 className={styles.title}>Sign in</h1>
            <form
              className={styles.form}
              onSubmit={async (event) => {
                event.preventDefault();
                await login();
              }}
            >
              <label className={styles['text-input']}>
                Username
                <input
                  value={username}
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                ></input>
              </label>
              <label className={styles['text-input']}>
                Password
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                  type="password"
                ></input>
                <ErrorMessage>{error}</ErrorMessage>
              </label>
              <div className={styles['button-wrapper']}>
                <p>
                  Not a user yet?{' '}
                  <Link className={styles.signup} href={'/sign-up'}>
                    Sing-up
                  </Link>
                </p>
                <button className={styles.button}>Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
