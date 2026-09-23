"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SCROLL_STEPS } from "@/config/room";

interface CameraControllerProps {
  currentStep: number;
  scrollProgress?: number;
  enableMouseParallax?: boolean;
}

export function CameraController({
  currentStep,
  scrollProgress = 0,
  enableMouseParallax = true,
}: CameraControllerProps) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const targetPos = useRef(new THREE.Vector3(6, 4.5, 7));
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));

  // Track mouse position for subtle parallax
  useEffect(() => {
    if (!enableMouseParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = x * 0.4;
      mouseRef.current.targetY = y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableMouseParallax]);

  // Update target position based on currentStep or continuous scrollProgress
  useEffect(() => {
    const stepIndex = Math.min(Math.max(1, currentStep), SCROLL_STEPS.length) - 1;
    const stepConfig = SCROLL_STEPS[stepIndex];

    if (stepConfig) {
      targetPos.current.set(...stepConfig.cameraPosition);
      targetLook.current.set(...stepConfig.cameraTarget);
      if ("fov" in camera && typeof (camera as THREE.PerspectiveCamera).fov === "number") {
        (camera as THREE.PerspectiveCamera).fov = stepConfig.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    }
  }, [currentStep, camera]);

  useFrame((_, delta) => {
    const lerpFactor = Math.min(1, delta * 2.5);

    // Smooth mouse lerp
    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      mouseRef.current.targetX,
      0.05
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      mouseRef.current.targetY,
      0.05
    );

    // Desired camera position with mouse offset
    const desiredX = targetPos.current.x + mouseRef.current.x;
    const desiredY = targetPos.current.y - mouseRef.current.y;
    const desiredZ = targetPos.current.z;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, lerpFactor);

    // Smoothly update lookAt target
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    camera.lookAt(targetLook.current);
  });

  return null;
}
