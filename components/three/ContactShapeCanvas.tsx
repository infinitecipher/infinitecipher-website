"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ICDocumentMesh({
  scale = 1,
  opacity = 0.3,
  color = "#AFA9EC",
  baseRotation = { x: 0, y: 0 },
}: {
  scale?: number;
  opacity?: number;
  color?: string;
  baseRotation?: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1, -1.5);
    shape.lineTo(-1,  1.5);
    shape.lineTo( 0.5, 1.5);
    shape.lineTo( 1,   1.0);
    shape.lineTo( 1,  -1.5);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.35, bevelEnabled: false });
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh ref={meshRef} scale={scale} rotation={[baseRotation.x, baseRotation.y, 0]}>
      <primitive object={geometry} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function MouseFollowScene() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  // Slow auto-rotation offset
  const autoY = useRef(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      targetRot.current = {
        x: -(e.clientY / window.innerHeight - 0.5) * Math.PI * 0.5,
        y:  (e.clientX / window.innerWidth  - 0.5) * Math.PI * 0.6,
      };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRot.current = {
          x: -(e.touches[0].clientY / window.innerHeight - 0.5) * Math.PI * 0.5,
          y:  (e.touches[0].clientX / window.innerWidth  - 0.5) * Math.PI * 0.6,
        };
      }
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame((_, delta) => {
    autoY.current += delta * 0.12;

    // Lerp toward mouse-driven rotation
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.04;
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRot.current.x;
      groupRef.current.rotation.y = currentRot.current.y + autoY.current;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large main shape */}
      <ICDocumentMesh scale={1.6} opacity={0.3}  color="#AFA9EC" baseRotation={{ x: 0.1, y: 0 }} />
      {/* Smaller offset shape for depth */}
      <ICDocumentMesh scale={0.9} opacity={0.18} color="#534AB7" baseRotation={{ x: -0.3, y: 0.8 }} />
    </group>
  );
}

export default function ContactShapeCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <MouseFollowScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
