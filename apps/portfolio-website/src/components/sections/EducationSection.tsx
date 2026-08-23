"use client";

import React from "react";

const EducationSection: React.FC = () => {
  return (
    <section className="mt-1 flex h-full min-h-[430px] w-full flex-col divide-[var(--color-primary)] sm:flex-row sm:divide-x">
      <div className="flex w-full flex-col items-center justify-center border-b-2 border-[var(--color-primary)] p-3 sm:w-[32%] sm:border-b-0">
        <img
          src="/static/addu.png"
          alt="Ateneo de Davao University seal"
          className="h-[115px] w-[115px] object-contain opacity-90 brightness-90 sm:h-[135px] sm:w-[135px]"
        />
        <p className="mt-3 text-center text-base font-bold leading-snug text-[var(--color-text-main)] sm:text-lg">
          Ateneo de Davao University
        </p>
        <p className="mt-1 text-center text-xs text-[var(--color-text-subtle)]">
          Davao City, Philippines
        </p>
      </div>

      <div className="flex min-w-0 flex-1 flex-col divide-y divide-[rgba(255,255,255,0.08)]">
        <div className="px-4 py-2">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <h3 className="text-base font-semibold text-[var(--color-text-main)] sm:text-lg">
              B.S. Computer Science
            </h3>
            <p className="text-xs text-[var(--color-text-subtle)] sm:text-sm">
              Graduated 2026
            </p>
          </div>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Undergraduate Thesis
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
            <span className="font-semibold text-[var(--color-text-main)]">CalaSense</span> — a calamansi leaf disease-detection system using Flutter, Flask, YOLOv5, and Supabase.
          </p>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Systems Analysis and Design
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
            <span className="font-semibold text-[var(--color-text-main)]">Motobai Inventory and Sales Management System</span>, a full-stack system for inventory, orders, authentication, and employee workflows in a real-business context.
          </p>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Relevant Coursework
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
            Software Engineering · Database Systems · Web Development · Machine Learning
          </p>
        </div>

        <div className="flex flex-col gap-2 px-4 py-2">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
              Academic Focus
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
              Full-stack systems, mobile applications, project planning, and applied computer vision.
            </p>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.06)] pt-2">
            <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
              Languages
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
              English · Filipino/Tagalog · Cebuano/Bisaya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
