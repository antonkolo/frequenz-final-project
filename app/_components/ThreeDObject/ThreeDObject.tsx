import type { ReactNode } from 'react';

export default function ThreeDObject(): ReactNode {
  return (
    <mesh>
      <sphereGeometry args={[1, 20, 20]}></sphereGeometry>
      <ambientLight></ambientLight>
    </mesh>
  );
}
