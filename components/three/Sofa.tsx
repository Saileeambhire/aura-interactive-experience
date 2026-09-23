"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { MATERIALS_CONFIG, MaterialKey } from "@/config/materials";

interface SofaProps {
  materialKey: MaterialKey;
  scale?: number;
  opacity?: number;
}

export function Sofa({ materialKey, scale = 1, opacity = 1 }: SofaProps) {
  const matConfig = MATERIALS_CONFIG[materialKey] || MATERIALS_CONFIG.linen;

  // Create high quality procedural texture/material for cushion upholstery
  const sofaMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(matConfig.color),
      roughness: matConfig.roughness,
      metalness: matConfig.metalness,
      transparent: opacity < 1,
      opacity: opacity,
    });
  }, [matConfig, opacity]);

  const woodBaseMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3A261A"),
      roughness: 0.5,
      metalness: 0.1,
    });
  }, []);

  const pillowMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C5B39B"),
      roughness: 0.8,
      metalness: 0.05,
    });
  }, []);

  if (scale <= 0.01) return null;

  return (
    <group position={[-0.2, 0, -0.4]} scale={[scale, scale, scale]}>
      {/* Wooden Base Frame */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow material={woodBaseMat}>
        <boxGeometry args={[3.2, 0.15, 1.4]} />
      </mesh>

      {/* Sofa Legs */}
      {[-1.5, 1.5].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.075, z]} castShadow material={woodBaseMat}>
            <cylinderGeometry args={[0.04, 0.03, 0.15, 16]} />
          </mesh>
        ))
      )}

      {/* Main Seat Cushions (Modular 2-piece design) */}
      <mesh position={[-0.75, 0.35, 0.05]} castShadow receiveShadow material={sofaMaterial}>
        <boxGeometry args={[1.45, 0.32, 1.25]} />
      </mesh>
      <mesh position={[0.75, 0.35, 0.05]} castShadow receiveShadow material={sofaMaterial}>
        <boxGeometry args={[1.45, 0.32, 1.25]} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.75, -0.52]} castShadow receiveShadow material={sofaMaterial}>
        <boxGeometry args={[3.1, 0.55, 0.32]} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-1.5, 0.55, 0.02]} castShadow receiveShadow material={sofaMaterial}>
        <boxGeometry args={[0.25, 0.55, 1.35]} />
      </mesh>

      {/* Right Armrest */}
      <mesh position={[1.5, 0.55, 0.02]} castShadow receiveShadow material={sofaMaterial}>
        <boxGeometry args={[0.25, 0.55, 1.35]} />
      </mesh>

      {/* Decorative Throw Pillows */}
      <mesh position={[-1.1, 0.6, -0.3]} rotation={[0.1, 0.2, -0.1]} castShadow receiveShadow material={pillowMat}>
        <boxGeometry args={[0.45, 0.45, 0.18]} />
      </mesh>
      <mesh position={[1.1, 0.6, -0.3]} rotation={[0.1, -0.25, 0.1]} castShadow receiveShadow material={pillowMat}>
        <boxGeometry args={[0.42, 0.42, 0.16]} />
      </mesh>
    </group>
  );
}
