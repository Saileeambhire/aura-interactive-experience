"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function Performance() {
  const techniques = [
    {
      title: "Lazy Loaded 3D",
      desc: "Deferred WebGL initialization until viewport entry prevents main-thread blocking on first contentful paint.",
    },
    {
      title: "Dynamic Imports",
      desc: "Next.js dynamic client component boundaries ensure Three.js canvas bundles load asynchronously without SSR overhead.",
    },
    {
      title: "Optimized Assets",
      desc: "Procedural geometry buffers and lightweight PBR shaders eliminate multi-megabyte GLTF model downloads.",
    },
    {
      title: "Responsive Rendering",
      desc: "Adaptive device pixel ratio limits and camera FOV adjustments prevent GPU strain on high-density displays.",
    },
    {
      title: "Reduced Motion",
      desc: "Native media query listener automatically toggles off heavy smooth-scroll loops for motion-sensitive users.",
    },
  ];

  return (
    <section className="py-24 bg-[#111111] text-[#F4F2ED] border-t border-[#F4F2ED]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENGINEERING BENCHMARK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F2ED] font-heading max-w-2xl">
            Beautiful doesn&apos;t have to mean heavy.
          </h2>

          <p className="text-base sm:text-lg text-[#77736B] font-light max-w-xl">
            Strict optimization practices implemented directly into the build system to ensure instant loading and silky 60 FPS interactions.
          </p>
        </div>

        {/* Technique Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#F4F2ED]/10 hover:border-[#D95D39]/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#D95D39] shrink-0" />
                <h3 className="text-lg font-bold font-heading text-[#F4F2ED]">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-[#77736B] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
