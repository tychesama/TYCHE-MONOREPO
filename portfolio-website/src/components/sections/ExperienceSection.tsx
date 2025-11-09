"use client";

import React from "react";
import ExperienceCard from "../common/ExperienceCard";

interface Experience {
  company: string;
  logo: string;
  role: string;
  duration: string;
  date: string;
  link: string;
  images: string[];
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <div className="p-2 flex flex-col gap-3 h-[520px] overflow-y-auto scrollbar-hide">
      {experiences.map((exp, idx) => (
        <ExperienceCard key={idx} experience={exp} />
      ))}
    </div>
  );
};

export default ExperienceSection;
