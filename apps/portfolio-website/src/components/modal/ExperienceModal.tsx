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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImgIndex(0);
  }, [experience.company]);

  const prevImg = () => {
    if (!hasImages) return;
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImg = () => {
    if (!hasImages) return;
    setImgIndex((i) => (i + 1) % images.length);
  };


  return (
    <div className="flex flex-col gap-4 w-[900px] h-[600]">
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="bg-[--color-card] p-[10px] h-[284px] w-[240px] flex flex-col items-center shadow-sm rounded-lg">
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-[200px] h-[200px] rounded-lg object-cover"
          />
          <p className="my-auto text-[30px] font-bold tracking-wide text-[var(--color-text-main)] leading-none">{experience.company}</p>
          <p className="text-[18px] font-bold text-[var(--color-text-subtle)] leading-none">{experience.role}</p>
        </div>
        <div className="group w-[575px] h-[284px] flex justify-center gap-3 shadow-sm transition-shadow duration-150 relative overflow-hidden rounded-lg bg-[--color-card]">
          {hasImages ? (
            <>
              <img
                src={images[imgIndex]}
                alt={`${experience.company} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Left */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute left-0 top-0 h-full w-1/4
                     flex items-center justify-start pl-4
                     text-white text-3xl
                     bg-gradient-to-r from-black/50 to-transparent
                     opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

              {/* Middle (preview) */}
              <button
                type="button"
                onClick={() => setPreviewImage(images[imgIndex])}
                className={`absolute top-0 h-full
          ${images.length > 1 ? "left-1/4 w-1/2" : "left-0 w-full"}
          opacity-0 group-hover:opacity-100`}
                aria-label="Preview image"
              />

              {/* Right */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute right-0 top-0 h-full w-1/4
                     flex items-center justify-end pr-4
                     text-white text-3xl
                     bg-gradient-to-l from-black/50 to-transparent
                     opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  ›
                </button>
              )}

              {/* Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-2 right-2 z-10 text-xs text-white bg-black/40 px-2 py-1 rounded">
                  {imgIndex + 1}/{images.length}
                </div>
              )}
            </>
          ) : null}
        </div>

      </div>

      <div className="flex flex-col items-start justify-start h-[215px] px-[25px] py-[10px] border-t border-t-[#EDE9E9]/20">
        <div className="mt-3 flex flex-col items-start justify-start h-[95px] gap-[10px]">
          <p className="text-[18px] font-bold text-[var(--color-text-main)] leading-none">My Experience</p>
          <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.3]"> {experience.description}</p>
        </div>
        <div className="flex flex-col items-start justify-start h-[95px] gap-[10px]">
          <p className="text-[18px] font-bold text-[var(--color-text-main)] leading-none">About the Company</p>
          <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.3]"> {experience.company} — {experience.duration}</p>
        </div>
      </div>
      {mounted && previewImage
        ? createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="preview"
              className="max-w-[70vw] max-h-[70vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )
        : null}

    </div>
  );
};

export default ExperienceModal;
