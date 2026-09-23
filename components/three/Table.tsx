"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { MATERIALS_CONFIG, MaterialKey } from "@/config/materials";

interface TableProps {
  materialKey: MaterialKey;
  scale?: number;
}

export function Table({ materialKey, scale = 1 }: TableProps) {
  const matConfig = MATERIALS_CONFIG[materialKey] || MATERIALS_CONFIG.oak;

  const topMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(matConfig.color),
      roughness: matConfig.roughness,
      metalness: matConfig.metalness,
    });
  }, [matConfig]);

  const legMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1A1A"),
      roughness: 0.2,
      metalness: 0.85,
    });
  }, []);

  const ceramicMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E8E5DF"),
      roughness: 0.3,
      metalness: 0.05,
    });
  }, []);

  const bookMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D95D39"),
      roughness: 0.5,
      metalness: 0.0,
    });
  }, []);

  if (scale <= 0.01) return null;

  return (
    <group position={[-0.2, 0, 1.1]} scale={[scale, scale, scale]}>
      {/* Table Top Slab */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow material={topMaterial}>
        <boxGeometry args={[1.6, 0.06, 0.8]} />
      </mesh>

      {/* Metal Legs Frame */}
      {[-0.7, 0.7].map((x, i) =>
        [-0.3, 0.3].map((z, j) => (
          <mesh key={`tleg-${i}-${j}`} position={[x, 0.19, z]} castShadow material={legMaterial}>
            <cylinderGeometry args={[0.025, 0.02, 0.38, 16]} />
          </mesh>
        ))
      )}

      {/* Accessories on Table */}
      {/* Ceramic Architectural Vase */}
      <mesh position={[0.4, 0.52, 0.1]} castShadow material={ceramicMat}>
        <cylinderGeometry args={[0.07, 0.09, 0.22, 24]} />
      </mesh>

      {/* Design Book */}
      <mesh position={[-0.3, 0.42, -0.05]} rotation={[0, 0.15, 0]} castShadow material={bookMat}>
        <boxGeometry args={[0.3, 0.03, 0.22]} />
      </mesh>
    </group>
  );
}
