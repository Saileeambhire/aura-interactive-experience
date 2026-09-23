"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollExperience } from "@/components/ScrollExperience";
import { Materials } from "@/components/Materials";
import { Lighting } from "@/components/Lighting";
import { Technology } from "@/components/Technology";
import { Performance } from "@/components/Performance";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";

export default function Home() {
  const [materialKey, setMaterialKey] = useState<MaterialKey>("marble");
  const [lightMode, setLightMode] = useState<LightMode>("day");

  const handleStepChange = (_step: number, material?: MaterialKey, light?: LightMode) => {
    if (material) setMaterialKey(material);
    if (light) setLightMode(light);
  };

  return (
    <main className="relative min-h-screen bg-[#F4F2ED] text-[#111111] overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero materialKey={materialKey} lightMode={lightMode} />

      {/* 3. Scroll Storytelling Section ("The Room Evolves") */}
      <ScrollExperience onStepChange={handleStepChange} />

      {/* 4. Materials Section */}
      <Materials
        activeMaterial={materialKey}
        onSelectMaterial={(mat) => setMaterialKey(mat)}
      />

      {/* 5. Lighting Section */}
      <Lighting
        activeLightMode={lightMode}
        onSelectLightMode={(mode) => setLightMode(mode)}
      />

      {/* 6. Technology Section */}
      <Technology />

      {/* 7. Performance Section */}
      <Performance />

      {/* 8. Final CTA Section */}
      <FinalCTA />

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
