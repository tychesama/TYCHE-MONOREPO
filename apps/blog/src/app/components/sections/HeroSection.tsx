"use client";

import HeroFlipsterCarousel from "./HeroFlipsterCarousel";

interface Slide {
  src: string;
  alt: string;
}

interface HeroSectionProps {
  slides: Slide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => (
  <div className="w-full h-full flex flex-col justify-start items-center text-[var(--color-text-main)]">
    <HeroFlipsterCarousel
      slides={slides}
      width={140}
      height={140}
      visible={2}
      autoplayMs={2500}
    />

    <p className="mt-6 text-[30px] text-center font-bold tracking-wide text-[var(--color-primary)]">
      A Collection of Notes, Ideas, and Experiments
    </p>
    <p className="text-base text-center text-[var(--color-text-subtle)] leading-relaxed italic">
      Writing about code, learning, side projects, and whatever else seems worth understanding better.
    </p>
  </div>
);

export default HeroSection;