"use client";

import React from "react";
import CertificationsCard from "../common/CertificationsCard";

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
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {certifications.map((cert, idx) => (
        <CertificationsCard key={idx} certification={cert} />
      ))}
    </div>
  );
};

export default CertificationsSection;
