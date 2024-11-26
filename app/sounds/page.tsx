import React from 'react';
import { getCategoriesInsecure } from '../../database/categories';
import Header from '../components/Header/Header';
import SamplesFilter from './components/SamplesFilter';

export default async function page() {
  return (
    <>
      <Header style="light" />
      <main>
        <h2>Menu</h2>
        <SamplesFilter />
      </main>
    </>
  );
}
