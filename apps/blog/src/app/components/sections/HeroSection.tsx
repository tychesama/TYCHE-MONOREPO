"use client";

import HeroFlipsterCarousel from "./HeroFlipsterCarousel";

interface Slide { src: string; alt: string }
interface HeroSectionProps { slides: Slide[] }

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => (
  <div
    className="relative w-full h-full flex flex-col justify-start items-center overflow-hidden"
    style={{ color: "var(--color-text-main)" }}
  >
    {/* Radial glow */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        width: 320,
        height: 200,
        background: "radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.045) 0%, transparent 70%)",
      }}
    />

    <HeroFlipsterCarousel
      slides={slides}
      width={140}
      height={140}
      visible={2}
      autoplayMs={2500}
    />

    {/* Text block */}
    <div className="relative flex flex-col items-center gap-2 mt-4 px-4 lg:px-6 text-center">
      {/* Decorative line + label */}
      <div className="flex items-center gap-2 mb-1">
        <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span
          className="text-[9px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--color-text-subtle)" }}
        >
          Blog
        </span>
        <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>

      <p
        className="text-xl lg:text-[26px] font-bold tracking-wide leading-tight"
        style={{ color: "var(--color-text-main)" }}
      >
        A Collection of{" "}
        <span style={{ color: "var(--color-primary, #fff)", fontStyle: "italic" }}>
          Notes,
        </span>{" "}
        Ideas &amp; Experiments
      </p>

      <p
        className="text-xs lg:text-sm leading-relaxed max-w-[320px] lg:max-w-[400px]"
        style={{ color: "var(--color-text-subtle)" }}
      >
        Writing about code, learning, side projects, and whatever else seems
        worth understanding better.
      </p>
    </div>
  </div>
);

export default HeroSection;