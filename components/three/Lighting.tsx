"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LIGHTING_CONFIG, LightMode } from "@/config/lighting";

interface LightingProps {
  lightMode: LightMode;
}

export function Lighting({ lightMode }: LightingProps) {
  const config = LIGHTING_CONFIG[lightMode] || LIGHTING_CONFIG.day;

  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const windowRef = useRef<THREE.RectAreaLight | THREE.SpotLight>(null);

  // Smooth lerp lighting properties on each frame
  useFrame((_, delta) => {
    const lerpFactor = Math.min(1, delta * 4); // smooth transition over ~0.25s

    if (sunRef.current) {
      sunRef.current.intensity = THREE.MathUtils.lerp(
        sunRef.current.intensity,
        config.sunIntensity,
        lerpFactor
      );
      sunRef.current.color.lerp(new THREE.Color(config.sunColor), lerpFactor);
      sunRef.current.position.lerp(new THREE.Vector3(...config.sunPosition), lerpFactor);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        config.ambientIntensity,
        lerpFactor
      );
      ambientRef.current.color.lerp(new THREE.Color(config.ambientColor), lerpFactor);
    }

    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(
        fillRef.current.intensity,
        config.fillIntensity,
        lerpFactor
      );
      fillRef.current.color.lerp(new THREE.Color(config.fillColor), lerpFactor);
    }

    if (windowRef.current) {
      windowRef.current.intensity = THREE.MathUtils.lerp(
        windowRef.current.intensity,
        config.windowLightIntensity,
        lerpFactor
      );
      windowRef.current.color.lerp(new THREE.Color(config.windowLightColor), lerpFactor);
    }
  });

  return (
    <>
      {/* Primary Sunlight / Key Light */}
      <directionalLight
        ref={sunRef}
        position={config.sunPosition}
        intensity={config.sunIntensity}
        color={config.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0002}
      />

      {/* Global Ambient Light */}
      <ambientLight
        ref={ambientRef}
        intensity={config.ambientIntensity}
        color={config.ambientColor}
      />

      {/* Cool Fill Light from opposing side */}
      <directionalLight
        ref={fillRef}
        position={[-8, 6, -6]}
        intensity={config.fillIntensity}
        color={config.fillColor}
      />

      {/* Window Sky Glow Spot Light */}
      <spotLight
        ref={windowRef as React.RefObject<THREE.SpotLight>}
        position={[-3.8, 2.5, 0]}
        target-position={[0, 1, 0]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={config.windowLightIntensity}
        color={config.windowLightColor}
      />

      {/* Ambiance Fog for Depth */}
      <fog attach="fog" args={[config.fogColor, config.fogNear, config.fogFar]} />
    </>
  );
}
