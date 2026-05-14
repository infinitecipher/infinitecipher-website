"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  scale: number;
  speed: number;
}

function DriftingShape({ position, scale, speed }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posRef = useRef(new THREE.Vector3(...position));
  const velRef = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.002,
    (Math.random() - 0.5) * 0.002,
    0
  ));

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed;
      meshRef.current.rotation.x += delta * speed * 0.4;
      posRef.current.add(velRef.current);
      if (Math.abs(posRef.current.x) > 8) velRef.current.x *= -1;
      if (Math.abs(posRef.current.y) > 5) velRef.current.y *= -1;
      meshRef.current.position.copy(posRef.current);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#AFA9EC" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

const shapes: ShapeProps[] = [
  { position: [-6, 3, -2], scale: 2.5, speed: 0.15 },
  { position: [5, -2, -3], scale: 1.8, speed: 0.2 },
  { position: [0, 4, -4], scale: 3.2, speed: 0.1 },
  { position: [-4, -3, -2], scale: 1.4, speed: 0.25 },
];

export default function FloatingShapesCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          {shapes.map((s, i) => (
            <DriftingShape key={i} {...s} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
