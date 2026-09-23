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
    sublabel: "Bright & Natural",
    description: "Crisp midday sunlight streaming through expansive architectural glass windows.",
    sunPosition: [8, 12, 6],
    sunColor: "#FFFDF7",
    sunIntensity: 2.2,
    ambientColor: "#EAE7DF",
    ambientIntensity: 0.8,
    fillColor: "#B5D5E5",
    fillIntensity: 0.4,
    lampIntensity: 0.0,
    lampColor: "#FFC87C",
    windowLightIntensity: 3.5,
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
    sublabel: "Warm & Golden",
    description: "Low-angle golden hour rays casting dramatic long shadows and radiant warmth.",
    sunPosition: [12, 4, 3],
    sunColor: "#FF9E4A",
    sunIntensity: 2.8,
    ambientColor: "#8C4A28",
    ambientIntensity: 0.6,
    fillColor: "#FF6F3C",
    fillIntensity: 0.5,
    lampIntensity: 0.5,
    lampColor: "#FFB067",
    windowLightIntensity: 4.5,
    windowLightColor: "#FF8C42",
    fogColor: "#2D1D18",
    fogNear: 12,
    fogFar: 40,
    bgColor: "#231714",
    textColor: "#F4F2ED",
  },
  night: {
    id: "night",
    label: "NIGHT",
    sublabel: "Dark & Atmospheric",
    description: "Quiet twilight ambiance with soft incandescent lamp illumination and moonlight accents.",
    sunPosition: [-6, 8, -4],
    sunColor: "#4B6B94",
    sunIntensity: 0.4,
    ambientColor: "#0D111A",
    ambientIntensity: 0.3,
    fillColor: "#2C3E50",
    fillIntensity: 0.2,
    lampIntensity: 3.2,
    lampColor: "#FFAE54",
    windowLightIntensity: 1.2,
    windowLightColor: "#38588A",
    fogColor: "#0A0D12",
    fogNear: 10,
    fogFar: 35,
    bgColor: "#0C0E14",
    textColor: "#F4F2ED",
  },
};
