"use client";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  SiCplusplus,
  SiPython,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCisco,
  SiTailwindcss,
  SiFlask,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiVite,
  SiFigma,
  SiLinux,
  SiGoogle,
  SiArduino,
} from "react-icons/si";
import {
  FaBolt,
  FaCircleQuestion,
  FaComments,
  FaDatabase,
  FaImage,
  FaListCheck,
  FaPuzzlePiece,
  FaRobot,
  FaServer,
  FaUsers,
  FaVideo,
} from "react-icons/fa6";
import ReusableModal from "@shared/ui/ReusableModal";
import ProjectGridCard from "../common/ProjectGridCard";
import ProjectModal from "../modal/ProjectModal";
import type { Project } from "../../types/project";

const ICONS: Record<string, React.ElementType> = {
  React: SiReact,
  "JavaScript / TypeScript": SiTypescript,
  "HTML/CSS / Tailwind CSS": SiTailwindcss,
  "Next.js": SiNextdotjs,
  Python: SiPython,
  Django: SiDjango,
  "Flutter / Dart": SiFlutter,
  Flask: SiFlask,
  "Databases / Supabase": FaDatabase,
  "REST APIs": FaServer,
  "Testing & Debugging": FaPuzzlePiece,
  "System Design": FaPuzzlePiece,
  "ML / Object Detection": FaRobot,
  Java: FaPuzzlePiece,
  "C++": SiCplusplus,
  "Arduino & Circuitry": SiArduino,
  CCNA: SiCisco,
  "Git / GitHub": SiGit,
  "Linux & CLI": SiLinux,
  "VS Code": FaPuzzlePiece,
  "AI Coding Tools": FaRobot,
  "Node.js": SiNodedotjs,
  Vite: SiVite,
  "Google Workspace": SiGoogle,
  "Bubble.io": FaPuzzlePiece,
  Figma: SiFigma,
  "Adobe Photoshop": FaImage,
  "Adobe Premiere": FaVideo,
  "Project Planning": FaListCheck,
  "Problem-Solving": FaPuzzlePiece,
  "Fast Learning": FaBolt,
  "System Thinking": FaPuzzlePiece,
  "Attention to Detail": FaCircleQuestion,
  Communication: FaComments,
  Teamwork: FaUsers,
};

const BRAND: Record<string, string> = {
  React: "#61DAFB",
  "JavaScript / TypeScript": "#3178C6",
  "HTML/CSS / Tailwind CSS": "#38BDF8",
  "Next.js": "#FFFFFF",
  Python: "#3776AB",
  Django: "#44B78B",
  "Flutter / Dart": "#02569B",
  Flask: "#FFFFFF",
  "Databases / Supabase": "#3ECF8E",
  "REST APIs": "#10B981",
  "Testing & Debugging": "#F59E0B",
  "System Design": "#A78BFA",
  "ML / Object Detection": "#FF6F61",
  Java: "#ED8B00",
  "C++": "#00599C",
  "Arduino & Circuitry": "#00979D",
  CCNA: "#1BA0D7",
  "Git / GitHub": "#F05032",
  "Linux & CLI": "#FCC624",
  "VS Code": "#007ACC",
  "AI Coding Tools": "#A78BFA",
  "Node.js": "#5FA04E",
  Vite: "#646CFF",
  "Google Workspace": "#4285F4",
  "Bubble.io": "#8B5CF6",
  Figma: "#F24E1E",
  "Adobe Photoshop": "#31A8FF",
  "Adobe Premiere": "#9999FF",
};

interface Skill {
  name: string;
  proficiency: string;
  description?: string;
}

interface Skills {
  technical: Skill[];
  tools: Skill[];
  softSkills: Skill[];
}

interface SkillsSectionProps {
  skills: Skills;
  projects: Project[];
}

const LEVEL_LABEL: Record<string, string> = {
  familiar: "Familiar",
  comfortable: "Comfortable",
  strong: "Strong",
};

const SkillVisual = ({ skill, size = 38 }: { skill: Skill; size?: number }) => {
  const Icon = ICONS[skill.name];
  const color = BRAND[skill.name] ?? "var(--color-text-main)";
  const pairedSize = Math.max(24, size - 8);

  if (skill.name === "JavaScript / TypeScript") {
    return <span className="flex items-center gap-2"><SiJavascript size={pairedSize} color="#F7DF1E" /><SiTypescript size={pairedSize} color="#3178C6" /></span>;
  }
  if (skill.name === "HTML/CSS / Tailwind CSS") {
    return <span className="flex items-center gap-2"><SiHtml5 size={pairedSize} color="#E34F26" /><SiTailwindcss size={pairedSize} color="#38BDF8" /></span>;
  }
  if (skill.name === "Git / GitHub") {
    return <span className="flex items-center gap-2"><SiGit size={pairedSize} color="#F05032" /><SiGithub size={pairedSize} color="#FFFFFF" /></span>;
  }
  return Icon ? <Icon size={size} color={color} /> : <span className="text-lg text-[var(--color-text-main)]">●</span>;
};

