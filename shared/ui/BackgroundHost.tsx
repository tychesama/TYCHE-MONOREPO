"use client";

import React, { useEffect, useState } from "react";
// import { useTheme } from "../hooks/changeTheme";
// shared Bubbles uses DOM APIs — load it only on client to keep compatibility with both Next & Vite
// import dynamic from "next/dynamic";
// const Bubbles = dynamic(() => import("./components/Bubbles"), { ssr: false });

const BackgroundHost: React.FC = () => {
  const [BubblesComponent, setBubblesComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("./components/Bubbles");
        if (mounted) setBubblesComponent(() => (mod.default || mod));
      } catch (e) {
        // swallow — if dynamic import fails in some env, just don't render bubbles
        console.error("Failed to load Bubbles:", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <div className="bg-layer">
        {BubblesComponent ? <BubblesComponent /> : null}
      </div>
    </>
  );
};

export default BackgroundHost;