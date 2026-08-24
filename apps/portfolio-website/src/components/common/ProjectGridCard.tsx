"use client";

import React from "react";
import type { Project } from "../../types/project";

interface ProjectGridCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ project, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex aspect-[1279/1280] min-h-[210px] flex-col overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--color-mini-card)] p-4 text-left shadow-sm transition-[border-color,background-color,transform,opacity] hover:border-[rgba(255,255,255,0.18)] hover:bg-[var(--color-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${className}`}
  >
    <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: project.color }} />
    <div className="flex items-center gap-3 pt-1">
      <span
        className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-black/10 text-xl font-bold"
        style={{ color: project.color }}
      >
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
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold leading-tight text-[var(--color-text-main)]">{project.name}</h3>
        <span className="mt-1 block truncate text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
          {project.projectType?.split(",")[0] || "Project"}
        </span>
      </div>
    </div>
    <p className="mt-4 line-clamp-3 text-xs leading-5 text-[var(--color-text-main)]">{project.description}</p>
    <div className="mt-auto border-t border-white/[0.07] pt-3">
      <div className="mb-2 flex items-center justify-between gap-2 text-[10px] uppercase tracking-wide text-[var(--color-text-subtle)]">
        <span className="truncate">{project.status || "Status unavailable"}</span>
        <span>{project.deployment ? "Deployed" : "Repository"}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.techstack?.slice(0, 3).map((tech) => (
          <span key={tech} className="max-w-[100px] truncate rounded-full border border-white/10 bg-black/10 px-2 py-1 text-[10px] text-[var(--color-text-main)]">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </button>
);

export default ProjectGridCard;
