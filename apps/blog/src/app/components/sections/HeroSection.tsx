"use client";
import Image from "next/image";

const HeroSection: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-start items-center text-[var(--color-text-main)]">
        <Image
                src={"/image1.jpg"}
                alt="hero"
                width={200}
                height={200}
                className="max-w-[200px] max-h-[200px] rounded-md object-cover"
              />
        <p className="text-[30px] text-center font-bold tracking-wide text-[var(--color-primary)]">
          A Collection of Notes, Ideas, and Experiments
        </p>
        <p className="text-base text-center text-[var(--color-text-subtle)] leading-relaxed italic flex">
          Writing about code, learning, side projects, and whatever else seems worth understanding better.
       </p>
  </div>
);

export default HeroSection;
