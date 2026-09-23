export type MaterialKey = "oak" | "walnut" | "marble" | "concrete" | "linen" | "leather";

export interface MaterialConfig {
  id: MaterialKey;
  name: string;
  tagline: string;
  category: string;
  color: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  description: string;
  hex: string;
  accent: string;
  cardBg: string;
}

export const MATERIALS_CONFIG: Record<MaterialKey, MaterialConfig> = {
  oak: {
    id: "oak",
    name: "Oak",
    tagline: "Warm / Natural",
    category: "Wood Finish",
    color: "#D2B48C",
    roughness: 0.65,
    metalness: 0.05,
    clearcoat: 0.1,
    description: "Sustainably harvested Scandinavian white oak with organic grain and soft satin finish.",
    hex: "#C6A678",
    accent: "#8C6A3C",
    cardBg: "from-[#F5EFE6] to-[#E8DCC9]",
  },
  walnut: {
    id: "walnut",
    name: "Walnut",
    tagline: "Deep / Elegant",
    category: "Wood Finish",
    color: "#5C4033",
    roughness: 0.45,
    metalness: 0.1,
    clearcoat: 0.3,
    description: "American black walnut featuring rich espresso tones, deep contrast, and polished luster.",
    hex: "#4E3629",
    accent: "#2D1E16",
    cardBg: "from-[#3D2B20] to-[#251A13]",
  },
  marble: {
    id: "marble",
    name: "Marble",
    tagline: "Clean / Refined",
    category: "Stone",
    color: "#F0F0EE",
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    description: "Honed Carrara marble with soft silver veining, cool light reflection, and silky tactile touch.",
    hex: "#E5E5E0",
    accent: "#999990",
    cardBg: "from-[#F8F8F6] to-[#E3E3DE]",
  },
  concrete: {
    id: "concrete",
    name: "Concrete",
    tagline: "Raw / Modern",
    category: "Architectural",
    color: "#888885",
    roughness: 0.85,
    metalness: 0.02,
    clearcoat: 0.0,
    description: "Micro-cement smooth poured concrete with brutalist character and tactile matte feel.",
    hex: "#7D7D7A",
    accent: "#4A4A48",
    cardBg: "from-[#90908C] to-[#6E6E6A]",
  },
  linen: {
    id: "linen",
    name: "Linen",
    tagline: "Soft / Tactile",
    category: "Upholstery",
    color: "#E2D7C5",
    roughness: 0.9,
    metalness: 0.0,
    description: "Heavyweight Belgian flax linen woven with subtle texture variations and organic warmth.",
    hex: "#D6C6B0",
    accent: "#94846F",
    cardBg: "from-[#F1E9DC] to-[#DECFA6]",
  },
  leather: {
    id: "leather",
    name: "Leather",
    tagline: "Cognac / Rich",
    category: "Upholstery",
    color: "#9E5630",
    roughness: 0.35,
    metalness: 0.15,
    clearcoat: 0.4,
    description: "Full-grain Italian cognac leather that develops an exquisite patina over time.",
    hex: "#A35C35",
    accent: "#592C15",
    cardBg: "from-[#A66038] to-[#6E3B1F]",
  },
};
