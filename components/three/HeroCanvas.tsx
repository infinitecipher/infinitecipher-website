"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DESKTOP_COUNT = 160;
const MOBILE_COUNT = 55;
const CONNECTION_DIST = 2.6;
const CURSOR_RADIUS = 3.5;
const CURSOR_STRENGTH = 0.006;

function ParticleField() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  // Keep a viewport snapshot so event handlers can map to world space
  const vpRef = useRef({ w: 20, h: 12 });

  const posRef = useRef(new Float32Array(count * 3));
  const velRef = useRef(new Float32Array(count * 3));
  const colRef = useRef(new Float32Array(count * 3));

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = posRef.current;
    const col = colRef.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      // ~65% lavender, 35% teal
      if (Math.random() > 0.35) {
        col[i * 3] = 0.686; col[i * 3 + 1] = 0.663; col[i * 3 + 2] = 0.925;
      } else {
        col[i * 3] = 0.365; col[i * 3 + 1] = 0.792; col[i * 3 + 2] = 0.647;
      }
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const linesGeo = useMemo(() => new THREE.BufferGeometry(), []);

  useEffect(() => {
    const vel = velRef.current;
    for (let i = 0; i < count; i++) {
      vel[i * 3]     = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const toWorld = (cx: number, cy: number) => ({
      x:  (cx / window.innerWidth  - 0.5) * vpRef.current.w,
      y: -(cy / window.innerHeight - 0.5) * vpRef.current.h,
    });

    const onMouse = (e: MouseEvent) => { targetRef.current = toWorld(e.clientX, e.clientY); };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0)
        targetRef.current = toWorld(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [count]);

  useFrame(({ viewport }) => {
    vpRef.current = { w: viewport.width, h: viewport.height };

    // Smooth mouse lerp
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.06;

    const pos = posRef.current;
    const vel = velRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < count; i++) {
      const px = pos[i * 3];
      const py = pos[i * 3 + 1];

      pos[i * 3]     += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];

      // Cursor gravity well — attract particles near the cursor
      const dx = mx - px;
      const dy = my - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < CURSOR_RADIUS && d > 0.05) {
        const f = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_STRENGTH;
        pos[i * 3]     += dx * f;
        pos[i * 3 + 1] += dy * f;
      }

      // Soft bounds — bounce velocity
      if (Math.abs(pos[i * 3])     > 8)   vel[i * 3]     *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 5)   vel[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 2.5) vel[i * 3 + 2] *= -1;
    }

    if (pointsRef.current) {
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    if (linesRef.current) {
      const lines: number[] = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECTION_DIST) {
            lines.push(
              pos[i*3], pos[i*3+1], pos[i*3+2],
              pos[j*3], pos[j*3+1], pos[j*3+2],
            );
          }
        }
      }
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(lines), 3),
      );
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial
          size={isMobile ? 0.07 : 0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial color="#AFA9EC" transparent opacity={0.14} />
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
