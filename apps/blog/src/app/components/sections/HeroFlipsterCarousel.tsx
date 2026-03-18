"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = { src: string; alt: string };

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
  visible = 2,
  autoplayMs = 0,
}: {
  slides: Slide[];
  width?: number;
  height?: number;
  visible?: number;
  autoplayMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
      if (abs > visible) return null;

      const x = off * (width * 0.65);
      const rotY = off * -35;
      const z = 220 - abs * 120;
      const scale = 1 - abs * 0.12;
      const opacity = 1 - abs * 0.25;
      const zIndex = 100 - abs;
      const isActive = i === active;

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
            transition: "transform 650ms cubic-bezier(.2,.8,.2,1), opacity 650ms cubic-bezier(.2,.8,.2,1)",
          }}
          aria-label={`Go to slide ${i + 1}`}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              bottom: isActive ? -18 : -12,
              width: isActive ? width * 0.75 : width * 0.55,
              height: isActive ? width * 0.28 : width * 0.18,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 50%, transparent 75%)",
              filter: `blur(${isActive ? 14 : 8}px)`,
              opacity: isActive ? 0.85 : 0.4,
              transition: "all 650ms cubic-bezier(.2,.8,.2,1)",
            }}
          />
          <div
            className="h-full w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-black/5"
            style={{
              boxShadow: isActive
                ? "0 24px 48px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)"
                : "0 8px 20px rgba(0,0,0,0.25)",
              transition: "box-shadow 650ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
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

  // Mobile: flat single image with dot indicators
  if (isMobile) {
    const mobileSize = Math.min(width, 200);
    const slide = slides[active];
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="overflow-hidden rounded-xl ring-1 ring-black/10"
          style={{
            width: mobileSize,
            height: mobileSize,
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            width={mobileSize}
            height={mobileSize}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 16 : 6,
                  height: 6,
                  background: i === active
                    ? "var(--color-text-main)"
                    : "rgba(255,255,255,0.25)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const containerW = width + width * 1.6;
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative"
        style={{ width: containerW, height: height + 40, perspective: "1200px" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {rendered}
        </div>
      </div>
    </div>
  );
}