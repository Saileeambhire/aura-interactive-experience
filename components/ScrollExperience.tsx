"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { SCROLL_STEPS } from "@/config/room";
import { MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-[#EAE7E0]/40 rounded-2xl animate-pulse">
      <span className="text-xs uppercase tracking-widest text-[#77736B]">Loading 3D Room...</span>
    </div>
  ),
});

interface ScrollExperienceProps {
  onStepChange?: (step: number, material?: MaterialKey, light?: LightMode) => void;
}

export function ScrollExperience({ onStepChange }: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeStep = SCROLL_STEPS[activeStepIndex] || SCROLL_STEPS[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=220%",
        pin: pinnedContentRef.current,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate step index (0 to 4)
          const newStepIndex = Math.min(
            4,
            Math.floor(progress * SCROLL_STEPS.length)
          );

          setActiveStepIndex(newStepIndex);

          if (onStepChange) {
            const stepConf = SCROLL_STEPS[newStepIndex];
            onStepChange(stepConf.step, stepConf.defaultMaterial, stepConf.defaultLighting);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onStepChange]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full min-h-[260vh] bg-[#111111] text-[#F4F2ED]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between p-6 sm:p-12 overflow-hidden"
      >
        {/* Top Header info */}
        <div className="flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95D39] animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#77736B]">
              SCROLL STORYTELLING
            </span>
          </div>
          <div className="text-xs font-mono text-[#77736B]">
            0{activeStep.step} / 05
          </div>
        </div>

        {/* Middle Main Grid: Text on Left, 3D Room on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-7xl mx-auto w-full z-20 my-auto">
          {/* Left Text Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="inline-block text-xs font-mono tracking-widest text-[#D95D39] uppercase">
              {activeStep.title}
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F2ED] leading-[1.1] font-heading">
              {activeStep.heading}
            </h2>

            <p className="text-base sm:text-lg text-[#77736B] font-light leading-relaxed">
              {activeStep.description}
            </p>

            {/* Step Navigation Dots */}
            <div className="flex items-center gap-2 pt-4">
              {SCROLL_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    if (onStepChange) onStepChange(s.step, s.defaultMaterial, s.defaultLighting);
                  }}
                  aria-label={`Jump to Step ${s.step}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStepIndex === idx
                      ? "w-8 bg-[#D95D39]"
                      : "w-2 bg-[#F4F2ED]/20 hover:bg-[#F4F2ED]/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Pinned 3D Viewport */}
          <div className="lg:col-span-7 h-[380px] sm:h-[500px] w-full relative rounded-3xl border border-[#F4F2ED]/10 bg-[#161616] overflow-hidden shadow-2xl">
            <Scene
              currentStep={activeStep.step}
              materialKey={activeStep.defaultMaterial}
              lightMode={activeStep.defaultLighting}
              scrollProgress={scrollProgress}
              furnitureScale={activeStep.furnitureScale}
              furnitureOpacity={activeStep.furnitureOpacity}
            />
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full bg-[#F4F2ED]/10 h-1 rounded-full overflow-hidden z-20">
          <div
            className="h-full bg-[#D95D39] transition-all duration-300"
            style={{ width: `${((activeStepIndex + 1) / SCROLL_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