const SkillIcon = ({ skill, onClick }: { skill: Skill; onClick?: () => void }) => {
  const content = (
    <>
      <div className="flex h-10 shrink-0 items-center justify-center transition-[filter] duration-150 group-hover:brightness-110">
        <SkillVisual skill={skill} />
      </div>
      <span className="grid h-[30px] min-h-[30px] w-full shrink-0 place-items-center overflow-hidden text-[12px] leading-[15px] text-[var(--color-text-main)]">
        <span className="line-clamp-2">{skill.name}</span>
      </span>
      <span className="shrink-0 whitespace-nowrap text-[9px] uppercase leading-none tracking-wide text-[var(--color-text-subtle)]">
        {LEVEL_LABEL[skill.proficiency] ?? skill.proficiency}
      </span>
    </>
  );

  const className = "group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-1.5 text-center transition-colors duration-150";

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`${className} hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`}
      aria-label={`View ${skill.name} details`}
    >
      {content}
    </button>
  ) : (
    <div className={className}>{content}</div>
  );
};

const SKILL_PROJECT_TERMS: Record<string, string[]> = {
  React: ["react"],
  "JavaScript / TypeScript": ["javascript", "typescript"],
  "HTML/CSS / Tailwind CSS": ["html", "css", "tailwind"],
  "Next.js": ["next.js", "nextjs"],
  Python: ["python"],
  Django: ["django"],
  "Flutter / Dart": ["flutter", "dart"],
  Flask: ["flask"],
  "Databases / Supabase": ["supabase", "mysql", "postgresql", "sqlite", "sql", "database"],
  "REST APIs": ["rest api", "api route", "api integration"],
  "Testing & Debugging": ["testing", "tests", "debugging", "regression"],
  "System Design": ["system design", "architecture", "data model"],
  "ML / Object Detection": ["machine learning", "object detection", "yolo"],
  Java: ["java"],
  "C++": ["c++", "raylib"],
  "Arduino & Circuitry": ["arduino", "esp32", "circuit", "sensor"],
  CCNA: ["ccna", "networking"],
  "Git / GitHub": ["git", "github"],
  "Linux & CLI": ["linux", "cli"],
  "VS Code": ["vs code", "visual studio code"],
  "AI Coding Tools": ["ai-assisted", "ai coding", "ai-directed"],
  "Node.js": ["node.js", "nodejs"],
  Vite: ["vite"],
  "Google Workspace": ["google workspace", "google drive", "google sheets"],
  "Bubble.io": ["bubble.io", "bubble"],
  Figma: ["figma", "ui/ux"],
  "Adobe Photoshop": ["photoshop"],
  "Adobe Premiere": ["premiere", "video editing"],
};

