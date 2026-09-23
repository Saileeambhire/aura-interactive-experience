export interface ScrollStepConfig {
  step: number;
  title: string;
  subtitle: string;
  heading: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  fov: number;
  furnitureScale: number;
  furnitureOpacity: number;
  defaultMaterial: "oak" | "walnut" | "marble" | "concrete" | "linen" | "leather";
  defaultLighting: "day" | "sunset" | "night";
}

export const SCROLL_STEPS: ScrollStepConfig[] = [
  {
    step: 1,
    title: "STEP 01 — SHELL",
    subtitle: "Architectural Canvas",
    heading: "Start with a blank space.",
    description: "Every sanctuary begins as an empty architectural horizon. Raw walls, pristine flooring, and pure unfiltered natural light.",
    cameraPosition: [6, 4.5, 7],
    cameraTarget: [0, 1.2, 0],
    fov: 45,
    furnitureScale: 0,
    furnitureOpacity: 0,
    defaultMaterial: "concrete",
    defaultLighting: "day",
  },
  {
    step: 2,
    title: "STEP 02 — FORM",
    subtitle: "Proportion & Comfort",
    heading: "Shape the way you live.",
    description: "Carefully curated furniture brings human scale, proportion, and quiet warmth to geometric structural volumes.",
    cameraPosition: [4.5, 3.2, 5.5],
    cameraTarget: [0, 0.9, 0],
    fov: 42,
    furnitureScale: 1,
    furnitureOpacity: 1,
    defaultMaterial: "linen",
    defaultLighting: "day",
  },
  {
    step: 3,
    title: "STEP 03 — TACTILITY",
    subtitle: "Material Identity",
    heading: "Every material changes the feeling.",
    description: "From honest white oak and honed Carrara marble to rich cognac leather, tactile surfaces evoke emotion and physical presence.",
    cameraPosition: [2.2, 2.0, 3.2],
    cameraTarget: [-0.4, 0.7, 0.2],
    fov: 38,
    furnitureScale: 1,
    furnitureOpacity: 1,
    defaultMaterial: "oak",
    defaultLighting: "sunset",
  },
  {
    step: 4,
    title: "STEP 04 — ATMOSPHERE",
    subtitle: "Volumetric Light",
    heading: "Light changes everything.",
    description: "Witness space transform through golden hour sunbeams, moody twilight shadows, and focused warm interior lamp glow.",
    cameraPosition: [-4.2, 3.8, 5.2],
    cameraTarget: [0.3, 1.0, -0.2],
    fov: 40,
    furnitureScale: 1,
    furnitureOpacity: 1,
    defaultMaterial: "walnut",
    defaultLighting: "sunset",
  },
  {
    step: 5,
    title: "STEP 05 — REVEAL",
    subtitle: "AURA Living",
    heading: "Make it yours.",
    description: "A harmonious synthesis of architecture, material, light, and motion. Complete spatial mastery in the palm of your hand.",
    cameraPosition: [5.2, 3.6, 6.2],
    cameraTarget: [0, 1.0, 0],
    fov: 44,
    furnitureScale: 1,
    furnitureOpacity: 1,
    defaultMaterial: "marble",
    defaultLighting: "day",
  },
];
