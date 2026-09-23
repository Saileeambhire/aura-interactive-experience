"use client";

import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

export function FinalCTA() {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#D95D39", "#F4F2ED", "#3A261A"],
      });
    } catch {
      // fallback safe ignore if canvas confetti unavailable
    }
  };

  return (
    <section className="relative py-32 bg-[#F4F2ED] border-t border-[#111111]/10 overflow-hidden text-center">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#111111]/5 pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#111111]/5 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-xs font-semibold tracking-wider text-[#77736B] uppercase">
          <Sparkles className="w-4 h-4 text-[#D95D39]" />
          <span>START YOUR EXPERIENCE</span>
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#111111] leading-[1.05] font-heading">
          Your space. <br />
          <span className="text-[#D95D39]">Your rules.</span>
        </h2>

        <p className="text-lg sm:text-2xl text-[#77736B] font-light max-w-2xl leading-relaxed">
          Experience interior design in a different dimension.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerConfetti}
          className="mt-4 px-10 py-5 rounded-full bg-[#111111] text-[#F4F2ED] font-bold text-base tracking-widest uppercase shadow-xl hover:bg-[#D95D39] transition-all duration-300 flex items-center gap-3"
        >
          <span>Explore AURA →</span>
        </motion.button>
      </div>
    </section>
  );
}
