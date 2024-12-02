import React from 'react';
import { getSampleInsecure } from '../../../database/samples';
import Header from '../../components/Header/Header';
import SingleSampleCard from '../../components/SingleSampleCard/SingleSampleCard';
import NotFoundPage from '../../not-found';
import styles from './page.module.scss';

export default async function SamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sample = await getSampleInsecure(Number(id));
  // early return if sample not found
  if (!sample) {
    return <NotFoundPage></NotFoundPage>;
  }

  return (
    <>
      <Header style="light" />
      <main className={styles.container}>
        <div className={styles['inner-container']}>
          <div className={styles['title-wrapper']}>
            <h2 className={styles.title}>Details</h2>
          </div>

          {<SingleSampleCard id={sample.id} />}
        </div>
      </main>
    </>
  );
}
