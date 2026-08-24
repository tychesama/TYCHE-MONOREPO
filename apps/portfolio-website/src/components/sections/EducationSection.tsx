"use client";

import React from "react";

const EducationSection: React.FC = () => {
  return (
    <section className="mt-1 grid w-full grid-cols-1 sm:h-[503px] sm:min-h-[503px] sm:max-h-[503px] sm:grid-cols-[minmax(190px,0.78fr)_minmax(0,2fr)]">
      <div className="flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.10)] px-5 py-6 sm:border-b-0 sm:border-r sm:border-[var(--color-primary)]">
        <img
          src="/static/addu.png"
          alt="Ateneo de Davao University seal"
          className="h-[118px] w-[118px] object-contain opacity-90 brightness-90 sm:h-[128px] sm:w-[128px]"
        />
        <p className="mt-4 max-w-[190px] text-center text-base font-bold leading-snug text-[var(--color-text-main)] sm:text-lg">
          Ateneo de Davao University
        </p>
        <p className="mt-1 text-center text-xs text-[var(--color-text-subtle)]">
          Davao City, Philippines
        </p>
      </div>

      <div className="grid min-w-0 grid-rows-[auto_1fr_auto]">
        <header className="border-b border-[rgba(255,255,255,0.10)] px-5 py-4">
          <h3 className="text-base font-semibold leading-snug text-[var(--color-text-main)] sm:text-lg">
            Bachelor of Science in Computer Science
          </h3>
          <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
            Graduated 2026
          </p>
        </header>

        <div className="min-h-0 px-5 py-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Notable Academic Work
          </h3>

          <div className="mt-3 divide-y divide-[rgba(255,255,255,0.08)]">
            <article className="pb-4">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">CalaSense</h4>
              <p className="mt-1 text-xs text-[var(--color-text-subtle)]">Undergraduate Thesis</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-text-subtle)]">
                Mobile calamansi leaf disease detection using Flutter, Flask, YOLOv5, and Supabase.
              </p>
            </article>

            <article className="pt-4">
              <h4 className="text-sm font-semibold leading-snug text-[var(--color-text-main)]">
                Motobai Inventory and Sales Management System
              </h4>
              <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
                Systems Analysis and Design
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-text-subtle)]">
                Full-stack academic system for inventory, orders, authentication, and employee workflows.
              </p>
            </article>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.10)] px-5 py-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Relevant Coursework
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
            Software Engineering · Database Systems · Web Development · Machine Learning
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
