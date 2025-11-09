"use client";
import React, { useState, useEffect } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";

type DragListeners = { // for vercel
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};


export interface Project {
  name: string;
  description: string;
  link: string;
  images?: string[];
  color: string;
  user: string;
  repo: string;
}

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


  const baseStyles = `bg-[var(--color-mini-card)] p-2 flex flex-col gap-2 rounded-lg shadow-lg border-l-4`;

  useEffect(() => {
    if (type === "expanded") {
      setShowContent(false);
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
        }
      };

      fetchGithub();
      return () => clearTimeout(timeout);
    } else {
      setShowContent(true);
    }
  }, [type, project.user, project.name]);


  if (type === "normal") {
    return (
      <div
        ref={setNodeRef}
        {...(attributes || {})}
        {...(listeners || {})}
        className={`${baseStyles} flex-1 ${className || ""}`}
        style={{ borderLeftColor: project.color }}
      >
        <div className="bg-[var(--color-card-bg)] h-[105px] p-3 rounded-lg flex flex-col">
          <p className="text-sm font-medium text-[var(--color-primary)] truncate">{project.name}</p>
          <p className="text-xs text-[var(--color-text-subtle)] mt-1 line-clamp-2">{project.description}</p>
          <p className="text-[10px] text-[var(--color-text-subtle)] mt-1 italic">React, Django</p>
          {/* <p className="text-[10px] text-[var(--color-text-subtle)] mt-1 italic">{project.techstack.join(", ")}</p> */}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`${baseStyles} w-full h-full ${className || ""}`}
      style={{ borderLeftColor: project.color }}
    >
      <div
        className={`bg-[var(--color-card-bg)] p-4 rounded-lg flex flex-col gap-3 h-full transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 text-left">
            <h2 className="text-lg font-bold text-[var(--color-primary)]">{project.name}</h2>
          </div>

          <div
            {...attributes}
            {...listeners}
            className="flex-1 flex justify-center cursor-grab active:cursor-grabbing px-2 py-1 rounded text-[var(--color-text-subtle)]"
          >
            ⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿
          </div>
          <div className="flex-1 text-right">Last Updated</div>
        </div>

        <div className="w-full h-full flex">
          <div className="flex flex-1 flex-col h-full justify-between pr-4 border-r" style={{ borderColor: "rgba(81, 86, 94, 0.3)" }}>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-text-subtle)]">
              {/* GitHub link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                {project.name}
              </a>
              <div className="relative min-h-[200px]">
                {!githubData && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md z-10">
                    <img
                      src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
                      alt="Loading..."
                      className="w-8 h-8"
                    />
                  </div>
                )}

                {githubData && (
                  <div className="flex flex-col gap-2 text-sm text-[var(--color-text-subtle)]">
                    {/* Collaborators */}
                    {githubData.collaborators?.length > 0 && (
                      <div>
                        <span className="font-semibold">Collaborators:</span>{" "}
                        {githubData.collaborators.map((c: any) => (
                          <a
                            key={c.login}
                            href={c.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            <img
                              src={c.avatar_url}
                              alt={c.login}
                              className="inline-block w-5 h-5 rounded-full mr-1"
                            />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Languages */}
                    {githubData.languages && (
                      <div>
                        <span className="font-semibold">Languages:</span>{" "}
                        {Object.keys(githubData.languages).join(", ")}
                      </div>
                    )}

                    {/* Last Updated */}
                    {githubData.repo?.updatedAt && (
                      <div>
                        <span className="font-semibold">Last Updated:</span>{" "}
                        {new Date(githubData.repo.updatedAt).toLocaleDateString()}
                      </div>
                    )}

                    {/* Commits */}
                    {githubData.commits?.length > 0 && (
                      <div className="flex h-[200px] overflow-y-auto scrollbar-hide">
                        <span className="font-semibold">Recent Commits:</span>
                        <ul className="list-disc ml-5">
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
                              <span className="italic text-xs">
                                ({c.author}, {new Date(c.date).toLocaleDateString()})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            <div className="flex overflow-y-auto scrollbar-hide">
              <p className="text-sm text-[var(--color-text-subtle)] h-[90%] overflow-y-auto scrollbar-hide">{project.description}</p>
            </div>
            <p className="text-xs text-[var(--color-text-subtle)] italic">
              Tech Stack: React, Django
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
