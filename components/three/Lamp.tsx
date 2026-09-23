"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { LIGHTING_CONFIG, LightMode } from "@/config/lighting";

interface LampProps {
  lightMode: LightMode;
  scale?: number;
}

export function Lamp({ lightMode, scale = 1 }: LampProps) {
  const lightConfig = LIGHTING_CONFIG[lightMode] || LIGHTING_CONFIG.day;

  const brassMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4AF37"),
      roughness: 0.25,
      metalness: 0.8,
    });
  }, []);

  const shadeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#111111"),
      roughness: 0.4,
      metalness: 0.2,
    });
  }, []);

  const bulbMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(lightConfig.lampColor),
    });
  }, [lightConfig.lampColor]);

  if (scale <= 0.01) return null;

  return (
    <group position={[1.8, 0, -0.6]} scale={[scale, scale, scale]}>
      {/* Heavy Base Disc */}
      <mesh position={[0, 0.02, 0]} castShadow material={brassMat}>
        <cylinderGeometry args={[0.25, 0.28, 0.04, 32]} />
      </mesh>

      {/* Main Vertical Pole */}
      <mesh position={[0, 1.1, 0]} castShadow material={brassMat}>
        <cylinderGeometry args={[0.02, 0.02, 2.1, 16]} />
      </mesh>

      {/* Arching Arm */}
      <mesh position={[-0.3, 2.1, 0]} rotation={[0, 0, Math.PI / 6]} castShadow material={brassMat}>
        <cylinderGeometry args={[0.018, 0.018, 0.7, 16]} />
      </mesh>

      {/* Lamp Shade Dome */}
      <mesh position={[-0.55, 1.95, 0]} rotation={[0, 0, 0]} castShadow material={shadeMat}>
        <coneGeometry args={[0.22, 0.25, 32]} />
      </mesh>

      {/* Emitter Bulb */}
      <mesh position={[-0.55, 1.86, 0]} material={bulbMat}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>

      {/* Actual Point Light for Night / Sunset ambiance */}
      <pointLight
        position={[-0.55, 1.8, 0]}
        intensity={lightConfig.lampIntensity}
        color={lightConfig.lampColor}
        distance={6}
        decay={2}
        castShadow
      />
    </group>
  );
}
