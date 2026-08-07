import React, { useState, type CSSProperties } from 'react';
import Header from '@shared/ui/Header';
import portfolioData from '../../portfolio-website/src/data.json';

type Project = {
  name: string;
  description: string;
  deployment?: string;
  techstack?: string[];
  favorite?: boolean;
  color?: string;
  favicon?: string | null;
};

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
    deploymentLabel: getDeploymentLabel(project.deployment),
    tag: project.techstack?.[0] ?? "Project",
    favorite: project.favorite ?? false,
    color: project.color ?? "#8B5CF6",
    faviconUrl: resolveFavicon(project.favicon),
    sourceIndex,
  }))
  .sort(
    (first, second) =>
      Number(second.favorite) - Number(first.favorite) ||
      first.sourceIndex - second.sourceIndex,
  );

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
      <div className="relative z-30">
        <Header title="joemidpan.com" />
      </div>

      <main className="relative z-20 flex-1 overflow-hidden px-4 py-10 md:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-8 left-0 w-[160%] rounded-full border border-white/10 opacity-50 blur-[1px] transition-transform duration-700 ease-out"
          style={{ transform: projectsOpen ? 'translateX(-22%) rotate(-2deg)' : 'translateX(-6%) rotate(-2deg)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-1/4 h-32 w-[120%] rounded-full bg-[var(--button-bg)] opacity-10 blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: projectsOpen ? 'translateX(-38%)' : 'translateX(0)' }}
        />

        <div
          className="relative flex min-h-[calc(100vh-180px)] w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: projectsOpen ? 'translateX(-50%)' : 'translateX(0)' }}
        >
          <section className="flex w-1/2 shrink-0 items-center justify-center px-2 text-center">
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

          <section
            id="deployed-projects"
            className="relative z-20 flex max-h-[calc(100dvh-180px)] shrink-0 items-start justify-center overflow-y-auto px-2 py-2 scrollbar-hide"
            aria-hidden={!projectsOpen}
          >
            <div className="w-full max-w-5xl">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--button-bg)]">
                    Live links
                  </p>
                  <h2 className="text-3xl font-bold md:text-5xl">Deployed projects</h2>
                  <p className="mt-4 max-w-2xl leading-7 text-[var(--color-text-subtle)]">
                    These are pulled from the portfolio project data and only include projects with live links.
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

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {deployedProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="group relative isolate min-h-52 overflow-hidden rounded-xl border border-white/10 bg-[var(--color-card)]/95 p-5 shadow-lg shadow-black/15 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/25 hover:shadow-xl hover:shadow-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
                    style={
                      {
                        "--project-accent": project.color,
                      } as CSSProperties
                    }
                  >
                    {/* Colored top edge */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] opacity-85"
                      style={{ backgroundColor: project.color }}
                    />

                    {/* Subtle decorative color glow */}
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-200 group-hover:opacity-[0.15]"
                      style={{ backgroundColor: project.color }}
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="mb-5 flex items-start gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/15"
                          style={{
                            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${project.color} 22%, transparent)`,
                          }}
                        >
                          {project.faviconUrl ? (
                            <img
                              src={project.faviconUrl}
                              alt=""
                              className="h-8 w-8 object-contain"
                            />
                          ) : (
                            <span
                              className="text-lg font-bold"
                              style={{ color: project.color }}
                            >
                              {project.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-lg font-semibold text-[var(--color-text-main)]">
                              {project.name}
                            </h3>

                            {project.favorite && (
                              <span
                                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
                                style={{ color: project.color }}
                              >
                                ★ Favorite
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 truncate text-xs text-[var(--color-text-subtle)]">
                            {project.deploymentLabel}
                          </p>
                        </div>
                      </div>

                      <p className="line-clamp-3 flex-1 text-sm leading-6 text-[var(--color-text-subtle)]">
                        {project.description || "Project details will be added soon."}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span
                          className="max-w-[70%] truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium"
                          style={{ color: project.color }}
                        >
                          {project.tag}
                        </span>

                        <span
                          className="text-sm font-medium transition-transform duration-200 group-hover:translate-x-1"
                          style={{ color: project.color }}
                        >
                          Open ↗
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default LandingPage;
