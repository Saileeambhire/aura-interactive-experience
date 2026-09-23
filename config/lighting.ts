export type LightMode = "day" | "sunset" | "night";

export interface LightingConfig {
  id: LightMode;
  label: string;
  sublabel: string;
  description: string;
  sunPosition: [number, number, number];
  sunColor: string;
  sunIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  fillColor: string;
  fillIntensity: number;
  lampIntensity: number;
  lampColor: string;
  windowLightIntensity: number;
  windowLightColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  bgColor: string;
  textColor: string;
}

export const LIGHTING_CONFIG: Record<LightMode, LightingConfig> = {
  day: {
    id: "day",
    label: "DAY",
    sublabel: "Bright & Natural Sunlight",
    description: "Crisp, radiant midday sunlight streaming through expansive architectural glass windows with clean sky reflections.",
    sunPosition: [8, 12, 6],
    sunColor: "#FFFFFF",
    sunIntensity: 3.2,
    ambientColor: "#F4F2ED",
    ambientIntensity: 0.9,
    fillColor: "#CBD5E1",
    fillIntensity: 0.5,
    lampIntensity: 0.0,
    lampColor: "#FFC87C",
    windowLightIntensity: 4.0,
    windowLightColor: "#E0F2FE",
    fogColor: "#F4F2ED",
    fogNear: 15,
    fogFar: 45,
    bgColor: "#F4F2ED",
    textColor: "#111111",
  },
  sunset: {
    id: "sunset",
    label: "SUNSET",
    sublabel: "Warm Golden Hour Glow",
    description: "Low-angle golden hour solar rays casting dramatic warm shadows and radiant terracotta reflections.",
    sunPosition: [14, 3, 2],
    sunColor: "#FF7722",
    sunIntensity: 4.0,
    ambientColor: "#7C2D12",
    ambientIntensity: 0.6,
    fillColor: "#EA580C",
    fillIntensity: 0.7,
    lampIntensity: 1.2,
    lampColor: "#FFAA44",
    windowLightIntensity: 5.5,
    windowLightColor: "#F97316",
    fogColor: "#29150F",
    fogNear: 12,
    fogFar: 40,
    bgColor: "#1F0E09",
    textColor: "#F4F2ED",
  },
  night: {
    id: "night",
    label: "NIGHT",
    sublabel: "Dark Atmospheric Ambiance",
    description: "Quiet twilight ambiance with glowing interior floor lamp illumination and cool indigo window moonlight.",
    sunPosition: [-8, 6, -6],
    sunColor: "#1E293B",
    sunIntensity: 0.1,
    ambientColor: "#020617",
    ambientIntensity: 0.25,
    fillColor: "#1E1B4B",
    fillIntensity: 0.15,
    lampIntensity: 6.5,
    lampColor: "#FF9922",
    windowLightIntensity: 2.0,
    windowLightColor: "#38588A",
    fogColor: "#050B14",
    fogNear: 10,
    fogFar: 35,
    bgColor: "#070C16",
    textColor: "#F4F2ED",
  },
};
