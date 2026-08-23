// ProjectModal.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { getReadableTextColor } from "@shared/ui/colorContrast.mjs";
import type { Project } from "../../types/project";

interface ProjectModalProps {
  project: Project;
}

interface GithubCommit {
  message: string;
  url: string;
  author: string;
  date: string;
}

interface GithubData {
  commits?: GithubCommit[];
}

const isUsableImagePath = (path: string) => {
  const trimmed = path.trim();
  return Boolean(trimmed) && !trimmed.endsWith("/");
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const images = useMemo(
    () => (project.images ?? []).filter(isUsableImagePath),
    [project.images],
  );
  const hasImages = images.length > 0 && !imageFailed;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setDisplayIndex(0);
    setImgLoading(true);
    setImageFailed(false);
  }, [project.name]);

  useEffect(() => {
    if (!hasImages) return;
    setImgLoading(true);
    const img = new Image();
    img.src = images[displayIndex];
    img.onload = () => setImgLoading(false);
    img.onerror = () => {
      setImgLoading(false);
      setImageFailed(true);
    };
  }, [displayIndex, hasImages, images]);

  useEffect(() => {
    if (project.user !== "tychesama" || !project.repo) {
      setGithubData(null);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/github/${project.user}/${project.repo}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setGithubData(data))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setGithubData(null);
      });

    return () => controller.abort();
  }, [project.repo, project.user]);

  const prevImg = () => setDisplayIndex((index) => (index - 1 + images.length) % images.length);
  const nextImg = () => setDisplayIndex((index) => (index + 1) % images.length);

  return (
    <div className="grid h-[calc(85dvh-84px)] max-h-[700px] min-h-[520px] w-full grid-rows-[minmax(0,1.65fr)_minmax(0,1fr)] gap-3 sm:w-[1180px]">
      <div className="grid min-h-0 border border-[rgba(81,86,94,0.3)] md:grid-cols-12">
        <section className="flex min-h-0 flex-col border-b border-[rgba(81,86,94,0.3)] bg-[var(--color-card)] p-5 md:col-span-5 md:border-b-0 md:border-r">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">{project.category || "Project"}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="mt-2 line-clamp-2 text-2xl font-bold leading-tight text-[var(--color-text-main)] hover:underline">
            {project.name}
          </a>
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[var(--color-text-subtle)]">
            {project.fullDescription || project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-4 min-h-0 border-t border-[rgba(81,86,94,0.3)] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">Highlights</p>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>— {highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {(project.deployment || project.documentation) && (
            <div className="mt-auto flex gap-2 pt-3">
              {project.deployment && (
                <a href={project.deployment} target="_blank" rel="noopener noreferrer"
                  className="flex-1 rounded-sm py-2 text-center text-xs font-medium transition-opacity hover:opacity-85"
                  style={{ backgroundColor: project.color, color: getReadableTextColor(project.color) }}>Open project</a>
              )}
              {project.documentation && (
                <a href={project.documentation} target="_blank" rel="noopener noreferrer"
                  className="flex-1 rounded-sm border border-[rgba(81,86,94,0.4)] bg-[var(--color-mini-card)] py-2 text-center text-xs font-medium text-[var(--color-text-main)]">Documentation</a>
              )}
            </div>
          )}
        </section>

        <div className="group relative min-h-[220px] overflow-hidden bg-[var(--color-mini-card)] md:col-span-7 md:min-h-0">
          {hasImages ? (
            <>
              <img src={images[displayIndex]} alt={`${project.name} preview ${displayIndex + 1}`} draggable={false}
                className={`h-full w-full object-cover transition-opacity duration-200 ${imgLoading ? "opacity-50" : "opacity-100"}`}
                onLoad={() => setImgLoading(false)}
                onError={() => { setImgLoading(false); setImageFailed(true); }} />
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <img src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif" alt="Loading..." className="h-8 w-8" />
                </div>
              )}
              <button type="button" onClick={() => setPreviewImage(images[displayIndex])}
                aria-label="Preview image" className="absolute inset-y-0 left-14 right-14 cursor-zoom-in" />
              {images.length > 1 && (
                <>
                  <button type="button" onClick={prevImg} aria-label="Previous image"
                    className="absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-black/60 to-transparent text-3xl text-white opacity-70 hover:opacity-100">‹</button>
                  <button type="button" onClick={nextImg} aria-label="Next image"
                    className="absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-black/60 to-transparent text-3xl text-white opacity-70 hover:opacity-100">›</button>
                  <div className="absolute bottom-2 right-2 z-20 bg-black/60 px-2 py-1 text-[10px] text-white">{displayIndex + 1} of {images.length}</div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-[rgba(81,86,94,0.45)] text-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 text-[var(--color-text-subtle)] opacity-55">
                <path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v8.6l3.7-3.7a1 1 0 0 1 1.4 0l2.2 2.2 3.2-4a1 1 0 0 1 1.5-.1l4 4.1V7H4Zm16 10v-.1l-4.6-4.7-3.2 4a1 1 0 0 1-1.5.1l-2.3-2.3-3 3H20Z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-main)]">Project preview unavailable</p>
                <p className="mt-1 text-xs text-[var(--color-text-subtle)]">No image is available yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid min-h-0 grid-cols-[0.65fr_1.55fr_0.9fr] border border-[rgba(81,86,94,0.3)]">
        <dl className="flex min-h-0 flex-col divide-y divide-[rgba(81,86,94,0.3)] bg-[var(--color-mini-card)]">
          {[
            ["Type", project.projectType],
            ["Repository", project.sourceAvailability === "public" ? `${project.user}/${project.repo}` : project.sourceAvailability],
            ["Status", project.status],
            ["AI use", project.aiInvolvement],
          ].map(([label, value]) => (
            <div key={label} className="flex min-h-0 flex-1 flex-col justify-center px-3 py-1.5">
              <dt className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">{label}</dt>
              <dd className="mt-0.5 truncate text-[11px] font-medium capitalize text-[var(--color-text-main)]">{value || "—"}</dd>
            </div>
          ))}
        </dl>

        <section className="min-h-0 border-l border-[rgba(81,86,94,0.3)] bg-[var(--color-card)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">Details</p>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--color-text-subtle)]">
            {project.projectContext || project.description}
          </p>
          {project.myContributions && (
            <div className="mt-3 border-t border-[rgba(81,86,94,0.3)] pt-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">My contributions</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-subtle)]">{project.myContributions}</p>
            </div>
          )}
        </section>

        <aside className="min-h-0 border-l border-[rgba(81,86,94,0.3)] bg-[var(--color-mini-card)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">Other information</p>
          <div className="mt-2 flex max-h-[48px] flex-wrap gap-1 overflow-hidden">
            {(project.techstack ?? []).map((tech) => (
              <span key={tech} className="border border-[rgba(81,86,94,0.35)] px-1.5 py-0.5 text-[9px] text-[var(--color-text-subtle)]">{tech}</span>
            ))}
          </div>
          {project.aiInvolvement !== "none" && project.aiDisclosure && (
            <p className="mt-2 border-t border-[rgba(81,86,94,0.3)] pt-2 text-[9px] leading-relaxed text-[var(--color-text-subtle)]">{project.aiDisclosure}</p>
          )}
          {githubData?.commits && githubData.commits.length > 0 && (
            <div className="mt-2 border-t border-[rgba(81,86,94,0.3)] pt-2">
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Recent commits</p>
              {githubData.commits.slice(0, 2).map((commit) => (
                <a key={commit.url} href={commit.url} target="_blank" rel="noopener noreferrer"
                  className="mt-1 block truncate text-[9px] text-[var(--color-text-subtle)] hover:underline">{commit.message}</a>
              ))}
            </div>
          )}
          {project.collaborators && Object.keys(project.collaborators).length > 0 && (
            <div className="mt-2 border-t border-[rgba(81,86,94,0.3)] pt-2">
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Collaborators</p>
              <p className="mt-1 line-clamp-1 text-[9px] text-[var(--color-text-subtle)]">{Object.keys(project.collaborators).join(", ")}</p>
            </div>
          )}
        </aside>
      </div>

      {mounted && previewImage ? createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="preview" className="max-h-[85vh] max-w-[90vw] rounded-sm shadow-lg" onClick={(e) => e.stopPropagation()} />
        </div>, document.body,
      ) : null}
    </div>
  );
};

export default ProjectModal;