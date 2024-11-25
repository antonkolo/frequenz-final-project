'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { type ReactNode, Suspense } from 'react';
import styles from './ThreeCanvas.module.scss';

export default function ThreeCanvas({ children }: { children: ReactNode }) {
  return (
    <div className={styles.canvas}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Environment path="/cube" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
