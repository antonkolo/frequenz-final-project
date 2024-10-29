'use client';

import { Canvas } from '@react-three/fiber';
import React, { type ReactNode, Suspense } from 'react';
import styles from './ThreeCanvas.module.scss';

export default function ThreeCanvas({ children }: { children: ReactNode }) {
  return (
    <div className={styles.canvas}>
      <Canvas>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
