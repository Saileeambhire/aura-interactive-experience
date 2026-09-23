"use client";

import React from "react";
import { Sofa } from "./Sofa";
import { Table } from "./Table";
import { Lamp } from "./Lamp";
import { Plant } from "./Plant";
import { Artwork } from "./Artwork";
import { MaterialKey } from "@/config/materials";
import { LightMode } from "@/config/lighting";

interface FurnitureProps {
  materialKey: MaterialKey;
  lightMode: LightMode;
  scale?: number;
  opacity?: number;
}

export function Furniture({ materialKey, lightMode, scale = 1, opacity = 1 }: FurnitureProps) {
  return (
    <group name="furniture-group">
      <Sofa materialKey={materialKey} scale={scale} opacity={opacity} />
      <Table materialKey={materialKey} scale={scale} />
      <Lamp lightMode={lightMode} scale={scale} />
      <Plant scale={scale} />
      <Artwork scale={scale} />
    </group>
  );
}
