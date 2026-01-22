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

const CertificationModal: React.FC<CertificationsCardProps> = ({ certification }) => {
  return (
    <div className="flex flex-row gap-4 w-[668px] p-2 h-[314px]">
      <div className="flex flex-row items-center justify-center">
        <div className="bg-[--color-card] p-[10px] h-[284px] w-[240px] flex flex-col items-center shadow-sm rounded-lg">
          <img
            src={certification.image ?? certification.logo}
            alt={certification.name}
            className="w-[200px] h-[200px] rounded-lg object-cover"
          />

          <p className="my-auto text-[30px] font-bold tracking-wide text-[var(--color-text-main)] leading-none">
            {certification.issuer}
          </p>

          <p className="text-[18px] font-bold text-[var(--color-text-subtle)] leading-none">
            Certificate
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-2">
        {certification.name && (
          <p className="text-[30px] font-bold text-[var(--color-text-main)] leading-[1.1]">
            {certification.name}
          </p>
        )}

        {certification.details && (
          <p className="mt-[10px] text-[18px] text-[var(--color-text-subtle)] leading-[1.2]">
            {certification.details}
          </p>
        )}

        {certification.date && (
          <p className="mt-auto text-[18px] text-[var(--color-text-subtle)] leading-none">
            Obtained: {certification.date}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificationModal;
