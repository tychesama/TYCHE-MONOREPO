"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";

const BG_COMPONENTS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  bubbles: () => import("./components/Bubbles"),
  squares: () => import("./components/Squares"),
  stars:   () => import("./components/Stars"),
};

const BackgroundHost: React.FC = () => {
  const { background } = useTheme();
  const [BgComponent, setBgComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = BG_COMPONENTS[background];

    setBgComponent(null);

    if (!loader) return;

    (async () => {
      try {
        const mod = await loader();
        if (mounted) setBgComponent(() => mod.default ?? null);
      } catch (e) {
        console.error("Failed to load background:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [background]);

  return (
    <div className="bg-layer">
      {BgComponent && <BgComponent />}
    </div>
  );
};

export default BackgroundHost;