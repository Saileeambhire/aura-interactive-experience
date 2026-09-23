"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface ArtworkProps {
  scale?: number;
}

export function Artwork({ scale = 1 }: ArtworkProps) {

  const frameMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#111111"),
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  const canvasMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#EFECE6"),
      roughness: 0.8,
      metalness: 0.0,
    });
  }, []);

  const artGraphicMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D95D39"), // Terracotta accent graphic
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  if (scale <= 0.01) return null;

  return (
    <group position={[0, 2.3, -2.45]} scale={[scale, scale, scale]}>
      {/* Outer Thin Black Frame */}
      <mesh castShadow material={frameMat}>
        <boxGeometry args={[1.8, 1.2, 0.04]} />
      </mesh>

      {/* Inner Canvas Board */}
      <mesh position={[0, 0, 0.02]} receiveShadow material={canvasMat}>
        <boxGeometry args={[1.72, 1.12, 0.01]} />
      </mesh>

      {/* Minimalist Abstract Graphic Shapes on Canvas */}
      <mesh position={[-0.3, 0.1, 0.03]} rotation={[0, 0, 0.2]} material={artGraphicMat}>
        <circleGeometry args={[0.3, 32]} />
      </mesh>
      <mesh position={[0.25, -0.15, 0.03]} material={artGraphicMat}>
        <boxGeometry args={[0.4, 0.25, 0.005]} />
      </mesh>
    </group>
  );
}
