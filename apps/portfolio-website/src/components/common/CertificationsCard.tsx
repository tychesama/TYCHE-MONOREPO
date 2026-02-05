"use client";
import React from "react";
import type { Certification } from "../../types/certification";

interface CertificationsCardProps {
  certification: Certification;
}

const CertificationsCard: React.FC<CertificationsCardProps> = ({ certification }) => {
  const imageSrc = certification.logo ?? "/assets/placeholder.png";
  return (
    <div className="flex-shrink-0 w-[160px] h-[115px]">
      <div
        className="
          bg-[var(--color-mini-card)]
          rounded-lg
          shadow-md
          flex flex-col items-center
          w-full h-full
          transition-transform duration-200 ease-out
          hover:scale-[1.05]
          hover:-translate-y-1 hover:shadow-lg 
        "
      >
        <div className="flex items-center justify-center">
          <img
            src={imageSrc}
            alt={certification.name}
            className="mt-3 w-[64px] h-[64px] object-contain rounded-lg"
          />
        </div>

        <p className="mt-[10px] px-2 text-sm font-semibold text-center text-[var(--color-text-main)] truncate w-full">
          {certification.name}
        </p>
      </div>
    </div>
  );
};

export default CertificationsCard;
