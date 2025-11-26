"use client";

import React from "react";

const EducationSection: React.FC = () => {
  return (
    <section className="w-full flex divide-x divide-[var(--color-primary)]">
      <div className="w-1/3 flex flex-col items-center justify-center p-4">
        <img
          src="/assets/addu.png"
          alt="ADDU LOGO"
          className="w-[240px] h-auto object-contain opacity-90 filter brightness-90"
        />
        <p className="text-center text-sm font-medium text-[var(--color-text-main)]">
          Ateneo de Davao University
        </p>
      </div>

      <div className="flex flex-col">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-main)]">College</h3>
          <p className="text-sm text-[var(--color-text-subtle)]">2020 – present</p>
          <p className="text-[var(--color-text-main)]">Bachelor of Science in Computer Science</p>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Senior High School</h3>
          <p className="text-sm text-[var(--color-text-subtle)]">2016 – 2018</p>
          <p className="text-[var(--color-text-main)]">Science, Technology, Engineering, and Mathematics Strand</p>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Elementary - Gradeschool - Junior High</h3>
          <p className="text-sm text-[var(--color-text-subtle)]">2004 – 2016</p>
          <p className="text-[var(--color-text-main)]">Elementary & Junior High School</p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
