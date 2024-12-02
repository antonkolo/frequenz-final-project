'use client';
// imports
import {
  MeshDistortMaterial,
  PerspectiveCamera,
  useCursor,
} from '@react-three/drei';
import { type ReactNode, useRef, useState } from 'react';
import type { AudioAnalyzer } from '../../../lib/audio-analyzer';

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

  useCursor(isHovered);
  return (
    <mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={[1, 0.2, 0]}
      castShadow
      onClick={onClick}
    >
      {/* <sphereGeometry args={[1, 100, 100]} /> */}
      <icosahedronGeometry args={[1, 30]} ref={ref} />
      <MeshDistortMaterial
        speed={1}
        factor={2}
        color="white"
        metalness={0.9}
        roughness={0}
      />
    </mesh>
  );
}

export default function Scene({ analyzer, onClick }: Props): ReactNode {
  return (
    <>
      {/* camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />
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
