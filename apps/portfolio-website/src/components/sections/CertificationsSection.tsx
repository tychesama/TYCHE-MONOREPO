"use client";

import React, { useState } from "react";
import CertificationsCard from "../common/CertificationsCard";
import ReusableModal from "@shared/ui/ReusableModal";
import CertificationModal from "../modal/CertificationModal";

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
  const [open, setOpen] = useState(false);
  
  return (
    <>
    <div onClick={() => setOpen(true)} className="relative w-full overflow-hidden -mt-2">
      <div className="flex gap-2 animate-scroll py-3 -translate-y-2">
        {[...certifications, ...certifications].map((cert, idx) => (
          <CertificationsCard key={idx} certification={cert} />
        ))}
      </div>
    </div>

    {/* Reusable Modal */}
      <ReusableModal
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <CertificationModal />
        <div />
      </ReusableModal>
    </>
  );
};

export default CertificationsSection;
