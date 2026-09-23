import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AURA — 3D Interior Design Experience",
    short_name: "AURA",
    description: "An immersive interactive 3D interior experience powered by WebGL, motion, and modern frontend engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F2ED",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
