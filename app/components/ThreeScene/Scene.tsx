'use client';
// imports
import {
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  useCursor,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
// import { useFrame } from '@react-three/fiber';
import { type ReactNode, useRef, useState } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { AudioAnalyzer } from '../../../lib/audio-analyzer';
import { angleToRadians } from '../../utils/formulas';

type RandomSoundFunction = () => void;

type Props = {
  analyzer: AudioAnalyzer | null;
  onClick: RandomSoundFunction;
};

// components
function Sphere({
  onClick,
  analyzer,
}: {
  onClick: RandomSoundFunction;
  analyzer: AudioAnalyzer | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useFrame(() => {
    // console.log(analyzer);
    if (analyzer) {
      console.log(analyzer.getFFT());
    }
  });

  useCursor(isHovered);
  return (
    <mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={[0, 0, 0]}
      castShadow
      onClick={onClick}
    >
      {/* <sphereGeometry args={[1, 100, 100]} /> */}
      <icosahedronGeometry args={[1, 30]} ref={ref} />
      <MeshDistortMaterial
        speed={2}
        factor={2}
        color="white"
        metalness={0.9}
        roughness={0.05}
      />
    </mesh>
  );
}

export default function Scene({ analyzer, onClick }: Props): ReactNode {
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
  console.log(analyzer);
  return (
    <>
      {/* camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {/* <OrbitControls ref={orbitControlsRef} /> */}

      {/* sphere */}
      <Sphere analyzer={analyzer} onClick={onClick} />
      {/* ligthing */}
      <ambientLight args={['#ffffff', 0.1]} />

      {/* environment */}

      <color args={['#030202']} attach="background" />
    </>
  );
}
