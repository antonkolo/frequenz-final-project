import React from 'react';
import { getCategoriesInsecure } from '../../database/categories';
import Header from '../components/Header/Header';
import SamplesFilter from './components/SamplesFilter';
import styles from './page.module.scss';

export default async function page() {
  return (
    <>
      <Header style="light" />
      <main className={styles.container}>
        <SamplesFilter />
      </main>
    </>
  );
}
