"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Film, Zap, Eye, Sparkles } from "lucide-react";

export function Technology() {
  const cards = [
    {
      num: "01",
      title: "WebGL Engine",
      subtitle: "Three.js & R3F",
      description: "Real-time 3D experiences powered by Three.js and React Three Fiber with custom PBR shading.",
      icon: <Cpu className="w-6 h-6 text-[#D95D39]" />,
      image: "/images/furniture/sofa.jpg",
    },
    {
      num: "02",
      title: "Motion Orchestration",
      subtitle: "GSAP & Framer Motion",
      description: "Scroll-driven storytelling with GSAP ScrollTrigger pinning and Framer Motion micro-interactions.",
      icon: <Film className="w-6 h-6 text-[#D95D39]" />,
      image: "/images/furniture/coffee-table.jpg",
    },
    {
      num: "03",
      title: "Performance First",
      subtitle: "Dynamic Assets & Lerping",
      description: "Lazy-loaded assets and dynamic WebGL viewports to maintain consistent 60 FPS performance.",
      icon: <Zap className="w-6 h-6 text-[#D95D39]" />,
      image: "/images/furniture/chair.jpg",
    },
    {
      num: "04",
      title: "Accessibility",
      subtitle: "Reduced-Motion Native",
      description: "Reduced-motion support, keyboard focus targets, and responsive mobile-first interaction patterns.",
      icon: <Eye className="w-6 h-6 text-[#D95D39]" />,
      image: "/images/furniture/plant.jpg",
    },
  ];

  return (
    <section id="technology" className="py-24 bg-[#F4F2ED] border-t border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D95D39] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] font-heading">
            Built for interaction.
          </h2>

          <p className="text-base sm:text-lg text-[#77736B] font-light max-w-xl">
            A harmonious integration of cutting-edge web technologies engineered for visual elegance, fluid motion, and instant responsiveness.
          </p>
        </div>

        {/* 4 Cards Grid with Real Furniture Photography Background Overlays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl bg-[#EAE7E0]/60 border border-[#111111]/10 hover:border-[#111111]/30 hover:bg-[#EAE7E0] transition-all duration-300 flex flex-col justify-between h-[360px] overflow-hidden"
            >
              {/* Real Furniture Photograph Background Accent */}
              <Image
                src={card.image}
                alt={`${card.title} Real Furniture Photo`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              />

              <div className="flex items-center justify-between z-10">
                <span className="text-3xl font-mono font-light text-[#77736B]/60 group-hover:text-[#D95D39] transition-colors">
                  {card.num}
                </span>
                <div className="p-3 rounded-2xl bg-[#F4F2ED] border border-[#111111]/5 shadow-sm">
                  {card.icon}
                </div>
              </div>

              <div className="z-10">
                <div className="text-xs font-mono text-[#D95D39] uppercase tracking-wider mb-1">
                  {card.subtitle}
                </div>
                <h3 className="text-2xl font-bold text-[#111111] font-heading">
                  {card.title}
                </h3>
                <p className="text-sm text-[#77736B] font-light leading-relaxed mt-3">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between text-xs font-medium text-[#111111]/70 z-10">
                <span>View Specs</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
