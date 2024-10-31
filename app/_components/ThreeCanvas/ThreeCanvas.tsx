'use client';

import { Canvas } from '@react-three/fiber';
import React, { type ReactNode, Suspense } from 'react';
import * as THREE from 'three';
import styles from './ThreeCanvas.module.scss';

export default function ThreeCanvas({ children }: { children: ReactNode }) {
  const color = new THREE.Color('#000');

  return (
    <div className={styles.canvas}>
      <Canvas shadows scene={{ background: color }}>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
