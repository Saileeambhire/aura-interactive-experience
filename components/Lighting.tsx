"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LIGHTING_CONFIG, LightMode } from "@/config/lighting";
import { MaterialKey } from "@/config/materials";
import { Sun, Sunset, Moon, Sparkles } from "lucide-react";

// Dynamically import 3D Scene for the Lighting Section preview
const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-white/5 rounded-3xl animate-pulse">
      <span className="text-xs uppercase tracking-widest text-current/60">Loading 3D Lighting Viewport...</span>
    </div>
  ),
});

interface LightingProps {
  activeLightMode: LightMode;
  onSelectLightMode: (mode: LightMode) => void;
  activeMaterial?: MaterialKey;
}

export function Lighting({
  activeLightMode,
  onSelectLightMode,
  activeMaterial = "marble",
}: LightingProps) {
  const [selectedMode, setSelectedMode] = useState<LightMode>(activeLightMode);

  useEffect(() => {
    setSelectedMode(activeLightMode);
  }, [activeLightMode]);

  const modes: LightMode[] = ["day", "sunset", "night"];

  const handleModeClick = (mode: LightMode) => {
    setSelectedMode(mode);
    onSelectLightMode(mode);
  };

  const getIcon = (mode: LightMode) => {
    switch (mode) {
      case "day":
        return <Sun className="w-5 h-5 text-amber-500" />;
      case "sunset":
        return <Sunset className="w-5 h-5 text-[#D95D39]" />;
      case "night":
        return <Moon className="w-5 h-5 text-indigo-400" />;
    }
  };

  const activeConfig = LIGHTING_CONFIG[selectedMode] || LIGHTING_CONFIG.day;

  return (
    <section
      id="lighting"
      className="py-28 transition-colors duration-700 ease-in-out border-t border-[#111111]/10 overflow-hidden"
      style={{
        backgroundColor: activeConfig.bgColor,
        color: activeConfig.textColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME VOLUMETRIC LIGHTING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight font-heading">
            Light changes everything.
          </h2>

          <p className="text-base sm:text-lg font-light max-w-2xl opacity-80">
            Select an atmospheric time of day to transform the 3D room&apos;s solar trajectory, fog density, shadow warmth, and active floor lamp illumination.
          </p>

          {/* Horizontal Lighting Selector Bar */}
          <div className="mt-6 inline-flex p-2 rounded-full bg-white/10 backdrop-blur-md border border-current/15 gap-2 z-20">
            {modes.map((mode) => {
              const conf = LIGHTING_CONFIG[mode];
              const isSelected = selectedMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeClick(mode)}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#D95D39] text-white shadow-xl shadow-[#D95D39]/40 scale-105"
                      : "opacity-70 hover:opacity-100 hover:bg-white/10"
                  }`}
                >
                  {getIcon(mode)}
                  <span>{conf.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Interactive Info on Left, Live 3D Room Viewport on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Info & Atmosphere Details */}
          <motion.div
            key={selectedMode}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="p-8 rounded-3xl border border-current/15 bg-white/5 backdrop-blur-lg flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-current/10">
                  {getIcon(selectedMode)}
                </div>
                <div>
                  <div className="text-xs font-mono tracking-widest text-[#D95D39] uppercase">
                    {activeConfig.sublabel}
                  </div>
                  <h3 className="text-2xl font-bold font-heading mt-1">
                    {activeConfig.label} Ambiance
                  </h3>
                </div>
              </div>

              <p className="text-sm font-light leading-relaxed opacity-85">
                {activeConfig.description}
              </p>

              <div className="pt-4 border-t border-current/10 flex flex-col gap-2.5 text-xs font-mono opacity-80">
                <div className="flex justify-between">
                  <span>Sunlight Intensity</span>
                  <span className="text-[#D95D39] font-bold">{activeConfig.sunIntensity}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Floor Lamp Output</span>
                  <span className="text-[#D95D39] font-bold">{activeConfig.lampIntensity > 0 ? `${activeConfig.lampIntensity} W` : "OFF"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sky Glow Tint</span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block border border-current/20" style={{ backgroundColor: activeConfig.windowLightColor }} />
                    {activeConfig.windowLightColor}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Live 3D WebGL Lighting Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 h-[420px] sm:h-[520px] w-full relative rounded-3xl border border-current/15 bg-black/20 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-white uppercase border border-white/10">
              Live 3D Light Viewport
            </div>

            <Scene
              currentStep={4}
              materialKey={activeMaterial}
              lightMode={selectedMode}
              furnitureScale={1}
              furnitureOpacity={1}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
