"use client";

import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import LanguageIcon from "@mui/icons-material/Language";
import type { Certification } from "../../types/certification";

interface CertificationsCardProps {
  certification: Certification;
}

const CertificationModal: React.FC<CertificationsCardProps> = ({ certification }) => {
  const imageSrc = certification.image ?? certification.logo ?? "/assets/placeholder.png";
  return (
    <div className="-mt-[4px] flex flex-row gap-4 w-[668px] p-2 h-[310px]">
      <div className="flex flex-row items-start justify-center">
        <div className="bg-[--color-card] p-[10px] h-[284px] w-[240px] flex flex-col items-center shadow-sm rounded-lg">
          <img
            src={imageSrc}
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
          <p className="mt-[10px] mb-auto text-[18px] text-[var(--color-text-subtle)] leading-[1.2]">
            {certification.details}
          </p>
        )}

        <div className="flex flex-row gap-3 mt-2">
          {certification.certificate_link && (
            <a href={certification.certificate_link} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="medium" sx={{ color: "var(--color-text-subtle)" }} />
            </a>
          )}
          {certification.website_link && (
            <a href={certification.website_link} target="_blank" rel="noopener noreferrer">
              <LinkIcon fontSize="medium" sx={{ color: "var(--color-text-subtle)" }} />
            </a>
          )}
          {certification.extra_link && (
            <a href={certification.extra_link} target="_blank" rel="noopener noreferrer">
              <LanguageIcon fontSize="medium" sx={{ color: "var(--color-text-subtle)" }} />
            </a>
          )}
        </div>

        {certification.date && (
          <p className="mt-2 text-[18px] text-[var(--color-text-subtle)] leading-none">
            Obtained: {certification.date}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificationModal;
