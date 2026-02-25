"use client";

import HeroFlipsterCarousel from "../HeroFlipsterCarousel";

const HeroSection: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-start items-center text-[var(--color-text-main)]">
    <HeroFlipsterCarousel
      slides={[
        { src: "/image1.jpg", alt: "slide 1" },
        { src: "/image2.jpg", alt: "slide 2" },
        { src: "/image3.gif", alt: "slide 3" },
        { src: "/image4.gif", alt: "slide 4" },
        { src: "/image5.jpg", alt: "slide 5" },
      ]}
      width={140}
      height={140}
      visible={2}
      autoplayMs={2500} // set e.g. 2500 if you want autoplay
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