"use client";

import { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import LanguageIcon from "@mui/icons-material/Language";
import type { Certification } from "../../types/certification";

interface CertificationsCardProps {
  certification: Certification;
}

const CertificationModal: React.FC<CertificationsCardProps> = ({ certification }) => {
  const imageSrc = certification.logo ?? "/assets/placeholder.png";
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-[668px] p-2">

      {/* Left — logo + type + date */}
      <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-0 bg-[var(--color-card)] p-[10px] sm:h-[284px] sm:w-[240px] rounded-lg shadow-sm shrink-0">
        <img
          src={imageSrc}
          alt={certification.name}
          className="w-[80px] h-[80px] sm:w-[200px] sm:h-[200px] rounded-lg object-cover"
        />
        <div className="flex flex-col sm:items-center sm:my-auto gap-1">
          <p className="text-xl sm:text-[30px] font-bold tracking-wide text-[var(--color-text-main)] leading-none">
            {certification.type}
          </p>
          {certification.date && (
            <p className="text-sm sm:text-[18px] font-bold text-[var(--color-text-subtle)] leading-none">
              {certification.date}
            </p>
          )}
        </div>
      </div>

      {/* Right — name + details + images + links */}
      <div className="flex flex-col items-start justify-start p-2 min-w-0 flex-1">
        {certification.name && (
          <p className="text-xl sm:text-[26px] font-bold text-[var(--color-text-main)] leading-[1.1]">
            {certification.name}
          </p>
        )}

        {certification.details && (
          <p className="mt-2 text-sm text-[var(--color-text-subtle)] leading-[1.4] text-justify max-h-[120px] overflow-y-auto scrollbar-hide">
            {certification.details}
          </p>
        )}

        {certification.images && certification.images.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2 w-full">
            {certification.images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setPreviewImage(img)}
                className="w-full h-[60px] sm:h-[75px] rounded-md overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] transition"
              >
                <img src={img} alt={`preview-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-row gap-3 mt-auto pt-3">
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
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="preview" className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default CertificationModal;