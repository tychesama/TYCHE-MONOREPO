"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Experience {
  company: string;
  logo: string;
  logos?: string[];
  role: string;
  duration: string;
  date: string;
  endDate?: string;
  link: string;
  images: string[];
  description: string;
  about?: string;
}

interface ExperienceModalProps {
  experience: Experience;
}

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const logos = experience.logos?.length ? experience.logos : [experience.logo];
  const images = experience.images ?? [];
  const logoOnlyMedia = images.length > 0 && images.every((image) => /logo/i.test(image));
  const galleryImages = logoOnlyMedia ? [] : images;
  const startDate = formatDate(experience.date);
  const endDate = experience.endDate ? formatDate(experience.endDate) : null;
  const dateRange = endDate ? `${startDate} – ${endDate}` : startDate;

  useEffect(() => setMounted(true), []);
  useEffect(() => setImageIndex(0), [experience.company]);

  const previousImage = () =>
    setImageIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  const nextImage = () =>
    setImageIndex((current) => (current + 1) % galleryImages.length);

  return (
    <div className="grid w-full overflow-hidden sm:w-[960px] lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b border-white/[0.07] bg-white/[0.02] p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-center gap-5">
          {logos.map((logo, index) => (
            <img
              key={logo}
              src={logo}
              alt={`${experience.company} ${index === 0 ? "primary" : "secondary"} logo`}
              className={logos.length > 1 ? "h-28 w-28 object-contain" : "h-[92px] w-[92px] object-contain"}
            />
          ))}
        </div>

        <div className="mt-5 text-center lg:text-left">
          <h3 className="text-xl font-bold leading-tight text-[var(--color-text-main)]">
            {experience.company}
          </h3>
          <p className="mt-2 text-sm font-medium text-[var(--color-text-subtle)]">
            {experience.role}
          </p>
        </div>

        <dl className="mt-5 grid gap-3 border-t border-white/[0.07] pt-4 text-sm">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
              Date range
            </dt>
            <dd className="mt-1 leading-relaxed text-[var(--color-text-main)]">{dateRange}</dd>
          </div>
          {experience.duration && (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                Engagement
              </dt>
              <dd className="mt-1 text-[var(--color-text-main)]">{experience.duration}</dd>
            </div>
          )}
          {experience.link && (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                Company website
              </dt>
              <dd className="mt-1">
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-400 hover:underline"
                >
                  {experience.link.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </aside>

      <main className="flex min-w-0 flex-col">
        {galleryImages.length > 0 && (
          <div className="group relative h-[260px] overflow-hidden border-b border-white/[0.07] bg-black/10 sm:h-[320px]">
            <img
              src={galleryImages[imageIndex]}
              alt={`${experience.company} work image ${imageIndex + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => setPreviewImage(galleryImages[imageIndex])}
              aria-label="Open full image preview"
              className="absolute inset-y-0 left-14 right-14 cursor-zoom-in"
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-black/60 to-transparent text-3xl text-white opacity-70 hover:opacity-100"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-black/60 to-transparent text-3xl text-white opacity-70 hover:opacity-100"
                >
                  ›
                </button>
                <div className="absolute bottom-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] text-white">
                  {imageIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        )}

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          <section className="sm:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
              What I worked on
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-main)]">
              {experience.description}
            </p>
          </section>

          {experience.about && (
            <section className="border-t border-white/[0.07] pt-4 sm:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                Work environment
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-main)]">
                {experience.about}
              </p>
            </section>
          )}
        </div>
      </main>

      {mounted && previewImage
        ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="Work experience image preview"
              className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )
        : null}
    </div>
  );
};

export default ExperienceModal;
