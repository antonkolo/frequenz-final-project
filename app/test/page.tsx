import React from 'react';
import { getSamplesInsecure } from '../../database/samples';

export default async function page() {
  const samples = await getSamplesInsecure();
  return <div>{JSON.stringify(samples)}</div>;
}
