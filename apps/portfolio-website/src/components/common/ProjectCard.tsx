"use client";
import React, { useState, useEffect } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { Project } from "../../types/project";
import { createPortal } from "react-dom";

type DragListeners = { // for vercel
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};


interface ProjectCardProps {
  project: Project;
  className?: string;
  type?: "normal" | "expanded";
  attributes?: DraggableAttributes;
  listeners?: DragListeners;
  setNodeRef?: (node: HTMLElement | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, type = "normal", attributes,
  listeners,
  setNodeRef, }) => {
  const [showContent, setShowContent] = useState(false);
  const [githubData, setGithubData] = useState<null | any>(null);
  const [loading, setLoading] = useState(type === "expanded");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);

  const images = project.images ?? [];
  const hasImages = images.length > 0;

  useEffect(() => {
    setImgIndex(0);
  }, [project.name]);

  useEffect(() => {
    if (!hasImages) return;

    setImgLoading(true);

    // preload current
    const cur = new Image();
    cur.src = images[imgIndex];
    cur.onload = () => setImgLoading(false);
    cur.onerror = () => setImgLoading(false);

    // preload neighbors (helps a lot)
    if (images.length > 1) {
      const prev = new Image();
      prev.src = images[(imgIndex - 1 + images.length) % images.length];

      const next = new Image();
      next.src = images[(imgIndex + 1) % images.length];
    }
  }, [imgIndex, hasImages, images]);


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const prevImg = () => {
    if (!hasImages) return;
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImg = () => {
    if (!hasImages) return;
    setImgIndex((i) => (i + 1) % images.length);
  };

  const baseStyles = `bg-[var(--color-mini-card)] p-2 flex flex-col gap-2 rounded-lg shadow-lg border-l-4`;

  useEffect(() => {
    if (type === "expanded") {
      setShowContent(false);
      setLoading(true);

      const timeout = setTimeout(() => setShowContent(true), 300);

      // fetch live github data
      const fetchGithub = async () => {
        try {
          const url = `/api/github/${project.user}/${project.repo}`;
          const res = await fetch(url);

          const contentType = res.headers.get("content-type") || "";
          if (!res.ok) {
            const text = await res.text();
            console.error("GitHub API error:", res.status, text);
            return;
          }

          if (!contentType.includes("application/json")) {
            const text = await res.text();
            console.error("Expected JSON but got:", contentType, text.slice(0, 200));
            return;
          }

          const data = await res.json();
          setGithubData(data);
        } catch (e) {
          console.error("GitHub fetch failed", e);
        } finally {
          setTimeout(() => setLoading(false), 100);
        }
      };


      fetchGithub();
      return () => clearTimeout(timeout);
    } else {
      setShowContent(true);
      setLoading(false);
    }
  }, [type, project.user, project.name]);


  if (type === "normal") {
    return (
      <div
        ref={setNodeRef}
        {...(attributes || {})}
        {...(listeners || {})}
        className={`${baseStyles} flex-1 cursor-grab active:cursor-grabbing ${className || ""}`}
        style={{ borderLeftColor: project.color }}
      >
        <div className="bg-[var(--color-card-bg)] h-[105px] p-3 rounded-lg flex flex-col">
          <p className="text-sm font-medium text-[var(--color-text-main)] truncate">{project.name}</p>
          <p className="text-xs text-[var(--color-text-subtle)] mt-1 line-clamp-2">{project.description}</p>
          <p className="text-[10px] text-[var(--color-text-subtle)] mt-1 italic truncate">{project.techstack?.join(", ") ?? "—"}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`${baseStyles} w-full h-full relative ${className || ""}`}
      style={{ borderLeftColor: project.color }}
    >
      {loading && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center bg-black/80 rounded-lg transition-opacity duration-500 ease-out ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <img
            src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
            alt="Loading..."
            className="w-8 h-8"
          />
        </div>
      )}

      <div
        className={`bg-[var(--color-card-bg)] p-4 rounded-lg flex flex-col gap-3 h-full transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="flex justify-between items-center w-full h-[43px]">
          <div className="flex-1 text-left h-[44] flex items-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-[var(--color-text-main)] leading-[1.2] hover:underline"
            >
              {project.name}
            </a>
          </div>

          <div
            {...attributes}
            {...listeners}
            className="flex-1 flex justify-center cursor-grab active:cursor-grabbing px-2 py-1 rounded text-[var(--color-text-subtle)] leading-[1.2]"
          >
            ⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿
          </div>

          <div className="flex-1 text-right">
            {githubData?.repo?.updatedAt && (
              <div>
                <span className="font-semibold">Last Updated:</span>{" "}
                {new Date(githubData?.repo?.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-full flex">
          <div
            className="flex flex-1 flex-col h-full justify-between pr-4 border-r"
            style={{ borderColor: "rgba(81, 86, 94, 0.3)" }}
          >
            <div className="flex flex-col w-[270px] gap-2 text-sm text-[var(--color-text-subtle)] h-full">
              <div className="relative min-h-[200px]">
                <div className="flex flex-col gap-3 text-sm">
                  {/* Description Here */}
                  <div className="flex flex-col gap-1 mt-[4px]">
                    <span className="font-semibold text-[var(--color-text-main)]">Description:</span>
                    <div className="max-h-[90px] overflow-y-auto scrollbar-hide">
                      <p className="text-sm text-[var(--color-text-subtle)]">{project.description}</p>
                    </div>
                  </div>

                  {/* separator here */}
                  <div className="h-px w-full bg-[rgba(81,86,94,0.3)]" />

                  <p className="font-semibold text-[var(--color-text-main)]">Recent Commits:</p>
                  {githubData?.commits?.length > 0 ? (
                    <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide">
                      <ul className="list-disc ml-5 flex flex-col gap-1">
                        {githubData.commits.map((c: any, i: number) => (
                          <li key={i}>
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {c.message}
                            </a>{" "}
                            <span className="italic text-xs text-[var(--color-text-subtle)]">
                              ({c.author}, {new Date(c.date).toLocaleDateString()})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--color-text-subtle)] italic">No recent commits found.</p>
                  )}

                  <div className="flex flex-col gap-1">
                    {project.collaborators &&
                      Object.keys(project.collaborators).length > 0 && (
                        <>
                          <div className="h-px w-full bg-[rgba(81,86,94,0.3)]" />

                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[var(--color-text-main)] mt-[8px]">
                              Collaborators:
                            </span>

                            <div className="text-[var(--color-text-subtle)]">
                              {Object.entries(project.collaborators).map(([name, url], index, arr) => (
                                <span key={name}>
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                  >
                                    {name}
                                  </a>
                                  {index < arr.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {(project.deployment || project.documentation) && (
                <div className="flex gap-2 w-full mt-1">
                  {project.deployment && (
                    <a
                      href={project.deployment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-500 hover:bg-blue-600
                   text-white text-sm font-medium py-4 rounded-md transition"
                    >
                      Deployment
                    </a>
                  )}
                  {project.documentation && (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-green-500 hover:bg-green-600
                   text-white text-sm font-medium py-4 rounded-md transition"
                    >
                      Documentation
                    </a>
                  )}
                </div>
              )}

              <p className="text-[12px] text-[var(--color-text-subtle)] mt-3 italic">
                Tech Stack: {project.techstack?.join(", ") ?? "—"}
              </p>
            </div>
          </div>

          <div className="group flex pl-4 bg-[var(--color-mini-card)] h-[390px] w-[600px] items-center justify-center relative overflow-hidden">
            {hasImages ? (
              <>
                <img
                  src={images[imgIndex]}
                  alt={`${project.name} preview ${imgIndex + 1}`}
                  className={`w-full h-full object-cover rounded-md ${imgLoading ? "opacity-40" : "opacity-100"}`}
                  draggable={false}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                />
                {imgLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                    <img
                      src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
                      alt="Loading..."
                      className="w-8 h-8"
                    />
                  </div>
                )}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={prevImg}
                    className="ml-[16px] absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 text-white text-3xl bg-gradient-to-r from-black/50 to-transparent opacity-0 hover:opacity-100 transition"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setPreviewImage(images[imgIndex])}
                  className={`absolute top-0 h-full ${images.length > 1 ? "left-1/4 w-1/2" : "left-0 w-full"} opacity-0 group-hover:opacity-100 transition`}
                  aria-label="Preview image"
                />

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImg}
                    className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 text-white text-3xl bg-gradient-to-l from-black/50 to-transparent opacity-0 hover:opacity-100 transition"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-2 right-2 z-10 text-xs text-white bg-black/40 px-2 py-1 rounded">
                    {imgIndex + 1}/{images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-text-subtle)]">
                No images
              </div>
            )}
          </div>
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
              className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )
        : null}

    </div>
  );
};

export default ProjectCard;
