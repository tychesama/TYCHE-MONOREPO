"use client";

import React, { useState } from "react";
import CertificationsCard from "../common/CertificationsCard";
import ReusableModal from "@shared/ui/ReusableModal";
import CertificationModal from "../modal/CertificationModal";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowRight } from "react-icons/fa6";
import type { Certification } from "../../types/certification";




interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showAll, setShowAll] = useState(false);



  return (
    <>
      <button
        onClick={() => setShowAll(true)}
        className="absolute right-2 -mt-[18px] z-10 text-[var(--color-text-main)] hover:text-[var(--color-text-subtle)]"
      >
        <FaArrowRight />
      </button>
      <div className="relative w-full overflow-hidden -mt-2">
        <div className="flex gap-2 animate-scroll py-3 -translate-y-2">
          {[...certifications, ...certifications].map((cert, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCertification(cert)}
              className="cursor-pointer"
            >
              <CertificationsCard certification={cert} />
            </div>
          ))}
        </div>
      </div>

      {/* Individual Modal */}
      <ReusableModal
        title="Certificate" // replace later with Type
        isOpen={!!selectedCertification}
        onClose={() => setSelectedCertification(null)}
        CloseIcon={CloseIcon}
        color={selectedCertification?.color ?? undefined}
      >
        {selectedCertification && (
          <CertificationModal certification={selectedCertification} />
        )}
      </ReusableModal>

      {/* All Modal */}
      <ReusableModal title='Achievements & Involvements List' isOpen={showAll} onClose={() => setShowAll(false)} CloseIcon={CloseIcon}>
        <div className="px-6 w-[680px] max-h-[500px] overflow-y-auto scrollbar-hide">
          <div className="flex items-end justify-between mb-4">
            <p className="text-lg font-semibold text-[var(--color-text-main)]">Items Listed:</p>
            <p className="text-xs text-[var(--color-text-subtle)]">{certifications.length} items</p>
          </div>

          <div className="flex flex-col gap-2">
            {certifications.map((cert, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedCertification(cert);
                  setShowAll(false);
                }}
                className="group w-full text-left flex items-center gap-3 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.10)] px-3 py-2 transition-all duration-150"
              >
                <span
                  className="h-10 w-1 rounded-full opacity-80"
                  style={{ backgroundColor: cert.color || "rgba(255,255,255,0.12)" }}
                />

                <div className="w-10 h-10 rounded-md bg-[rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {cert.logo && <img src={cert.logo} alt={cert.name} className="w-7 h-7 object-contain" />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-main)] truncate group-hover:underline">
                    {cert.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-subtle)] truncate">
                    {cert.issuer ? cert.issuer : "Certification"}{cert.date ? ` • ${cert.date}` : ""}
                  </p>
                </div>

                <span className="text-xs text-[var(--color-text-subtle)] opacity-70 group-hover:opacity-100">
                  View →
                </span>
              </button>
            ))}
          </div>
        </div>
      </ReusableModal>


    </>
  );
};

export default CertificationsSection;
