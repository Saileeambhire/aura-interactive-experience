"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { LightMode } from "@/config/lighting";

interface RoomProps {
  floorMaterialColor?: string;
  wallColor?: string;
  lightMode?: LightMode;
}

export function Room({
  floorMaterialColor,
  wallColor,
  lightMode = "day",
}: RoomProps) {
  // Determine dynamic architectural wall & floor tones based on light mode
  const effectiveWallColor = useMemo(() => {
    if (wallColor) return wallColor;
    switch (lightMode) {
      case "sunset":
        return "#4D2D22";
      case "night":
        return "#1B2333";
      case "day":
      default:
        return "#F0ECE1";
    }
  }, [wallColor, lightMode]);

  const effectiveFloorColor = useMemo(() => {
    if (floorMaterialColor) return floorMaterialColor;
    switch (lightMode) {
      case "sunset":
        return "#3B2016";
      case "night":
        return "#121824";
      case "day":
      default:
        return "#DDD7CD";
    }
  }, [floorMaterialColor, lightMode]);

  const floorMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(effectiveFloorColor),
      roughness: lightMode === "night" ? 0.25 : 0.35,
      metalness: 0.05,
    });
  }, [effectiveFloorColor, lightMode]);

  const wallMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(effectiveWallColor),
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [effectiveWallColor]);

  const windowFrameMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(lightMode === "night" ? "#0F172A" : "#1A1A1A"),
      roughness: 0.3,
      metalness: 0.7,
    });
  }, [lightMode]);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(lightMode === "night" ? "#38588A" : lightMode === "sunset" ? "#FF8C42" : "#E0F2FE"),
      transparent: true,
      opacity: lightMode === "night" ? 0.45 : 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
    });
  }, [lightMode]);

  const skirtingMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(lightMode === "night" ? "#1E293B" : lightMode === "sunset" ? "#3D241A" : "#D5CFBF"),
      roughness: 0.6,
    });
  }, [lightMode]);

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
          <meshBasicMaterial color={lightMode === "night" ? "#2A364F" : "#BBB5A7"} transparent opacity={0.3} />
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
        <meshBasicMaterial color="#000000" transparent opacity={lightMode === "night" ? 0.35 : 0.12} />
      </mesh>
    </group>
  );
}
