"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeDef {
  position: [number, number, number];
  scale: number;
  speed: number;
  geo: "icosa" | "octa" | "tetra";
  color: string;
}

const SHAPES: ShapeDef[] = [
  { position: [-6,  3,  -1], scale: 3.0,  speed: 0.14, geo: "icosa", color: "#AFA9EC" },
  { position: [ 5, -2,  -2], scale: 2.2,  speed: 0.20, geo: "octa",  color: "#534AB7" },
  { position: [ 1,  4,  -3], scale: 3.8,  speed: 0.09, geo: "icosa", color: "#AFA9EC" },
  { position: [-4, -3,  -1], scale: 1.8,  speed: 0.26, geo: "tetra", color: "#5DCAA5" },
  { position: [ 7,  2,  -2], scale: 2.6,  speed: 0.17, geo: "octa",  color: "#534AB7" },
  { position: [-2, -4,  -2], scale: 2.0,  speed: 0.22, geo: "icosa", color: "#5DCAA5" },
];

function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Drifting positions & velocities per shape
  const posRefs = useRef(SHAPES.map(s => new THREE.Vector3(...s.position)));
  const velRefs = useRef(SHAPES.map(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.003,
    (Math.random() - 0.5) * 0.003,
    0,
  )));
  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(SHAPES.length).fill(null));

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      targetRef.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRef.current = {
          x:  (e.touches[0].clientX / window.innerWidth  - 0.5) * 2,
          y: -(e.touches[0].clientY / window.innerHeight - 0.5) * 2,
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
    // Smooth mouse parallax lerp
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.04;

    // Shift the whole group slightly opposite to mouse — parallax feel
    if (groupRef.current) {
      groupRef.current.position.x += (-mouseRef.current.x * 0.6 - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += ( mouseRef.current.y * 0.4 - groupRef.current.position.y) * 0.05;
    }

    // Individual shape drift + rotation
    SHAPES.forEach((_, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const pos = posRefs.current[i];
      const vel = velRefs.current[i];

      pos.add(vel);
      if (Math.abs(pos.x) > 9) vel.x *= -1;
      if (Math.abs(pos.y) > 6) vel.y *= -1;
      mesh.position.copy(pos);

      mesh.rotation.y += delta * SHAPES[i].speed;
      mesh.rotation.x += delta * SHAPES[i].speed * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {SHAPES.map((s, i) => (
        <mesh
          key={i}
          ref={el => { meshRefs.current[i] = el; }}
          position={s.position}
          scale={s.scale}
        >
          {s.geo === "icosa" && <icosahedronGeometry args={[1, 0]} />}
          {s.geo === "octa"  && <octahedronGeometry  args={[1, 0]} />}
          {s.geo === "tetra" && <tetrahedronGeometry  args={[1, 0]} />}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingShapesCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <SceneGroup />
        </Suspense>
      </Canvas>
    </div>
  );
}
