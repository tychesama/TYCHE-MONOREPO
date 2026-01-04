"use client";
import React from "react";

interface Certification {
  name: string;
  logo: string;
  image?: string;
  issuer?: string;
  date?: string;
  details?: string;
}

interface CertificationsCardProps {
  certification: Certification;
}

const CertificationsCard: React.FC<CertificationsCardProps> = ({ certification }) => {
  return (
    <div className="flex-shrink-0 bg-[var(--color-mini-card)] rounded-lg shadow-md flex flex-col items-center w-[160px] h-[115px]">
      <div className="flex items-center justify-center">
        <img
          src={certification.logo}
          alt={certification.name}
          className="mt-3 w-[64px] h-[64px] object-fill rounded-lg"
        />
      </div>

      <p className="mt-[10px] px-2 text-sm font-semibold text-center text-[var(--color-text-main)] truncate w-full">
        {certification.name}
      </p>
    </div>
  );
};

export default CertificationsCard;
