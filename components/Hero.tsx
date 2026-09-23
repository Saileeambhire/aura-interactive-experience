"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, Box, Compass, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";

// Dynamically import 3D Room Scene
const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#EAE7E0]/40 rounded-2xl animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#111111]/20 border-t-[#D95D39] rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#77736B]">Loading 3D Canvas...</span>
      </div>
    </div>
  ),
});

// Dynamically import 3D Armchair Viewer with OrbitControls & Zoom
const ArmchairViewer = dynamic(() => import("./three/ArmchairViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#FAF8F5] rounded-2xl animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#111111]/20 border-t-[#D95D39] rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#77736B]">Loading 3D Armchair Model...</span>
      </div>
    </div>
  ),
});

interface HeroProps {
  materialKey: MaterialKey;
  lightMode: LightMode;
  onExploreClick?: () => void;
}

export function Hero({ materialKey, lightMode, onExploreClick }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"room" | "armchair" | "photo">("armchair");

  return (
    <section className="relative min-h-screen w-full pt-28 pb-16 flex items-center bg-[#F4F2ED] overflow-hidden">
      {/* Background Architectural Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Editorial Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start gap-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-xs font-semibold tracking-wider text-[#77736B] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
            <span>Interactive 3D Interior Experience</span>
          </div>

          {/* Main Sora Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] font-heading">
            Design your space. <br />
            <span className="text-[#D95D39]">Before you build it.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#77736B] font-light max-w-xl leading-relaxed">
            An interactive 3D interior experience where every material, light and detail is yours to explore.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#experience"
              onClick={onExploreClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-[#F4F2ED] font-semibold text-sm tracking-wider uppercase shadow-lg shadow-[#111111]/10 hover:bg-[#D95D39] transition-all duration-300"
            >
              <span>Explore Experience</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex items-center gap-3 pt-6 text-xs uppercase tracking-widest text-[#77736B]">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="p-1.5 rounded-full border border-[#111111]/20"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#D95D39]" />
            </motion.div>
            <span>Scroll to explore</span>
          </div>
        </motion.div>

        {/* Right 3D & Interactive Model Viewport Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 h-[480px] sm:h-[580px] w-full relative rounded-3xl border border-[#111111]/10 bg-gradient-to-b from-[#F4F2ED] to-[#EAE6DD] shadow-2xl overflow-hidden group"
        >
          {/* View Mode Toggle Controls */}
          <div className="absolute top-4 right-4 z-40 inline-flex p-1 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/10 text-white gap-1 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveTab("armchair")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "armchair" ? "bg-[#D95D39] text-white shadow-md font-bold" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>3D Armchair (Orbit/Zoom)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("room")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "room" ? "bg-[#D95D39] text-white shadow-md font-bold" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Box className="w-3 h-3" />
              <span>3D Room</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("photo")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "photo" ? "bg-[#D95D39] text-white shadow-md font-bold" : "opacity-75 hover:opacity-100"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Real Photo</span>
            </button>
          </div>

          {/* Real Photography Reference Tag */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#111111]/10 text-xs shadow-lg pointer-events-none">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-black/10">
              <Image
                src="/images/furniture/hero-armchair.jpg"
                alt="Contemporary Green Upholstered Armchair Photography"
                fill
                priority
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#D95D39] uppercase tracking-wider font-bold">FurniMesh 3D Model</span>
              <span className="text-xs font-bold text-[#111111]">Green Upholstered Armchair</span>
            </div>
          </div>

          {/* Viewport Content */}
          {activeTab === "armchair" ? (
            <ArmchairViewer />
          ) : activeTab === "photo" ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-[#FAF8F5]">
              <Image
                src="/images/furniture/hero-armchair.jpg"
                alt="Contemporary Green Upholstered Armchair Photography"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4"
              />
              <div className="absolute top-4 left-4 z-20 max-w-xs text-left">
                <span className="px-2.5 py-1 rounded-md bg-[#111111] text-white text-[10px] font-mono tracking-wider uppercase">
                  FurniMesh Reference
                </span>
                <h3 className="text-lg font-bold font-heading text-[#111111] mt-2">
                  Contemporary Green Armchair
                </h3>
              </div>
            </div>
          ) : (
            <Scene
              currentStep={5}
              materialKey={materialKey}
              lightMode={lightMode}
              furnitureScale={1}
              furnitureOpacity={1}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
