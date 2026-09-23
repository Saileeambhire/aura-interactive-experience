"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface RoomProps {
  floorMaterialColor?: string;
  wallColor?: string;
}

export function Room({ floorMaterialColor = "#DDD7CD", wallColor = "#F0ECE1" }: RoomProps) {
  const floorMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(floorMaterialColor),
      roughness: 0.35,
      metalness: 0.05,
    });
  }, [floorMaterialColor]);

  const wallMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(wallColor),
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [wallColor]);

  const windowFrameMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1A1A"),
      roughness: 0.3,
      metalness: 0.7,
    });
  }, []);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E0F2FE"),
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
    });
  }, []);

  const skirtingMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D5CFBF"),
      roughness: 0.6,
    });
  }, []);

  return (
    <group name="room-architecture">
      {/* Floor Slab */}
      <mesh position={[0, -0.05, 0]} receiveShadow material={floorMat}>
        <boxGeometry args={[7, 0.1, 7]} />
      </mesh>

      {/* Decorative Floor Planks Inset Line Detail */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={`plank-${i}`} position={[x, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.015, 6.8]} />
          <meshBasicMaterial color="#BBB5A7" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Back Wall */}
      <mesh position={[0, 2.2, -2.5]} receiveShadow material={wallMat}>
        <boxGeometry args={[7, 4.4, 0.1]} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[3.5, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={wallMat}>
        <boxGeometry args={[7, 4.4, 0.1]} />
      </mesh>

      {/* Left Wall with Architectural Window Cutout */}
      {/* Lower Wall Section */}
      <mesh position={[-3.5, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={wallMat}>
        <boxGeometry args={[7, 1.0, 0.1]} />
      </mesh>
      {/* Upper Wall Section */}
      <mesh position={[-3.5, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={wallMat}>
        <boxGeometry args={[7, 1.2, 0.1]} />
      </mesh>
      {/* Left Wall Pillar Rear */}
      <mesh position={[-3.5, 2.2, -2.0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={wallMat}>
        <boxGeometry args={[1.0, 2.4, 0.1]} />
      </mesh>
      {/* Left Wall Pillar Front */}
      <mesh position={[-3.5, 2.2, 2.0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={wallMat}>
        <boxGeometry args={[1.0, 2.4, 0.1]} />
      </mesh>

      {/* Window Frame */}
      <mesh position={[-3.48, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} material={windowFrameMat}>
        <boxGeometry args={[3.0, 2.4, 0.06]} />
      </mesh>

      {/* Window Glass Pane */}
      <mesh position={[-3.46, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} material={glassMat}>
        <planeGeometry args={[2.9, 2.3]} />
      </mesh>

      {/* Baseboard / Skirting Board along Back Wall */}
      <mesh position={[0, 0.08, -2.44]} material={skirtingMat}>
        <boxGeometry args={[6.9, 0.16, 0.02]} />
      </mesh>

      {/* Soft Contact Shadow Receiver Disc under furniture center */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2.8, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}
