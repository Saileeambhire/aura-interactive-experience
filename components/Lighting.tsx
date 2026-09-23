"use client";

import React from "react";
import { motion } from "framer-motion";
import { LIGHTING_CONFIG, LightMode } from "@/config/lighting";
import { Sun, Sunset, Moon, Sparkles } from "lucide-react";

interface LightingProps {
  activeLightMode: LightMode;
  onSelectLightMode: (mode: LightMode) => void;
}

export function Lighting({ activeLightMode, onSelectLightMode }: LightingProps) {
  const modes: LightMode[] = ["day", "sunset", "night"];

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

  const activeConfig = LIGHTING_CONFIG[activeLightMode] || LIGHTING_CONFIG.day;

  return (
    <section
      id="lighting"
      className="py-28 transition-colors duration-700 ease-in-out border-t border-[#111111]/10"
      style={{
        backgroundColor: activeConfig.bgColor,
        color: activeConfig.textColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VOLUMETRIC ILLUMINATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight font-heading">
            Light changes everything.
          </h2>

          <p className="text-base sm:text-lg font-light max-w-xl opacity-75">
            Select an atmospheric time of day to transform the room&apos;s solar trajectory, fog density, shadow warmth, and active interior lamp glow.
          </p>

          {/* Horizontal Lighting Selector Bar */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-current/15 gap-2">
            {modes.map((mode) => {
              const conf = LIGHTING_CONFIG[mode];
              const isSelected = activeLightMode === mode;

              return (
                <button
                  key={mode}
                  onClick={() => onSelectLightMode(mode)}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isSelected
                      ? "bg-[#D95D39] text-white shadow-lg shadow-[#D95D39]/30"
                      : "opacity-60 hover:opacity-100 hover:bg-white/10"
                  }`}
                >
                  {getIcon(mode)}
                  <span>{conf.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Light Card Banner */}
        <motion.div
          key={activeLightMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl border border-current/15 bg-white/5 backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-white/10 border border-current/10">
              {getIcon(activeLightMode)}
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
          <p className="text-sm font-light leading-relaxed max-w-sm opacity-80 text-left">
            {activeConfig.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
