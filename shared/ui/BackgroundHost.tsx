"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";

const BackgroundHost: React.FC = () => {
  const { background } = useTheme();
  const [BgComponent, setBgComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (background === "bubbles") {
          const mod = await import("./components/Bubbles");
          if (mounted) setBgComponent(() => mod.default || mod);
        }

        if (background === "squares") {
          const mod = await import("./components/Squares");
          if (mounted) setBgComponent(() => mod.default || mod);
        }

        if (background === "stars") {
          const mod = await import("./components/Stars");
          if (mounted) setBgComponent(() => mod.default || mod);
        }
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
      {BgComponent ? <BgComponent /> : null}
    </div>
  );
};

export default BackgroundHost;
