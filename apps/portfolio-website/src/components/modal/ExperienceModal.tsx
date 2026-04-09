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
  about?: string;
}

interface ExperienceModalProps {
  experience: Experience;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);

  const images = experience.images ?? [];
  const hasImages = images.length > 0;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setImgIndex(0);
    setAboutExpanded(false);
  }, [experience.company]);

  const goTo = (i: number) => {
    setImgVisible(false);
    setTimeout(() => {
      setImgIndex(i);
      setImgVisible(true);
    }, 150);
  };

  const prevImg = () => goTo((imgIndex - 1 + images.length) % images.length);
  const nextImg = () => goTo((imgIndex + 1) % images.length);

  const formattedDate = new Date(experience.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // No outer card wrapper — ReusableModal is the surface
    <div className="flex w-full sm:w-[860px] overflow-hidden">

      {/* ── Left sidebar ── */}
      <aside
        className="hidden sm:flex flex-col items-center gap-4 w-[210px] flex-shrink-0 border-r px-5 py-7"
        style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}
      >
        {/* Logo */}
        <div
          className="w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name / role / duration */}
        <div className="text-center flex flex-col items-center gap-1">
          <p className="text-[15px] font-bold text-[var(--color-text-main)] leading-tight">
            {experience.company}
          </p>
          <p className="text-sm text-[var(--color-text-subtle)]">{experience.role}</p>
          <span
            className="mt-1 text-xs font-medium px-3 py-0.5 rounded-full text-[var(--color-text-subtle)]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {experience.duration}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

        {/* Meta fields */}
        <div className="w-full flex flex-col gap-4">
          {experience.link && (
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                Website
              </p>
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline"
              >
                {experience.link.replace(/^https?:\/\//, "")} →
              </a>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
              Start date
            </p>
            <p className="text-xs text-[var(--color-text-subtle)]">{formattedDate}</p>
          </div>
        </div>
      </aside>

      {/* ── Right main panel ── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Image carousel */}
        <div
          className="group relative w-full flex-shrink-0 overflow-hidden"
          style={{ height: 240, backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          {hasImages ? (
            <>
              <img
                src={images[imgIndex]}
                alt={`${experience.company} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                style={{ opacity: imgVisible ? 1 : 0, transition: "opacity 0.15s ease" }}
              />

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={prevImg}
                  aria-label="Previous image"
                  className="absolute left-0 top-0 h-full w-14 flex items-center justify-start pl-3 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
                >
                  ‹
                </button>
              )}

              <button
                type="button"
                onClick={() => setPreviewImage(images[imgIndex])}
                aria-label="Preview image"
                className={`absolute top-0 h-full ${images.length > 1 ? "left-14 right-14" : "inset-0"} opacity-0 group-hover:opacity-100 cursor-zoom-in`}
              />

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImg}
                  aria-label="Next image"
                  className="absolute right-0 top-0 h-full w-14 flex items-center justify-end pr-3 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }}
                >
                  ›
                </button>
              )}

              {/* Filmstrip dots */}
              {images.length > 1 && (
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className="rounded-full bg-white flex-shrink-0 transition-all duration-200"
                      style={{ width: i === imgIndex ? 18 : 6, height: 6, opacity: i === imgIndex ? 1 : 0.4 }}
                    />
                  ))}
                </div>
              )}

              {images.length > 1 && (
                <div
                  className="absolute top-2.5 right-2.5 text-[11px] text-white px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
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

        {/* Text content */}
        <div className="flex flex-col gap-4 px-6 py-5">

          {/* Mobile-only company info */}
          <div
            className="flex sm:hidden items-center gap-3 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-10 h-10 rounded-lg object-cover"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <div>
              <p className="text-sm font-bold text-[var(--color-text-main)]">{experience.company}</p>
              <p className="text-xs text-[var(--color-text-subtle)]">
                {experience.role} · {experience.duration}
              </p>
            </div>
          </div>

          {/* My experience */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
              My experience
            </p>
            <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* About the company */}
          {experience.about && (
            <div
              className="flex flex-col gap-1.5 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                About the company
              </p>
              <p
                className="text-sm text-[var(--color-text-subtle)] leading-relaxed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: aboutExpanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                } as React.CSSProperties}
              >
                {experience.about}
              </p>
              <button
                type="button"
                onClick={() => setAboutExpanded((v) => !v)}
                className="text-xs text-blue-400 hover:underline w-fit mt-0.5"
              >
                {aboutExpanded ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen preview portal */}
      {mounted && previewImage
        ? createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center z-[9999]"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="preview"
              className="rounded-lg"
              style={{ maxWidth: "70vw", maxHeight: "70vh", boxShadow: "0 24px 60px rgba(0,0,0,0.7)" }}
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