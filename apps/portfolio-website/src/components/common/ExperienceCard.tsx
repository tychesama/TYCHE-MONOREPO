"use client";
import React from "react";

interface Experience {
  company: string;
  logo: string;
  role?: string;
  duration?: string;
  date?: string;
  link?: string;
  images?: string[];
  description?: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="bg-[var(--color-mini-card)] rounded-lg shadow-md p-4 flex items-center gap-3 sm:w-[246px] h-[100px] sm:h-[120px] transition transform hover:scale-[1.03]">
      <img
        src={experience.logo}
        alt={experience.company}
        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-base sm:text-lg font-bold text-[var(--color-text-main)] tracking-wide truncate">
          {experience.company}
        </p>
        {experience.role && (
          <p className="text-xs sm:text-sm font-medium text-[var(--color-text-subtle)] truncate">
            {experience.role}
          </p>
        )}
        {experience.duration && (
          <p className="text-xs font-medium text-[var(--color-text-subtle)] truncate">
            {experience.duration}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;