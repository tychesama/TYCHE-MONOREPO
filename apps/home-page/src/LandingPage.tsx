import React, { useState, type CSSProperties } from 'react';
import Header from '@shared/ui/Header';
import BackgroundHost from '@shared/ui/BackgroundHost';
import portfolioData from '../../portfolio-website/src/data.json';

type Project = {
  name: string;
  description: string;
  deployment?: string;
  link?: string;
  documentation?: string;
  techstack?: string[];
  tags?: string[];
  collaborators?: Record<string, string | undefined>;
  favorite?: boolean;
  color?: string;
  favicon?: string | null;
};

const MY_WORKS_PROJECT_NAMES = new Set([
  "Motobai Inventory and Sales Management System",
  "Japan Attractions Appreciation",
  "Tyche Monorepo",
]);

const PINNED_PROJECT_NAMES = new Set([
  "Motobai Inventory and Sales Management System",
  "Tyche Monorepo",
]);

const faviconAssets = import.meta.glob(
  [
    "../../../shared/ui/favicons/*.svg",
    "../../../shared/ui/favicons/*.png",
    "../../../shared/ui/favicons/*.jpg",
    "../../../shared/ui/favicons/*.jpeg",
    "../../../shared/ui/favicons/*.webp",
    "../../../shared/ui/favicons/*.ico",
  ],
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

function resolveFavicon(path?: string | null): string | undefined {
  if (!path) return undefined;

  const normalizedPath = path.replace(/^\/+/, "");

  return faviconAssets[`../../../${normalizedPath}`];
}

function getDeploymentLabel(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

const deployedProjects = (portfolioData.projects as Project[])
  .filter(
    (project): project is Project & { deployment: string } =>
      Boolean(project.deployment),
  )
  .map((project, sourceIndex) => ({
    name: project.name,
    description: project.description,
    href: project.deployment,
    sourceUrl: project.link,
    documentationUrl: project.documentation,
    deploymentLabel: getDeploymentLabel(project.deployment),
    techstack: project.techstack ?? [],
    projectType:
      project.tags
        ?.find((tag) => tag.startsWith("type:"))
        ?.replace("type:", "") ?? "project",
    collaboratorCount: Object.keys(project.collaborators ?? {}).length,
    favorite: project.favorite ?? false,
    pinned: PINNED_PROJECT_NAMES.has(project.name),
    color: project.color ?? "#8B5CF6",
    faviconUrl: resolveFavicon(project.favicon),
    sourceIndex,
  }))
  .sort(
    (first, second) =>
      Number(second.pinned) - Number(first.pinned) ||
      Number(second.favorite) - Number(first.favorite) ||
      first.sourceIndex - second.sourceIndex,
  );

const myWorks = deployedProjects.filter((project) =>
  MY_WORKS_PROJECT_NAMES.has(project.name),
);

const aiGeneratedWorks = deployedProjects.filter(
  (project) => !MY_WORKS_PROJECT_NAMES.has(project.name),
);

type DeployedProject = (typeof deployedProjects)[number];

function ProjectCard({ project }: { project: DeployedProject }) {
  const visibleTech = project.techstack.slice(0, 3);
  const extraTechCount = Math.max(0, project.techstack.length - visibleTech.length);
  const teamLabel =
    project.collaboratorCount > 0
      ? `Team of ${project.collaboratorCount + 1}`
      : "Solo project";

  return (
    <article
      className="group relative z-10 flex min-h-[20rem] flex-col overflow-hidden rounded-xl border border-white/10 p-5 shadow-sm shadow-black/20 transition-colors duration-200 hover:border-white/25"
      style={
        {
          "--project-accent": project.color,
          backgroundColor: "var(--color-card)",
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: project.color }}
      />

      <div className="mb-4 flex items-start gap-4 pt-1">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-black/20">
          {project.faviconUrl ? (
            <img src={project.faviconUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-black" style={{ color: project.color }}>
              {project.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em]">
            <span className="text-[var(--color-text-subtle)]">{project.projectType}</span>
            {project.pinned && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[var(--color-text-main)]">
                📌 Pinned
              </span>
            )}
            {project.favorite && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5" style={{ color: project.color }}>
                ★ Favorite
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold leading-tight text-[var(--color-text-main)]">
            {project.name}
          </h3>
          <p className="mt-1 truncate text-xs text-[var(--color-text-subtle)]">
            {project.deploymentLabel}
          </p>
        </div>
      </div>

      <p className="line-clamp-4 text-sm leading-6 text-[var(--color-text-subtle)]">
        {project.description || "Project details will be added soon."}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[0.68rem] font-medium text-[var(--color-text-main)]"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="rounded-full border border-dashed border-white/20 px-2.5 py-1 text-[0.68rem] text-[var(--color-text-subtle)]">
              +{extraTechCount}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <span className="text-xs text-[var(--color-text-subtle)]">{teamLabel}</span>
          <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-bold">
            {project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text-main)]">
                Code ↗
              </a>
            )}
            {project.documentationUrl && (
              <a href={project.documentationUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text-main)]">
                Demo ↗
              </a>
            )}
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-1.5 text-white transition-opacity hover:opacity-85" style={{ backgroundColor: project.color }}>
              Visit ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

const LandingPage: React.FC = () => {
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <div
      className="relative isolate flex min-h-screen flex-col overflow-hidden"
      style={{
        background: "var(--page-bg)",
        color: "var(--color-text-main)",
      }}
    >
      <div
        data-background-world
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-0 w-[300vw] transition-transform duration-[2600ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={{
          transform: projectsOpen
            ? 'translate3d(-165vw, 0, 0)'
            : 'translate3d(0, 0, 0)',
        }}
      >
        <BackgroundHost />
      </div>

      <div className="relative z-30">
        <Header title="joemidpan.com" />
      </div>

      <main className="relative z-20 flex-1 overflow-hidden">
        <div
          className="relative flex min-h-[calc(100vh-60px)] w-[300vw] transition-transform duration-[2600ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
          style={{
            transform: projectsOpen
              ? 'translate3d(-200vw, 0, 0)'
              : 'translate3d(0, 0, 0)',
          }}
        >
          <section className="flex min-h-[calc(100dvh-60px)] w-screen shrink-0 items-center justify-center px-4 py-10 text-center md:px-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--button-bg)]">
                Personal site hub
              </p>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Welcome to joemidpan.com
              </h2>
              <p className="mb-8 text-base leading-7 text-[var(--color-text-subtle)] md:text-lg">
                I'm Joem, an aspiring backend developer. Explore my blog, portfolio, and deployed projects.
                <br />
                DISCLAIMER: This website is a work in progress.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={import.meta.env.DEV ? 'http://localhost:3000' : 'https://portfolio.joemidpan.com'}
                  className="rounded bg-[var(--button-bg)] px-5 py-2 text-white transition hover:bg-[var(--button-hover-bg)]"
                >
                  View Portfolio
                </a>
                <a
                  href={import.meta.env.DEV ? 'http://localhost:3001' : 'https://blog.joemidpan.com'}
                  className="rounded border border-white/15 px-5 py-2 text-[var(--color-text-main)] transition hover:border-[var(--button-bg)] hover:text-[var(--button-bg)]"
                >
                  Visit Blog
                </a>
                <button
                  type="button"
                  onClick={() => setProjectsOpen(true)}
                  className="rounded bg-[var(--color-card)] px-5 py-2 text-[var(--color-text-main)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--button-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
                  aria-controls="deployed-projects"
                >
                  Deployed Projects
                </button>
              </div>
            </div>
          </section>

          <div
            data-travel-space
            aria-hidden="true"
            className="w-screen shrink-0"
          />

          <section
            id="deployed-projects"
            className="relative z-30 isolate flex h-[calc(100dvh-60px)] w-screen shrink-0 items-start justify-center overflow-y-auto px-4 py-10 scrollbar-hide md:px-8"
            aria-hidden={!projectsOpen}
          >
            <div className="relative z-30 w-full max-w-6xl">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--button-bg)]">
                    Releases
                  </p>
                  <h2 className="text-3xl font-bold md:text-5xl">My works</h2>
                  <p className="mt-4 max-w-2xl leading-7 text-[var(--color-text-subtle)]">
                    These are my projects that I have been working on.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProjectsOpen(false)}
                  className="w-fit rounded border border-white/15 px-5 py-2 text-sm font-medium text-[var(--color-text-main)] transition hover:border-[var(--button-bg)] hover:text-[var(--button-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
                >
                  Back
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {myWorks.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                  />
                ))}
              </div>

              <div className="mt-16 border-t border-white/10 pt-12">
                <div className="mb-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--button-bg)]">
                    Creative direction
                  </p>
                  <h2 className="text-3xl font-bold md:text-5xl">AI Generated</h2>
                  <p className="mt-4 max-w-3xl leading-7 text-[var(--color-text-subtle)]">
                    These are my AI-generated works. They show my management, planning, and creative direction rather than my coding skills.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {aiGeneratedWorks.map((project) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default LandingPage;
