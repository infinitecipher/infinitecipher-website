"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function DragIcosahedron({ opacity = 0.6, scale = 2.4 }: { opacity?: number; scale?: number }) {
  const { gl } = useThree();

  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const rotRef    = useRef({ x: 0.3, y: 0.2 });
  const velRef    = useRef({ x: 0, y: 0 });      // drag inertia
  const dragging  = useRef(false);
  const prevPos   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const startDrag = (x: number, y: number) => {
      dragging.current = true;
      prevPos.current = { x, y };
      velRef.current  = { x: 0, y: 0 };
    };
    const moveDrag = (x: number, y: number) => {
      if (!dragging.current) return;
      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      rotRef.current.y += dx * 0.009;
      rotRef.current.x += dy * 0.009;
      velRef.current = { x: dx * 0.009, y: dy * 0.009 };
      prevPos.current = { x, y };
    };
    const endDrag = () => { dragging.current = false; };

    const onMouseDown  = (e: MouseEvent)  => startDrag(e.clientX, e.clientY);
    const onMouseMove  = (e: MouseEvent)  => moveDrag(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent)  => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove  = (e: TouchEvent)  => { if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY); };

    // drag starts only on the canvas, continues anywhere
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    endDrag);
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   endDrag);

    return () => {
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    endDrag);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   endDrag);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!dragging.current) {
      // Inertia coast
      velRef.current.x *= 0.92;
      velRef.current.y *= 0.92;
      rotRef.current.y += velRef.current.x;
      rotRef.current.x += velRef.current.y;
      // Slow auto-rotate
      rotRef.current.y += delta * 0.35;
      rotRef.current.x += delta * 0.07;
    }

    if (outerRef.current) {
      outerRef.current.rotation.y = rotRef.current.y;
      outerRef.current.rotation.x = rotRef.current.x;
    }
    if (innerRef.current) {
      // Counter-rotate for depth interest
      innerRef.current.rotation.y = -rotRef.current.y * 0.55;
      innerRef.current.rotation.x =  rotRef.current.x * 0.45;
    }
  });

  return (
    <>
      {/* Outer low-detail wireframe */}
      <mesh ref={outerRef} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#AFA9EC" wireframe transparent opacity={opacity} />
      </mesh>
      {/* Inner higher-detail wireframe — different colour for depth */}
      <mesh ref={innerRef} scale={scale * 0.58}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#534AB7" wireframe transparent opacity={opacity * 0.45} />
      </mesh>
    </>
  );
}

export default function IcosahedronCanvas({
  opacity   = 0.6,
  scale     = 2.4,
  className = "",
}: {
  opacity?:  number;
  scale?:    number;
  className?: string;
}) {
  return (
    <div
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D shape — drag to rotate"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <DragIcosahedron opacity={opacity} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
