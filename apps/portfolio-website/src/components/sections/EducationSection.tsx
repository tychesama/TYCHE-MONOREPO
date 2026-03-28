"use client";

import React from "react";

const EducationSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col sm:flex-row sm:divide-x divide-[var(--color-primary)] mt-2">

      {/* Logo + School name — takes ~50% on mobile, 1/3 on desktop */}
      <div className="-mt-[20px] w-full sm:w-1/3 flex flex-col items-center justify-center p-4 border-b-2 border-[var(--color-primary)] sm:border-b-0">
        <img
          src="/static/addu.png"
          alt="ADDU LOGO"
          className="w-[145px] h-[145px] sm:w-[175px] sm:h-[175px] object-contain opacity-90 filter brightness-90"
        />
        <p className="text-center text-base sm:text-lg font-bold text-[var(--color-text-main)] mt-2">
          Ateneo de Davao University
        </p>
      </div>

      {/* Education entries */}
      <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.06)]">
        <div className="px-4 py-2.5">
          <h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text-main)]">College</h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-subtle)]">2020 – present</p>
          <p className="text-xs sm:text-base text-[var(--color-text-main)]">Bachelor of Science in Computer Science</p>
        </div>

        <div className="px-4 py-2.5">
          <h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text-main)]">Senior High School</h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-subtle)]">2016 – 2018</p>
          <p className="text-xs sm:text-base text-[var(--color-text-main)]">STEM Strand</p>
        </div>

        <div className="px-4 py-2.5">
          <h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text-main)]">Elementary – Junior High</h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-subtle)]">2004 – 2016</p>
          <p className="text-xs sm:text-base text-[var(--color-text-main)]">Elementary & Junior High School</p>
        </div>
      </div>

    </section>
  );
};

export default EducationSection;