const projectMatchesSkill = (project: Project, skillName: string) => {
  const terms = SKILL_PROJECT_TERMS[skillName] ?? [];
  if (terms.length === 0) return false;

  const searchable = [
    project.name,
    project.description,
    project.fullDescription,
    project.projectContext,
    project.myContributions,
    ...(project.techstack ?? []),
    ...(project.tags ?? []),
  ].filter(Boolean).join(" ").toLowerCase();

  return terms.some((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escapedTerm}([^a-z0-9]|$)`, "i").test(searchable);
  });
};

const chunkProjects = (projects: Project[]) => {
  const pages: Project[][] = [];
  for (let index = 0; index < projects.length; index += 3) pages.push(projects.slice(index, index + 3));
  return pages;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, projects }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectPage, setProjectPage] = useState(0);

  const groups = [
    { key: "technical", label: "Technical", skills: skills.technical },
    { key: "tools", label: "Tools", skills: skills.tools },
    { key: "softSkills", label: "Soft Skills", skills: skills.softSkills },
  ] as const;

  const correspondingProjects = selectedSkill
    ? projects.filter((project) => projectMatchesSkill(project, selectedSkill.name))
    : [];
  const projectPages = chunkProjects(correspondingProjects);

  const openSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setSelectedProject(null);
    setProjectPage(0);
  };

  return (
    <div className="flex h-[560] min-h-0 w-full -mt-9 flex-col gap-2 overflow-hidden">
      <div className="relative flex min-h-6 items-center">
        <button
          name="tooltip"
          type="button"
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
          onFocus={() => setShowHelp(true)}
          onBlur={() => setShowHelp(false)}
          className="ml-[52px] mt-[12] relative grid h-5 w-5 place-items-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.25)] transition hover:bg-[rgba(0,0,0,0.35)]"
          aria-label="Skills info"
        >
          <FaCircleQuestion className="text-[12px] text-[var(--color-text-subtle)]" />
          {showHelp && (
            <div className="absolute left-0 top-full z-50 mt-1 w-[260px] max-w-[80vw] rounded-md bg-gray-800 px-3 py-2 text-left text-sm text-gray-100 shadow-lg">
              Click a technical skill to view corresponding projects and details. Skill levels are self-assessed.
            </div>
          )}
        </button>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain rounded-xl border border-[rgba(255,255,255,0.06)] bg-[var(--color-mini-card)] p-4 scrollbar-hide">
        {groups.map((group, groupIndex) => (
          <section
            key={group.key}
            className={groupIndex === 0 ? "pb-5" : "border-t border-[rgba(255,255,255,0.10)] py-5"}
          >
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
              {group.label}
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))]">
              {group.skills.map((skill) => (
                <SkillIcon
                  key={skill.name}
                  skill={skill}
                  onClick={group.key === "technical" ? () => openSkill(skill) : undefined}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <ReusableModal
        isOpen={selectedSkill !== null && selectedProject === null}
        onClose={() => setSelectedSkill(null)}
        CloseIcon={CloseIcon}
        title={selectedSkill ? (
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 shrink-0 items-center justify-center"><SkillVisual skill={selectedSkill} size={30} /></span>
            <span className="truncate">{selectedSkill.name}</span>
          </span>
        ) : "Skill details"}
        color={selectedSkill ? BRAND[selectedSkill.name] : undefined}
      >
        {selectedSkill && (
          <div className="w-[min(900px,88vw)] space-y-5">
            <div className="grid grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-lg bg-white/[0.025]">
              <div className="border-r border-white/10 bg-white/[0.025] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">Current level</p>
                <p className="mt-1.5 text-base font-semibold text-[var(--color-text-main)]">
                  {LEVEL_LABEL[selectedSkill.proficiency] ?? selectedSkill.proficiency}
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">Description</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-main)]">
                  {selectedSkill.description || "Description coming soon."}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-main)]">Corresponding projects</p>
                  {projectPages.length > 1 && (
                    <p className="mt-1 text-[10px] text-[var(--color-text-subtle)]">{projectPage + 1} of {projectPages.length}</p>
                  )}
                </div>
                {projectPages.length > 1 && (
                  <div className="flex gap-2">
                    <button type="button" aria-label="Previous projects" onClick={() => setProjectPage((page) => (page - 1 + projectPages.length) % projectPages.length)} className="grid h-9 w-9 place-items-center rounded-sm border border-white/10 text-xl text-[var(--color-text-main)] transition-colors hover:bg-white/5">‹</button>
                    <button type="button" aria-label="Next projects" onClick={() => setProjectPage((page) => (page + 1) % projectPages.length)} className="grid h-9 w-9 place-items-center rounded-sm border border-white/10 text-xl text-[var(--color-text-main)] transition-colors hover:bg-white/5">›</button>
                  </div>
                )}
              </div>

              {projectPages.length > 0 ? (
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${projectPage * 100}%)` }}>
                    {projectPages.map((page, pageIndex) => (
                      <div key={pageIndex} className="grid w-full shrink-0 grid-cols-3 gap-3">
                        {page.map((project) => (
                          <ProjectGridCard key={project.id ?? project.name} project={project} onClick={() => setSelectedProject(project)} className="min-h-0" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-white/15 bg-white/[0.02] px-4 py-8 text-center">
                  <p className="text-sm font-medium text-[var(--color-text-main)]">Project connections coming soon</p>
                  <p className="mt-1 text-xs text-[var(--color-text-subtle)]">No corresponding project has been linked yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </ReusableModal>

      <ReusableModal
        title="Project"
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        CloseIcon={CloseIcon}
        color={selectedProject?.color}
        scrollable={true}
      >
        {selectedProject && <ProjectModal project={selectedProject} />}
      </ReusableModal>
    </div>
  );
};

export default SkillsSection;
