"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface PlantProps {
  scale?: number;
}

export function Plant({ scale = 1 }: PlantProps) {
  const potMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C86A4B"), // Terracotta
      roughness: 0.75,
      metalness: 0.05,
    });
  }, []);

  const leafMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2E5A44"), // Rich deep olive green
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  const stemMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E3A2B"),
      roughness: 0.6,
      metalness: 0.0,
    });
  }, []);

  if (scale <= 0.01) return null;

  return (
    <group position={[-2.0, 0, -0.6]} scale={[scale, scale, scale]}>
      {/* Terracotta Planter Pot */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={potMat}>
        <cylinderGeometry args={[0.3, 0.22, 0.6, 24]} />
      </mesh>

      {/* Main Stem */}
      <mesh position={[0, 0.8, 0]} castShadow material={stemMat}>
        <cylinderGeometry args={[0.025, 0.035, 0.7, 12]} />
      </mesh>

      {/* Foliage Leaves */}
      {[
        { pos: [0.15, 0.8, 0.1], rot: [0.4, 0.2, -0.3], s: 0.25 },
        { pos: [-0.18, 0.95, -0.1], rot: [-0.3, -0.4, 0.3], s: 0.28 },
        { pos: [0.2, 1.1, -0.15], rot: [0.2, 0.8, -0.2], s: 0.3 },
        { pos: [-0.15, 1.25, 0.15], rot: [-0.2, -0.6, 0.4], s: 0.32 },
        { pos: [0.05, 1.4, 0.0], rot: [0.1, 0.1, 0.0], s: 0.35 },
      ].map((leaf, i) => (
        <group key={`leaf-${i}`} position={leaf.pos as [number, number, number]} rotation={leaf.rot as [number, number, number]}>
          <mesh castShadow receiveShadow material={leafMat}>
            <sphereGeometry args={[leaf.s, 16, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
