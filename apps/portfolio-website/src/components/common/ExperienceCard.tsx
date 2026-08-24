"use client";

import React from "react";

interface Experience {
  company: string;
  logo: string;
  logos?: string[];
  role?: string;
  duration?: string;
  date?: string;
  endDate?: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const formatMonthYear = (value?: string) => {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const logos = experience.logos?.length ? experience.logos : [experience.logo];
  const start = formatMonthYear(experience.date);
  const end = formatMonthYear(experience.endDate);
  const dateRange = start && end ? `${start} – ${end}` : start;

  return (
    <article className="flex h-[232px] w-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[var(--color-mini-card)] shadow-md transition-transform hover:scale-[1.015]">
      <div className="relative flex min-h-[104px] items-center justify-center px-4 py-2">
        {logos.map((logo, index) => (
          <img
            key={logo}
            src={logo}
            alt={index === 0 ? `${experience.company} logo` : ""}
            aria-hidden={index === 0 ? undefined : true}
            className={`h-[88px] w-[88px] object-contain ${logos.length > 1 ? "absolute experience-logo-slide" : ""}`}
            style={logos.length > 1 ? { animationDelay: `${index * -2.5}s`, opacity: index === 0 ? 1 : 0 } : undefined}
          />
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-start border-t border-white/[0.06] px-4 py-3 text-center">
        <h3 className="line-clamp-3 w-full break-words text-[15px] font-bold leading-[1.15] text-[var(--color-text-main)]">
          {experience.company}
        </h3>
        {experience.role && (
          <p className="mt-1 line-clamp-2 w-full break-words text-sm font-medium leading-snug text-[var(--color-text-subtle)]">
            {experience.role}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] leading-tight text-[var(--color-text-subtle)]">
          {dateRange && <span>{dateRange}</span>}
          {dateRange && experience.duration && <span aria-hidden="true">•</span>}
          {experience.duration && <span>{experience.duration}</span>}
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
