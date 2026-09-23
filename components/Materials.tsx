"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MATERIALS_CONFIG, MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";
import { Sparkles, Check } from "lucide-react";

// Dynamically import 3D Scene for the Materials Section preview
const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-[#EAE7E0]/60 rounded-3xl animate-pulse">
      <span className="text-xs uppercase tracking-widest text-[#77736B]">Loading 3D Material Viewport...</span>
    </div>
  ),
});

interface MaterialsProps {
  activeMaterial: MaterialKey;
  onSelectMaterial: (key: MaterialKey) => void;
  activeLightMode?: LightMode;
}

export function Materials({
  activeMaterial,
  onSelectMaterial,
  activeLightMode = "day",
}: MaterialsProps) {
  const materialList = Object.values(MATERIALS_CONFIG);
  const activeMatConfig = MATERIALS_CONFIG[activeMaterial] || MATERIALS_CONFIG.oak;

  return (
    <section id="materials" className="py-24 bg-[#F4F2ED] border-t border-[#111111]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TACTILE MATERIAL PALETTE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] font-heading">
              Every surface tells a story.
            </h2>
          </div>
          <p className="text-[#77736B] font-light max-w-md text-base sm:text-lg">
            Select any material below to instantly re-skin the 3D room furniture and slab surfaces with real-time PBR texture properties.
          </p>
        </div>

        {/* Top 3D Material Preview & Real Photography Showcase */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EAE7E0]/60 p-6 sm:p-8 rounded-3xl border border-[#111111]/10">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-[#D95D39] uppercase">
              ACTIVE MATERIAL FOCUS — {activeMatConfig.category}
            </span>
            <h3 className="text-3xl font-bold text-[#111111] font-heading flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full border border-black/20 shadow-sm"
                style={{ backgroundColor: activeMatConfig.hex }}
              />
              {activeMatConfig.name}
            </h3>
            <div className="text-sm font-semibold text-[#D95D39]">
              {activeMatConfig.tagline}
            </div>
            <p className="text-sm text-[#77736B] font-light leading-relaxed">
              {activeMatConfig.description}
            </p>

            {/* Real Photograph Thumbnail Badge */}
            <div className="mt-2 flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#111111]/10 backdrop-blur-sm">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                <Image
                  src={activeMatConfig.image}
                  alt={`${activeMatConfig.name} Real Photography`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#77736B]">Real Interior Sample</span>
                <span className="text-xs font-bold text-[#111111]">{activeMatConfig.name} Finish</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 h-[340px] sm:h-[400px] w-full relative rounded-2xl border border-[#111111]/10 bg-[#F4F2ED] overflow-hidden shadow-lg">
            <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-[#111111]/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-white uppercase">
              3D PBR Material Viewport
            </div>

            <Scene
              currentStep={3}
              materialKey={activeMaterial}
              lightMode={activeLightMode}
              furnitureScale={1}
              furnitureOpacity={1}
            />
          </div>
        </div>

        {/* Interactive Material Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {materialList.map((mat) => {
            const isSelected = activeMaterial === mat.id;

            return (
              <motion.div
                key={mat.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => onSelectMaterial(mat.id as MaterialKey)}
                className={`group relative p-8 rounded-3xl cursor-pointer border transition-all duration-300 overflow-hidden flex flex-col justify-between h-[300px] ${
                  isSelected
                    ? "bg-[#111111] text-[#F4F2ED] border-[#111111] shadow-2xl scale-[1.02]"
                    : "bg-[#EAE7E0]/60 text-[#111111] border-[#111111]/10 hover:border-[#111111]/30 hover:bg-[#EAE7E0]"
                }`}
              >
                {/* Background Real Photography Texture Overlay */}
                <Image
                  src={mat.image}
                  alt={`${mat.name} Photographed Surface`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-300 pointer-events-none ${
                    isSelected ? "opacity-20" : "opacity-10 group-hover:opacity-20"
                  }`}
                />

                {/* Top Material Color Circle / Swatch */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: mat.hex }}
                    />
                    <span
                      className={`text-xs font-mono uppercase tracking-wider ${
                        isSelected ? "text-[#D95D39]" : "text-[#77736B]"
                      }`}
                    >
                      {mat.category}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="p-1.5 rounded-full bg-[#D95D39] text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Middle Name and Tagline */}
                <div className="z-10 my-auto">
                  <h3 className="text-3xl font-bold font-heading tracking-tight mb-2">
                    {mat.name}
                  </h3>
                  <div className="text-sm font-medium tracking-wide text-[#D95D39]">
                    {mat.tagline}
                  </div>
                  <p
                    className={`mt-3 text-xs font-light leading-relaxed line-clamp-2 ${
                      isSelected ? "text-[#F4F2ED]/70" : "text-[#77736B]"
                    }`}
                  >
                    {mat.description}
                  </p>
                </div>

                {/* Bottom Action Hint */}
                <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-medium z-10">
                  <span>{isSelected ? "Active 3D Skin" : "Click to Apply"}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
