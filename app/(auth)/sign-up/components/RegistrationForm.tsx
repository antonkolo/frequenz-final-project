'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import RandomWavePlayer from '../../../components/RandomWavePlayer/RandomWavePlayer';
import ErrorMessage from '../../../ErrorMessage';
import styles from './RegistrationForm.module.scss';

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
      setErrorMessage(apolloError.message);
    },

    onCompleted: () => {
      setErrorMessage('');
      router.push('/sounds');
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
            <h1 className={styles.title}>Sign up</h1>
            <form
              className={styles.form}
              onSubmit={async (event) => {
                event.preventDefault();
                await register();
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
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </label>
              <div className={styles['button-wrapper']}>
                <button className={styles.button}>Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <h1>Become a member</h1>
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
      </form> */}
    </>
  );
}
