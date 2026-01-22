"use client";

import React, { useState } from "react";
import CertificationsCard from "../common/CertificationsCard";
import ReusableModal from "@shared/ui/ReusableModal";
import CertificationModal from "../modal/CertificationModal";
import CloseIcon from "@mui/icons-material/Close";

interface Certification {
  name: string;
  logo: string;
  image?: string;
  issuer?: string;
  date?: string;
  details?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  
  return (
    <>
    <div  className="relative w-full overflow-hidden -mt-2 ">
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

    {/* Reusable Modal */}
      <ReusableModal
        isOpen={!!selectedCertification}
        onClose={() => setSelectedCertification(null)}
        CloseIcon={CloseIcon}
      >
        {selectedCertification && (
          <CertificationModal certification={selectedCertification} />
        )}
      </ReusableModal>
    </>
  );
};

export default CertificationsSection;
