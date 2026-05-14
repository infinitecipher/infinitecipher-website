"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingIcosahedron({ opacity = 0.4, scale = 1.8 }: { opacity?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#AFA9EC" wireframe transparent opacity={opacity} />
    </mesh>
  );
}

export default function IcosahedronCanvas({
  opacity = 0.4,
  scale = 1.8,
  className = "",
}: {
  opacity?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <RotatingIcosahedron opacity={opacity} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
