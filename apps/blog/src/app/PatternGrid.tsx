"use client";
import React, { useLayoutEffect, useRef } from "react";

export default function PatternGrid({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const update = () => {
      const cards = grid.querySelectorAll<HTMLElement>("[data-pattern-card]");

      const docEl = document.documentElement;
      const sheetW = Math.max(docEl.scrollWidth, docEl.clientWidth);
      const sheetH = Math.max(docEl.scrollHeight, docEl.clientHeight);

      grid.style.setProperty("--sheet-w", `${sheetW}px`);
      grid.style.setProperty("--sheet-h", `${sheetH}px`);

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--bg-x", `-${r.left + window.scrollX}px`);
        card.style.setProperty("--bg-y", `-${r.top + window.scrollY}px`);
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="relative z-[2] max-w-7xl mx-auto px-4 py-8 gap-6 grid grid-cols-1 auto-rows-auto md:grid-cols-4 md:auto-rows-[180px]"
    >
      {children}
    </div>
  );
}