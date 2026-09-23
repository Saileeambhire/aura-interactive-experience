import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#F4F2ED",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = "https://aura.design";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AURA — Design Your Space Before You Build It",
    template: "%s | AURA Interactive 3D Experience",
  },
  description:
    "An immersive interactive 3D interior experience where every material, light, and architectural detail is yours to explore. Powered by WebGL, Three.js, GSAP, and Framer Motion.",
  keywords: [
    "AURA",
    "3D Interior Design",
    "Interactive WebGL",
    "Three.js Architecture",
    "React Three Fiber",
    "GSAP ScrollTrigger Storytelling",
    "Next.js 16 App Router",
    "Modern Architectural Portfolio",
    "Luxury Furniture Visualization",
    "Real-time Materials PBR",
    "Volumetric Lighting Experience",
  ],
  authors: [{ name: "AURA Design Studio", url: siteUrl }],
  creator: "AURA Engineering",
  publisher: "AURA Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "AURA — Design Your Space Before You Build It",
    description:
      "Explore spaces in real-time 3D before construction. Customize PBR materials, volumetric daylighting, and spatial motion.",
    url: siteUrl,
    siteName: "AURA Interactive Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AURA 3D Interior Design Experience Viewport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA — Design Your Space Before You Build It",
    description:
      "Interactive 3D interior design experience powered by WebGL, Three.js, GSAP, and Next.js 16.",
    creator: "@aura_design",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      "name": "AURA 3D Interior Design Experience",
      "url": siteUrl,
      "description": "An interactive 3D interior design WebGL application enabling real-time material customization, daylight simulation, and scroll-driven architectural storytelling.",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires WebGL support",
      "author": {
        "@type": "Organization",
        "name": "AURA Studio",
        "url": siteUrl,
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "AURA Studio",
      "url": siteUrl,
      "logo": `${siteUrl}/icon.svg`,
      "sameAs": [
        "https://instagram.com/aura_design",
        "https://dribbble.com/aura_design",
        "https://linkedin.com/company/aura-design",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F4F2ED] text-[#111111] antialiased selection:bg-[#D95D39] selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
