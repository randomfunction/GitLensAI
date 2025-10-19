  'use client';

  import { useRef } from 'react';
  import { Canvas, useFrame } from '@react-three/fiber';
  import { Box } from '@react-three/drei';

  function RotatingBox() {
    const meshRef = useRef<any>();

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
      }
    });

    return (
      <Box ref={meshRef} args={[2, 2, 2]}>
        <meshStandardMaterial color="#000000ff" wireframe />
      </Box>
    );
  }

  export default function Scene() {
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
      </Canvas>
    );
  }
