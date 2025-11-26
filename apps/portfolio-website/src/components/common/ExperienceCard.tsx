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
    <div className="bg-[var(--color-mini-card)] rounded-lg shadow-md p-5 flex flex-col h-[120px] w-full">
      <div className="flex flex items-center justify-center flex-grow gap-2">
        <img
          src={experience.logo}
          alt={experience.company}
          className="w-16 h-16 object-contain"
        />
        <div className="flex flex-col flex-grow">
          <p className="text-lg font-bold text-[var(--color-text)] tracking-wide">
          {experience.company}
        </p>
        {experience.role && (
          <p className="text-sm font-medium text-[var(--color-text-subtle)]">
            {experience.role}
          </p>
        )}
        {experience.duration && (
          <p className="text-sm font-medium text-[var(--color-text-subtle)]">
            {experience.duration}
          </p>
        )}
      </div>
        </div>

        

      {/* {experience.link && (
        <a
          href={experience.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs text-[var(--color-primary)] hover:underline text-center"
        >
          Learn more →
        </a>
      )} */}
    </div>
  );
};


export default ExperienceCard;
