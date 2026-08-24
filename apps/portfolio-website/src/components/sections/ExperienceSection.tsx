"use client";

import React, { useState } from "react";
import ExperienceCard from "../common/ExperienceCard";
import ReusableModal from "@shared/ui/ReusableModal";
import ExperienceModal from "../modal/ExperienceModal";
import CloseIcon from "@mui/icons-material/Close";

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
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  return (
    <>
      <div className="p-2 flex h-full max-h-[520px] w-full flex-col justify-start gap-3 overflow-y-auto scrollbar-hide">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedExperience(exp)}
            className="cursor-pointer w-full"
          >
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </div>

      <ReusableModal
        title="Work Experience"
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        CloseIcon={CloseIcon}
      >
        {selectedExperience && (
          <ExperienceModal experience={selectedExperience} />
        )}
      </ReusableModal>
    </>
  );
};

export default ExperienceSection;