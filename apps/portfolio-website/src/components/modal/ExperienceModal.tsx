"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Experience {
  company: string;
  logo: string;
  role: string;
  duration: string;
  date: string;
  link: string;
  images: string[];
  description: string;
}

interface ExperienceModalProps {
  experience: Experience;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const images = experience.images ?? [];
  const hasImages = images.length > 0;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setImgIndex(0); }, [experience.company]);

  const prevImg = () => { if (!hasImages) return; setImgIndex((i) => (i - 1 + images.length) % images.length); };
  const nextImg = () => { if (!hasImages) return; setImgIndex((i) => (i + 1) % images.length); };

  return (
    <div className="flex flex-col gap-5 w-full sm:w-[900px]">

      {/* Top section — info card + image carousel */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4">

        {/* Company info card */}
        <div className="flex sm:flex-col items-center gap-4 sm:gap-2 sm:justify-center bg-[var(--color-card)] rounded-xl px-5 py-4 sm:w-[240px] sm:h-[284px] shadow-inner border border-white/5">
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-16 h-16 sm:w-[200px] sm:h-[200px] rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col sm:items-center sm:text-center gap-0.5">
            <p className="text-lg sm:text-[26px] font-bold tracking-wide text-[var(--color-text-main)] leading-tight">
              {experience.company}
            </p>
            <p className="text-sm sm:text-base font-medium text-[var(--color-text-subtle)]">
              {experience.role}
            </p>
            <span className="mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-text-subtle)]">
              {experience.duration}
            </span>
          </div>
        </div>

        {/* Image carousel — untouched logic, just sized responsively */}
        <div className="group w-full sm:w-[575px] h-[200px] sm:h-[284px] flex justify-center gap-3 shadow-sm transition-shadow duration-150 relative overflow-hidden rounded-xl bg-[var(--color-card)] border border-white/5">
          {hasImages ? (
            <>
              <img
                src={images[imgIndex]}
                alt={`${experience.company} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {images.length > 1 && (
                <button type="button" onClick={prevImg}
                  className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 text-white text-3xl bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100"
                  aria-label="Previous image">‹</button>
              )}
              <button type="button" onClick={() => setPreviewImage(images[imgIndex])}
                className={`absolute top-0 h-full ${images.length > 1 ? "left-1/4 w-1/2" : "left-0 w-full"} opacity-0 group-hover:opacity-100`}
                aria-label="Preview image" />
              {images.length > 1 && (
                <button type="button" onClick={nextImg}
                  className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 text-white text-3xl bg-gradient-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100"
                  aria-label="Next image">›</button>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-2 right-2 z-10 text-xs text-white bg-black/40 px-2 py-1 rounded">
                  {imgIndex + 1}/{images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-subtle)] text-sm">
              No images available
            </div>
          )}
        </div>
      </div>

      {/* Bottom section — description + about */}
      <div className="flex flex-col sm:flex-row gap-4 border-t border-white/10 pt-4">

        <div className="flex-1 flex flex-col gap-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
            My Experience
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="hidden sm:block w-px bg-white/10 self-stretch" />

        <div className="flex-1 flex flex-col gap-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
            About the Company
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
            {experience.company} — {experience.duration}
          </p>
          {experience.link && (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs text-blue-400 hover:underline w-fit"
            >
              Visit website →
            </a>
          )}
        </div>
      </div>

      {/* Image preview portal — untouched */}
      {mounted && previewImage
        ? createPortal(
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]" onClick={() => setPreviewImage(null)}>
            <img src={previewImage} alt="preview" className="max-w-[70vw] max-h-[70vh] rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        ) : null}
    </div>
  );
};

export default ExperienceModal;