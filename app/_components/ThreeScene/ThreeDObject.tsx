'use client';

import {
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  useCursor,
} from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
import { type ReactNode, useRef, useState } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { angleToRadians } from '../../_utils/formulas';

export default function ThreeDObject(): ReactNode {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  const distortedObjectRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

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
      {/* camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {/* <OrbitControls ref={orbitControlsRef} /> */}

      {/* sphere */}
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        position={[0, 0, 0]}
        castShadow
      >
        <sphereGeometry args={[1, 100, 100]} />
        <MeshDistortMaterial
          ref={distortedObjectRef}
          speed={2}
          factor={2}
          color="black"
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* ligthing */}
      <ambientLight args={['#ffffff', 0.1]} />

      {/* environment */}

      <color args={['#030202']} attach="background" />
    </>
  );
}
