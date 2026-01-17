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

const ExperienceModal = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <div className="flex flex-col gap-4 w-[900px]">
      <div className="flex flex-row items-center justify-center h-[284px]">
        <div className="bg-[--color-card] py-2 px-3 h-[284px] flex flex-col items-center gap-3 shadow-sm rounded-lg">
          <img
            src="/assets/ccna.jpg"
            alt="logo"
            className="w-[200px] h-[200px] rounded-lg object-cover"
          />
          <p>Jairosoft Inc</p>
          <p>Bubble Developer</p>

        </div>
        <div className="py-2 px-3 h-[284px] flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-150">
          <img
            src="/assets/sss.jpg"
            alt="Loading..."
            className="w-[200px] h-[200px] rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start h-[215px]">
        <div>
          <p>About the Company</p>
          <p> descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long description</p>
        </div>
        <div>
          <p>About the Company</p>
          <p> Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long descriptionVery Long description</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
