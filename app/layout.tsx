import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA — Design Your Space Before You Build It",
  description:
    "An immersive interactive 3D interior experience powered by WebGL, motion and modern frontend engineering.",
  keywords: [
    "AURA",
    "3D Interior Design",
    "WebGL",
    "Three.js",
    "React Three Fiber",
    "GSAP ScrollTrigger",
    "Next.js 16",
    "Luxury Architecture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#F4F2ED] text-[#111111] antialiased selection:bg-[#D95D39] selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
