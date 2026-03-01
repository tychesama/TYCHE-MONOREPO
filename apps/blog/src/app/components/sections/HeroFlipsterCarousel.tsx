"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = { src: string; alt: string };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Wrap offset into shortest direction in a circular list
function circularOffset(i: number, active: number, len: number) {
  let d = i - active;
  const half = len / 2;
  if (d > half) d -= len;
  if (d < -half) d += len;
  return d;
}

export default function HeroFlipsterCarousel({
  slides,
  width = 320,
  height = 320,
  visible = 2,        // how many on each side to render
  autoplayMs = 0,     // set > 0 to auto-advance
}: {
  slides: Slide[];
  width?: number;
  height?: number;
  visible?: number;
  autoplayMs?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoplayMs || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, slides.length]);

  const len = slides.length;

  const rendered = useMemo(() => {
    return slides.map((s, i) => {
      const off = circularOffset(i, active, len);
      const abs = Math.abs(off);

      // Only keep a window around the active slide
      if (abs > visible) return null;

      // Tweak these numbers to match your preferred “Flipster” feel
      const x = off * (width * 0.65);      // horizontal spread
      const rotY = off * -35;              // angle
      const z = 220 - abs * 120;           // depth
      const scale = 1 - abs * 0.12;
      const opacity = 1 - abs * 0.25;

      // Ensure correct stacking: active on top, then nearer ones
      const zIndex = 100 - abs;

      return (
        <button
          key={s.src + i}
          type="button"
          onClick={() => setActive(i)}
          className="absolute left-1/2 top-1/2 rounded-lg focus:outline-none"
          style={{
            width,
            height,
            transform: `
              translate(-50%, -50%)
              translateX(${x}px)
              translateZ(${z}px)
              rotateY(${rotY}deg)
              scale(${scale})
            `,
            transformStyle: "preserve-3d",
            opacity,
            zIndex,
            transition:
              "transform 650ms cubic-bezier(.2,.8,.2,1), opacity 650ms cubic-bezier(.2,.8,.2,1)",
          }}
          aria-label={`Go to slide ${i + 1}`}
        >
          {/* circular ground shadow */}
          <div
            className="absolute left-1/2 -bottom-8 -translate-x-1/2 pointer-events-none"
            style={{
              width: width * 0.65,
              height: width * 0.22,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 45%, transparent 75%)",
              filter: "blur(10px)",
              opacity: i === active ? 0.7 : 0.35,
              transition: "opacity 650ms cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {/* image card */}
          <div className="h-full w-full overflow-hidden rounded-lg shadow-xl ring-1 ring-black/10 bg-black/5">
            <Image
              src={s.src}
              alt={s.alt}
              width={width}
              height={height}
              className="h-full w-full object-cover"
              priority={i === active}
            />
          </div>
        </button>
      );
    });
  }, [slides, active, len, visible, width, height]);

  if (slides.length === 0) return null;

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: width + width * 1.6, // container wide enough for side panels
          height: height + 40,
          perspective: "1200px",
        }}
      >
        {/* stage */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {rendered}
        </div>
        {/* ARROWS FOR NAV
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + len) % len)}
              className="absolute -left-12 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-black/10 hover:bg-black/15"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % len)}
              className="absolute -right-12 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-black/10 hover:bg-black/15"
              aria-label="Next"
            >
              ›
            </button>
          </>
        )} */}
      </div>
    </div>
  );
}