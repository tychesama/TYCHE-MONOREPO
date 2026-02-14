"use client";
import React, { useState, useEffect } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { Project } from "../../types/project";

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
          const data = await res.json();
          console.log("GitHub data:", data);
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
              className="text-lg font-bold text-[var(--color-text-main)] leading-[1.2] hover:underline"
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
            <div className="flex flex-col w-[270px] gap-2 text-sm text-[var(--color-text-subtle)]">
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
                    <div className="w-full h-[120px] flex flex-col overflow-y-auto scrollbar-hide gap-2">
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

            {/* keep this (or remove if you feel redundant now) */}
            <p className="text-[12px] text-[var(--color-text-subtle)] mt-1 italic">
              Tech Stack: {project.techstack?.join(", ") ?? "—"}
            </p>
          </div>

          <div className="flex pl-7 bg-[var(--color-mini-card)] rounded-md w-[600px] h-full items-center justify-center">
            <img
              src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=2048x2048&w=is&k=20&c=Xa_wH_pZFMWNX8EPtufv9KSvS1OzUPus7C0Br2ZIMDg="
              alt="Yui"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
