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

interface ExperienceModalProps {
  experience: Experience;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience }) => {
  return (
    <div className="flex flex-col gap-4 w-[900px]">
      <div className="flex flex-row items-center justify-center">
        <div className="bg-[--color-card] p-[10px] h-[284px] w-[240px] flex flex-col items-center shadow-sm rounded-lg">
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-[200px] h-[200px] rounded-lg object-cover"
          />
          <p className="my-auto text-[30px] font-bold tracking-wide text-[var(--color-text-main)] leading-none">{experience.company}</p>
          <p className="text-[18px] font-bold text-[var(--color-text-subtle)] leading-none">{experience.role}</p>
        </div>
        {experience.images?.length > 0 && (
          <div className="w-[575px] h-[284px] flex justify-center gap-3 shadow-sm transition-shadow duration-150">
            <img
              src={experience.images[0]}
              alt={`${experience.company} screenshot`}
              className="w-[450px] h-[284px] rounded-lg object-cover border-2 border-black"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-start h-[215px] px-[25px] py-[10px] border-t border-t-[#EDE9E9]/20">
        <div className="mt-3 flex flex-col items-start justify-start h-[95px] gap-[10px]">
          <p className="text-[18px] font-bold text-[var(--color-text-main)] leading-none">My Experience</p>
          <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.3]"> {experience.description}</p>
        </div>
        <div className="flex flex-col items-start justify-start h-[95px] gap-[10px]">
          <p className="text-[18px] font-bold text-[var(--color-text-main)] leading-none">About the Company</p>
          <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.3]"> {experience.company} — {experience.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
