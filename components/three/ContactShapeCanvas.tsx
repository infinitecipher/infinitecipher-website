"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ExtrudedDocument() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1, -1.4);
    shape.lineTo(-1, 1.4);
    shape.lineTo(0.6, 1.4);
    shape.lineTo(1, 1.0);
    shape.lineTo(1, -1.4);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false });
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color="#AFA9EC" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

export default function ContactShapeCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ExtrudedDocument />
        </Suspense>
      </Canvas>
    </div>
  );
}
