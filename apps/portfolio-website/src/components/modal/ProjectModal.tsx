// ProjectModal.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { getReadableTextColor } from "@shared/ui/colorContrast.mjs";
import { FaGithub, FaGlobe, FaYoutube } from "react-icons/fa";
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
    <div className="grid h-auto w-full grid-cols-1 gap-3 md:w-[1100px] md:grid-cols-[minmax(280px,420px)_minmax(0,680px)] 2xl:h-[calc(85dvh-84px)] 2xl:max-h-[700px] 2xl:min-h-[520px] 2xl:w-[1420px] 2xl:grid-cols-[420px_minmax(0,680px)_minmax(260px,1fr)] 2xl:grid-rows-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col border border-[rgba(81,86,94,0.3)] bg-[var(--color-card)] p-5 md:col-start-1 md:row-span-2 md:row-start-1">
          <div className="flex items-center gap-4">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[var(--color-mini-card)] text-xl font-bold" style={{ color: project.color }}>
              <span aria-hidden="true">{project.name.charAt(0).toUpperCase()}</span>
              {(project.logo || project.favicon) && (
                <img
                  src={project.logo || `/api/project-favicon/${encodeURIComponent(project.favicon?.split("/").pop() ?? "")}`}
                  alt=""
                  className="absolute inset-0 h-full w-full bg-[var(--color-card)] object-contain p-2"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                />
              )}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">{project.category || "Project"}</p>
              <h3 className="mt-1 line-clamp-2 text-2xl font-bold leading-tight text-[var(--color-text-main)]">
                {project.name}
              </h3>
            </div>
          </div>
          <p className="mt-4 line-clamp-4 text-[15px] leading-6 text-[var(--color-text-main)]">
            {project.fullDescription || project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-4 min-h-0 border-t border-[rgba(81,86,94,0.3)] pt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">Highlights</p>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-[var(--color-text-main)]">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>— {highlight}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-4">
          {(project.link || project.demo || project.deployment) && (
            <div className="flex gap-2">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-[rgba(81,86,94,0.4)] bg-[var(--color-mini-card)] px-3 py-2.5 text-sm font-medium text-[var(--color-text-main)]"><FaGithub aria-hidden="true" className="text-base" />GitHub</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-700 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-800"><FaYoutube aria-hidden="true" className="text-base" />Demo</a>
              )}
              {project.deployment && (
                <a href={project.deployment} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
                  style={{ backgroundColor: project.color, color: getReadableTextColor(project.color) }}><FaGlobe aria-hidden="true" className="text-base" />Deployed</a>
              )}
            </div>
          )}
            <dl className="mt-3 grid grid-cols-2 border-y border-[rgba(81,86,94,0.3)]">
              <div className="border-r border-[rgba(81,86,94,0.3)] py-3 pr-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-main)]">Type</dt>
                <dd className="mt-1 text-sm font-medium capitalize text-[var(--color-text-main)]">{project.projectType || "—"}</dd>
              </div>
              <div className="py-3 pl-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-main)]">Status</dt>
                <dd className="mt-1 text-sm font-medium capitalize text-[var(--color-text-main)]">{project.status || "—"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="group relative h-[280px] min-h-[220px] overflow-hidden border border-[rgba(81,86,94,0.3)] bg-[var(--color-mini-card)] sm:h-[360px] md:col-start-2 md:row-start-1 md:h-[420px] 2xl:h-auto 2xl:min-h-0">
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

        <section className="min-h-0 border border-[rgba(81,86,94,0.3)] bg-[var(--color-card)] p-4 md:col-start-2 md:row-start-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">Details</p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-main)]">
            {project.projectContext || project.description}
          </p>
          {project.myContributions && (
            <div className="mt-3 border-t border-[rgba(81,86,94,0.3)] pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">My contributions</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-main)]">{project.myContributions}</p>
            </div>
          )}
        </section>

        <aside className="flex min-h-0 flex-col border border-[rgba(81,86,94,0.3)] bg-[var(--color-mini-card)] p-5 md:col-span-2 md:row-start-3 2xl:col-span-1 2xl:col-start-3 2xl:row-span-2 2xl:row-start-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">Other information</p>
          <div className="mt-3 flex max-h-[180px] flex-wrap content-start gap-1.5 overflow-hidden">
            {(project.techstack ?? []).map((tech) => (
              <span key={tech} className="border border-[rgba(81,86,94,0.35)] px-2 py-1 text-xs text-[var(--color-text-main)]">{tech}</span>
            ))}
          </div>

          <section className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-main)]">
              AI use: <span className="capitalize">{project.aiInvolvement || "—"}</span>
            </p>
            {project.aiDisclosure && (
              <p className="mt-2 text-justify text-xs leading-relaxed text-[var(--color-text-main)]">{project.aiDisclosure}</p>
            )}
          </section>
          {project.collaborators && Object.keys(project.collaborators).length > 0 && (
            <div className="mt-3 border-t border-[rgba(81,86,94,0.3)] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-main)]">Collaborators</p>
              <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[var(--color-text-main)]">
                {Object.entries(project.collaborators).map(([name, link]) => (
                  link ? (
                    <a key={name} href={link} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:decoration-white/70">{name}</a>
                  ) : (
                    <span key={name}>{name}</span>
                  )
                ))}
              </div>
            </div>
          )}
          {githubData?.commits && githubData.commits.length > 0 && (
            <div className="mt-auto border-t border-[rgba(81,86,94,0.3)] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-main)]">Recent commits</p>
              {githubData.commits.slice(0, 5).map((commit) => (
                <a key={commit.url} href={commit.url} target="_blank" rel="noopener noreferrer"
                  className="mt-1.5 block truncate text-xs text-[var(--color-text-main)] hover:underline">{commit.message}</a>
              ))}
            </div>
          )}
        </aside>

      {mounted && previewImage ? createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="preview" className="max-h-[85vh] max-w-[90vw] rounded-sm shadow-lg" onClick={(e) => e.stopPropagation()} />
        </div>, document.body,
      ) : null}
    </div>
  );
};

export default ProjectModal;