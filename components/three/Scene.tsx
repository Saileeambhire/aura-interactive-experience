"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Room } from "./Room";
import { Furniture } from "./Furniture";
import { Lighting } from "./Lighting";
import { CameraController } from "./CameraController";
import { MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";

interface SceneProps {
  currentStep: number;
  materialKey: MaterialKey;
  lightMode: LightMode;
  scrollProgress?: number;
  furnitureScale?: number;
  furnitureOpacity?: number;
  interactive?: boolean;
}

export function SceneContent({
  currentStep,
  materialKey,
  lightMode,
  scrollProgress = 0,
  furnitureScale = 1,
  furnitureOpacity = 1,
}: SceneProps) {
  return (
    <>
      <CameraController currentStep={currentStep} scrollProgress={scrollProgress} />
      <Lighting lightMode={lightMode} />
      <Room lightMode={lightMode} />
      <Furniture
        materialKey={materialKey}
        lightMode={lightMode}
        scale={furnitureScale}
        opacity={furnitureOpacity}
      />
    </>
  );
}

export default function Scene(props: SceneProps) {
  return (
    <div className="relative w-full h-full min-h-[350px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [6, 4.5, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
