"use client";

import React from "react";
import { motion } from "framer-motion";
import { MATERIALS_CONFIG, MaterialKey } from "@/config/materials";
import { Sparkles, Check } from "lucide-react";

interface MaterialsProps {
  activeMaterial: MaterialKey;
  onSelectMaterial: (key: MaterialKey) => void;
}

export function Materials({ activeMaterial, onSelectMaterial }: MaterialsProps) {
  const materialList = Object.values(MATERIALS_CONFIG);

  return (
    <section id="materials" className="py-24 bg-[#F4F2ED] border-t border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TACTILE PALETTE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] font-heading">
              Every surface tells a story.
            </h2>
          </div>
          <p className="text-[#77736B] font-light max-w-md text-base sm:text-lg">
            Hover or select any material to instantaneously re-skin the 3D interior room with real-time PBR material characteristics.
          </p>
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
                className={`group relative p-8 rounded-3xl cursor-pointer border transition-all duration-300 overflow-hidden flex flex-col justify-between h-[320px] ${
                  isSelected
                    ? "bg-[#111111] text-[#F4F2ED] border-[#111111] shadow-2xl scale-[1.02]"
                    : "bg-[#EAE7E0]/60 text-[#111111] border-[#111111]/10 hover:border-[#111111]/30 hover:bg-[#EAE7E0]"
                }`}
              >
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
