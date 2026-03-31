// ProjectModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../types/project";

interface ProjectModalProps {
  project: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
  const [githubData, setGithubData]     = useState<null | any>(null);
  const [loading, setLoading]           = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isFading, setIsFading]         = useState(false);
  const [imgLoading, setImgLoading]     = useState(true);
  const [mounted, setMounted]           = useState(false);

  const images    = project.images ?? [];
  const hasImages = images.length > 0;
  const FADE_MS   = 200;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setDisplayIndex(0);
    setIsFading(false);
    setImgLoading(true);
  }, [project.name]);

  useEffect(() => {
    if (!hasImages) return;
    setImgLoading(true);
    const img = new Image();
    img.src = images[displayIndex];
    img.onload  = () => setImgLoading(false);
    img.onerror = () => setImgLoading(false);
  }, [displayIndex, hasImages, images]);

  useEffect(() => {
    setLoading(true);
    const fetchGithub = async () => {
      try {
        const res = await fetch(`/api/github/${project.user}/${project.repo}`);
        if (!res.ok) return;
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) return;
        setGithubData(await res.json());
      } catch (e) {
        console.error("GitHub fetch failed", e);
      } finally {
        setTimeout(() => setLoading(false), 100);
      }
    };
    fetchGithub();
  }, [project.user, project.repo]);

  const goToIndex = (next: number) => {
    if (!hasImages || isFading || next === displayIndex) return;
    setIsFading(true);
    setImgLoading(true);
    window.setTimeout(() => { setDisplayIndex(next); }, FADE_MS);
  };

  const prevImg = () => goToIndex((displayIndex - 1 + images.length) % images.length);
  const nextImg = () => goToIndex((displayIndex + 1) % images.length);

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Header — name + last updated */}
      <div className="flex items-start justify-between gap-2 border-b border-[rgba(81,86,94,0.3)] pb-3">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-[var(--color-text-main)] hover:underline leading-tight"
        >
          {project.name}
        </a>
        {githubData?.repo?.updatedAt && (
          <p className="text-xs text-[var(--color-text-subtle)] whitespace-nowrap mt-1">
            Updated: {new Date(githubData.repo.updatedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Image carousel */}
      <div className="group relative w-full h-[200px] rounded-lg overflow-hidden bg-[var(--color-mini-card)]">
        {hasImages ? (
          <>
            <img
              src={images[displayIndex]}
              alt={`${project.name} preview ${displayIndex + 1}`}
              draggable={false}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                isFading ? "opacity-0" : imgLoading ? "opacity-40" : "opacity-100"
              }`}
              onLoad={() => { setImgLoading(false); setIsFading(false); }}
              onError={() => { setImgLoading(false); setIsFading(false); }}
            />

            {imgLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                <img src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif" alt="Loading..." className="w-8 h-8" />
              </div>
            )}

            {images.length > 1 && (
              <button type="button" onClick={prevImg} aria-label="Previous image"
                className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-3 text-white text-3xl bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition">
                ‹
              </button>
            )}

            <button type="button" onClick={() => setPreviewImage(images[displayIndex])} aria-label="Preview image"
              className={`absolute top-0 h-full ${images.length > 1 ? "left-1/4 w-1/2" : "left-0 w-full"} opacity-0 group-hover:opacity-100 transition`}
            />

            {images.length > 1 && (
              <button type="button" onClick={nextImg} aria-label="Next image"
                className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-3 text-white text-3xl bg-gradient-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition">
                ›
              </button>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 z-10 text-xs text-white bg-black/40 px-2 py-1 rounded">
                {displayIndex + 1}/{images.length}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-subtle)] text-sm">
            No images
          </div>
        )}
      </div>

      {/* Loading overlay for github data */}
      {loading && (
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
          <img src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif" alt="Loading..." className="w-4 h-4" />
          Fetching GitHub data...
        </div>
      )}

      {/* Description */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">Description</p>
        <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">{project.description}</p>
      </div>

      {/* Recent commits */}
      {githubData?.commits?.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-[rgba(81,86,94,0.3)] pt-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">Recent Commits</p>
          <ul className="list-disc ml-4 flex flex-col gap-1">
            {githubData.commits.map((c: any, i: number) => (
              <li key={i} className="text-sm text-[var(--color-text-subtle)]">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {c.message}
                </a>{" "}
                <span className="italic text-xs opacity-70">
                  ({c.author}, {new Date(c.date).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Collaborators */}
      {project.collaborators && Object.keys(project.collaborators).length > 0 && (
        <div className="flex flex-col gap-1 border-t border-[rgba(81,86,94,0.3)] pt-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">Collaborators</p>
          <div className="text-sm text-[var(--color-text-subtle)]">
            {Object.entries(project.collaborators).map(([name, url], index, arr) => (
              <span key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">{name}</a>
                {index < arr.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech stack */}
      <div className="border-t border-[rgba(81,86,94,0.3)] pt-3">
        <p className="text-[11px] text-[var(--color-text-subtle)] italic">
          Tech Stack: {project.techstack?.join(", ") ?? "—"}
        </p>
      </div>

      {/* Deployment / docs buttons */}
      {(project.deployment || project.documentation) && (
        <div className="flex gap-2 w-full">
          {project.deployment && (
            <a href={project.deployment} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-3 rounded-md transition">
              Deployment
            </a>
          )}
          {project.documentation && (
            <a href={project.documentation} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-3 rounded-md transition">
              Documentation
            </a>
          )}
        </div>
      )}

      {/* Full image preview portal */}
      {mounted && previewImage
        ? createPortal(
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
            onClick={() => setPreviewImage(null)}>
            <img src={previewImage} alt="preview"
              className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        ) : null}
    </div>
  );
};

export default ProjectModal;