"use client";

import React from "react";

export function Footer() {
  const links = [
    { name: "Experience", href: "#experience" },
    { name: "Materials", href: "#materials" },
    { name: "Lighting", href: "#lighting" },
    { name: "Technology", href: "#technology" },
  ];

  const socials = [
    { name: "Instagram", href: "#" },
    { name: "Dribbble", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-[#111111] text-[#F4F2ED] py-16 border-t border-[#F4F2ED]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#F4F2ED]/10">
          {/* Left Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="text-3xl font-bold tracking-widest font-heading">
              AURA
            </a>
            <p className="text-sm text-[#77736B] font-light max-w-sm">
              Interactive interior experiences blending real-time WebGL, modern architecture, and editorial spatial storytelling.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-[#D95D39] uppercase mb-2">
              Sitemap
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#77736B]">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#F4F2ED] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-[#D95D39] uppercase mb-2">
              Connect
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#77736B]">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className="hover:text-[#F4F2ED] transition-colors">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77736B] gap-4">
          <span>© 2026 AURA. All rights reserved.</span>
          <span>Crafted with Next.js 16, Three.js, GSAP & Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
