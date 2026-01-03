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
    <div className="bg-[var(--color-mini-card)] rounded-lg shadow-md flex flex-col items-center min-w-[160px] min-h-[115px]">
      <div className="flex items-center justify-center">
        <img
          src={certification.logo}
          alt={certification.name}
          className="mt-3 w-[64px] h-[64px] object-contain rounded-lg"
        />
      </div>

      <p className="mt-[10px] text-sm font-semibold text-center text-[var(--color-text-main)] truncate">
        {certification.name}
      </p>

      {/* {certification.issuer && (
        <p className="text-xs text-[var(--color-text-subtle)] text-center">
          {certification.issuer}
        </p>
      )}

      {certification.date && (
        <p className="text-xs text-[var(--color-text-subtle)] text-center">
          {certification.date}
        </p>
      )} */}
    </div>
  );
};

export default CertificationsCard;
