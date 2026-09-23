"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { ZoomIn, ZoomOut, RotateCcw, Compass } from "lucide-react";

function ArmchairModel() {
  // Try loading GLB model if available
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scene } = useGLTF("/models/armchair.glb");
    return <primitive object={scene} scale={1.2} position={[0, -0.5, 0]} />;
  } catch {
    // Fallback procedural contemporary green armchair matching FurniMesh design
    return <ProceduralArmchair />;
  }
}

function ProceduralArmchair() {
  const greenFabricMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4A5D43"), // Tactile woven olive green fabric
    roughness: 0.8,
    metalness: 0.05,
  });

  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2A1C12"), // Dark-stained wooden side supports
    roughness: 0.4,
    metalness: 0.1,
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Lower Plush Cushion Base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={greenFabricMat}>
        <boxGeometry args={[1.5, 0.55, 1.35]} />
      </mesh>

      {/* Upper Curved Backrest & Integrated Armrests */}
      <mesh position={[0, 1.05, -0.1]} castShadow receiveShadow material={greenFabricMat}>
        <boxGeometry args={[1.48, 0.55, 1.15]} />
      </mesh>

      {/* Left Dark-Stained Wooden Side Support Leg */}
      <mesh position={[-0.82, 0.7, 0]} castShadow receiveShadow material={darkWoodMat}>
        <boxGeometry args={[0.12, 1.35, 1.2]} />
      </mesh>

      {/* Right Dark-Stained Wooden Side Support Leg */}
      <mesh position={[0.82, 0.7, 0]} castShadow receiveShadow material={darkWoodMat}>
        <boxGeometry args={[0.12, 1.35, 1.2]} />
      </mesh>

      {/* Ground Soft Contact Shadow */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.6, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Preload GLB model
useGLTF.preload("/models/armchair.glb");

export default function ArmchairViewer() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.3);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.3);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#FAF8F5]">
      {/* 3D Viewer Toolbar Overlay (Zoom In, Zoom Out, Auto-Rotate, Reset) */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 p-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md text-white border border-white/10 shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In 3D Model"
          className="p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4 text-[#F4F2ED]" />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out 3D Model"
          className="p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4 text-[#F4F2ED]" />
        </button>

        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          title="Toggle 360° Rotation"
          aria-label="Toggle 360 Rotation"
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            autoRotate ? "bg-[#D95D39] text-white" : "hover:bg-white/20 text-[#F4F2ED]"
          }`}
        >
          <Compass className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="Reset Camera View"
          aria-label="Reset Camera View"
          className="p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#F4F2ED]" />
        </button>
      </div>

      {/* Top Interactive Prompt Badge */}
      <div className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#111111]/10 text-[11px] font-mono font-medium text-[#111111] shadow-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D95D39] animate-ping" />
        <span>Drag to Rotate 360° | Scroll to Zoom</span>
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [2.5, 1.8, 3.2], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} color="#FFFDF7" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          color="#FFF"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#B5D5E5" />

        <Suspense fallback={null}>
          <Center>
            <ArmchairModel />
          </Center>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          minDistance={1.2}
          maxDistance={6.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  );
}
