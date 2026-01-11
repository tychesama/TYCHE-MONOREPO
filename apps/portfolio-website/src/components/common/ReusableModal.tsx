"use client";
import React from "react";


const ReusableModal: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg)] rounded-lg shadow-md fixed inset-0 z-50 flex items-center justify-center">
      <div>
        {/* head */}
      </div>
      <div>
        {/* content */}
      </div>
      <h2 className="text-lg font-bold text-[var(--color-primary)]">
        Skills
      </h2>
    </div>
  );
};

export default ReusableModal;
