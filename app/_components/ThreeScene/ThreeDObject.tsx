'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { type ReactNode, useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { angleToRadians } from '../../_utils/formulas';

export default function ThreeDObject(): ReactNode {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  // Change based perspective on cursor location
  // useEffect(() => {
  //   if (orbitControlsRef.current) {
  //     console.log(orbitControlsRef.current);
  //   }
  // }, []);
  // useFrame((state) => {
  //   if (orbitControlsRef.current) {
  //     const { x, y } = state.pointer;
  //     // console.log(angleToRadians(0));

  //     // console.log(angleToRadians(30) + angleToRadians(y * 30));
  //     orbitControlsRef.current.setAzimuthalAngle(angleToRadians(x * 30));
  //     orbitControlsRef.current.setPolarAngle(
  //       angleToRadians(60) + angleToRadians(y * 30),
  //     );
  //   }
  // });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <OrbitControls ref={orbitControlsRef} />

      {/* sphere */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* floor */}
      <mesh rotation={[angleToRadians(-90), 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshPhongMaterial color="#64c6ff" />
      </mesh>

      {/* wall */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshPhongMaterial color="#64c6ff" />
      </mesh>

      {/* ligthing */}
      <ambientLight args={['#fff', 0.5]} />
      <spotLight
        args={['#fff', 15, 20, angleToRadians(45), 0.4]}
        position={[0, 2, 3]}
        castShadow
      />

      {/* environment */}
    </>
  );
}
