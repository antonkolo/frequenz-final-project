import React from 'react';
import { getSampleInsecure } from '../../../database/samples';
import SingleSampleCard from '../../components/SingleSampleCard/SingleSampleCard';
import NotFoundPage from '../../not-found';

export default async function SamplePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const sample = await getSampleInsecure(id);
  // early return if sample not found
  if (!sample) {
    return <NotFoundPage></NotFoundPage>;
  }

  console.log(typeof sample.id);
  return <div>{<SingleSampleCard id={sample.id} />}</div>;
}
