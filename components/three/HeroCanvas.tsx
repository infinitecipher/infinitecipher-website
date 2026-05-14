"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT_DESKTOP = 200;
const PARTICLE_COUNT_MOBILE = 60;
const CONNECTION_DISTANCE = 2.5;

function ParticleField() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  const positionsRef = useRef(new Float32Array(count * 3));
  const velocitiesRef = useRef(new Float32Array(count * 3));
  const colorsRef = useRef(new Float32Array(count * 3));

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = positionsRef.current;
    const col = colorsRef.current;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const useTeal = Math.random() > 0.6;
      if (useTeal) {
        col[i * 3] = 0.365; col[i * 3 + 1] = 0.792; col[i * 3 + 2] = 0.647;
      } else {
        col[i * 3] = 0.686; col[i * 3 + 1] = 0.663; col[i * 3 + 2] = 0.925;
      }
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const linesGeo = useMemo(() => new THREE.BufferGeometry(), []);

  useEffect(() => {
    const vel = velocitiesRef.current;
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const handleMouse = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 3,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [count]);

  useFrame(() => {
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    const pos = positionsRef.current;
    const vel = velocitiesRef.current;
    const mx = mouseRef.current.x * 0.1;
    const my = mouseRef.current.y * 0.1;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3] + mx * 0.01;
      pos[i * 3 + 1] += vel[i * 3 + 1] + my * 0.01;
      pos[i * 3 + 2] += vel[i * 3 + 2];

      if (Math.abs(pos[i * 3]) > 6) vel[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 4) vel[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 3) vel[i * 3 + 2] *= -1;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // Update lines
    if (linesRef.current) {
      const linePositions: number[] = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DISTANCE) {
            linePositions.push(
              pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
              pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
            );
          }
        }
      }
      const arr = new Float32Array(linePositions);
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(arr, 3)
      );
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial color="#AFA9EC" transparent opacity={0.12} />
      </lineSegments>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
