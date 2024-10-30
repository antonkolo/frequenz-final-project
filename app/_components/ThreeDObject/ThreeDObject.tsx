'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { ReactNode } from 'react';
import { angleToRadius } from '../../_utils/formulas';

export default function ThreeDObject(): ReactNode {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <OrbitControls />
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh rotation={[angleToRadius(-90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <ambientLight args={['#fff', 1]} />
    </>
  );
}
