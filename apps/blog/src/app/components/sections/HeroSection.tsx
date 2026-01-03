"use client";

const HeroSection: React.FC = () => (
  <div className="w-full h-[250px] flex flex-col justify-start items-start text-[var(--color-text-main)]">
    <div className="rounded-lg flex items-start w-full">
      <div>
        <p className="text-[30px] font-bold tracking-wide text-[var(--color-primary)]">
          Joem's Random Topics
        </p>
        <p className="text-base text-[var(--color-text-subtle)] leading-relaxed italic flex">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </div>
);

export default HeroSection;
