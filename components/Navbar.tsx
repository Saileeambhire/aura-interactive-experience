"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection?: string;
}

export function Navbar({ activeSection = "hero" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Materials", href: "#materials" },
    { name: "Lighting", href: "#lighting" },
    { name: "Technology", href: "#technology" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-[#F4F2ED]/85 backdrop-blur-md border-b border-[#111111]/10 shadow-sm"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-[#111111] font-heading"
        >
          <span className="tracking-[0.2em]">AURA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D95D39] group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-[#111111]/70 hover:text-[#111111] transition-colors duration-200 group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D95D39] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#experience"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#111111] border border-[#111111]/20 hover:border-[#111111] hover:bg-[#111111] hover:text-[#F4F2ED] transition-all duration-300 overflow-hidden"
          >
            <span>Explore Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-[#111111] rounded-lg border border-[#111111]/10 focus:outline-none focus:ring-2 focus:ring-[#D95D39]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F4F2ED] border-b border-[#111111]/10 px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#111111]/80 hover:text-[#D95D39] py-2 border-b border-[#111111]/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wider uppercase bg-[#111111] text-[#F4F2ED]"
              >
                Explore Studio →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
