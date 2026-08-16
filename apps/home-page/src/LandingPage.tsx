import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import Header from '@shared/ui/Header';
import BackgroundHost from '@shared/ui/BackgroundHost';
import portfolioData from '../../portfolio-website/src/data.json';
import {
  SiDjango,
  SiFlutter,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import './landing.css';

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

const TRANSITION_DURATION_MS = 1600;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

const MY_WORKS_PROJECT_NAMES = new Set([
  "Motobai Inventory and Sales Management System",
  "Japan Attractions Appreciation",
  "Tyche Monorepo",
]);

const PINNED_PROJECT_NAMES = new Set([
  "Motobai Inventory and Sales Management System",
  "Tyche Monorepo",
]);

const techLogos = [
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Python", Icon: SiPython },
  { name: "Django", Icon: SiDjango },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Vite", Icon: SiVite },
];

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

const carouselFavicons = deployedProjects.filter(
  (project) => project.faviconUrl,
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

function LogoCarousel() {
  return (
    <div data-logo-carousel className="min-w-0 w-full max-w-full overflow-hidden lg:col-span-2">
      <div className="tech-carousel min-w-0 w-full max-w-full overflow-hidden py-3">
        <div className="tech-carousel-track flex items-center gap-7 px-4">
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {techLogos.map(({ name, Icon }) => (
                <div
                  key={`${copy}-tech-${name}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center"
                  title={name}
                  aria-label={name}
                >
                  <Icon className="h-8 w-8 text-[var(--color-text-main)]" aria-hidden="true" />
                </div>
              ))}

              {carouselFavicons.map((project) => (
                <div
                  key={`${copy}-project-${project.name}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center"
                  title={project.name}
                  aria-label={project.name}
                >
                  <img
                    src={project.faviconUrl}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const LandingPage: React.FC = () => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitioningRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishTransition = () => {
    transitioningRef.current = false;
    transitionTimerRef.current = null;
    setIsTransitioning(false);
  };

  const changeScene = (openProjects: boolean) => {
    if (transitioningRef.current || openProjects === projectsOpen) return;

    setProjectsOpen(openProjects);

    if (prefersReducedMotion) {
      finishTransition();
      return;
    }

    transitioningRef.current = true;
    setIsTransitioning(true);
    transitionTimerRef.current = setTimeout(
      finishTransition,
      TRANSITION_DURATION_MS,
    );
  };

  useEffect(() => {
    if (!prefersReducedMotion || !transitioningRef.current) return;

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitioningRef.current = false;
    transitionTimerRef.current = null;
    setIsTransitioning(false);
  }, [prefersReducedMotion]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    },
    [],
  );

  return (
    <div
      className="relative isolate flex min-h-screen w-full max-w-full flex-col overflow-x-clip overflow-y-hidden"
      style={{
        background: "var(--page-bg)",
        color: "var(--color-text-main)",
      }}
    >
      <div
        data-background-world
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-0 w-[200vw] transition-transform duration-[1600ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={{
          transform: projectsOpen
            ? 'translate3d(-82vw, 0, 0)'
            : 'translate3d(0, 0, 0)',
          transitionDuration: prefersReducedMotion ? "0ms" : undefined,
        }}
      >
        <BackgroundHost />
      </div>

      <div className="relative z-30">
        <Header title="joemidpan.com" />
      </div>

      <main className="relative z-20 min-w-0 flex-1 overflow-hidden">
        <div
          className="relative flex min-h-[calc(100vh-60px)] w-[200vw] transition-transform duration-[1600ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
          style={{
            transform: projectsOpen
              ? 'translate3d(-100vw, 0, 0)'
              : 'translate3d(0, 0, 0)',
            transitionDuration: prefersReducedMotion ? "0ms" : undefined,
          }}
        >
          <section
            data-mobile-landing
            className="flex h-[calc(100dvh-60px)] w-screen shrink-0 items-start overflow-y-auto px-4 py-5 text-left sm:items-center sm:px-6 sm:py-8 md:px-10 lg:px-16"
            inert={projectsOpen}
            aria-hidden={projectsOpen}
          >
            <div
              data-landing-hero
              className="mx-auto grid min-w-0 w-full max-w-7xl gap-7 overflow-hidden py-2 sm:gap-10 sm:py-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.7fr)] lg:items-center lg:gap-16"
            >
              <div>
                <div className="mb-4 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--button-bg)] sm:mb-6 sm:text-xs sm:tracking-[0.24em]">
                  <span className="h-px w-10 bg-[var(--button-bg)]" aria-hidden="true" />
                  Joem Idpan · Developer
                </div>

                <h1 className="max-w-4xl text-[clamp(2.75rem,12vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                  I build useful systems
                  <span className="block text-[var(--button-bg)]">
                    and software people can actually use.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--color-text-subtle)] sm:mt-7 sm:text-base sm:leading-7 md:text-lg">
                  Backend-focused developer working across web apps, tools, games, and visual experiments. This site is where I release what I build and document what I learn.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-subtle)] sm:mt-8 sm:flex sm:grid-cols-none sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:pt-5 sm:text-xs sm:tracking-[0.13em]">
                  <span>{deployedProjects.length} live releases</span>
                  <span>Backend focused</span>
                  <span>React · Django · TypeScript</span>
                </div>
              </div>

              <aside className="lg:border-l lg:border-white/15 lg:pl-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">
                  Start here
                </p>

                <nav aria-label="Primary destinations" className="border-b border-white/15">
                  <button
                    type="button"
                    onClick={() => changeScene(true)}
                    disabled={isTransitioning}
                    className="group flex w-full items-center gap-4 border-t border-white/15 py-4 text-left transition-colors hover:text-[var(--button-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-bg)] disabled:cursor-wait disabled:opacity-50 sm:py-5"
                    aria-controls="deployed-projects"
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-subtle)]">01</span>
                    <span className="flex-1 text-lg font-semibold sm:text-xl">Explore My Work</span>
                    <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
                  </button>

                  <a
                    href={import.meta.env.DEV ? 'http://localhost:3000' : 'https://portfolio.joemidpan.com'}
                    className="group flex items-center gap-4 border-t border-white/15 py-4 transition-colors hover:text-[var(--button-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-bg)] sm:py-5"
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-subtle)]">02</span>
                    <span className="flex-1 text-lg font-semibold sm:text-xl">View Portfolio</span>
                    <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>
                  </a>

                  <a
                    href={import.meta.env.DEV ? 'http://localhost:3001' : 'https://blog.joemidpan.com'}
                    className="group flex items-center gap-4 border-t border-white/15 py-4 transition-colors hover:text-[var(--button-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-bg)] sm:py-5"
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-subtle)]">03</span>
                    <span className="flex-1 text-lg font-semibold sm:text-xl">Read the blog</span>
                    <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </nav>

                <p className="mt-5 hidden max-w-sm text-sm leading-6 text-[var(--color-text-subtle)] sm:block">
                  A growing archive of shipped projects, technical experiments, and things I learned by building them.
                </p>
              </aside>

              <LogoCarousel />
            </div>
          </section>

          <section
            id="deployed-projects"
            className="relative z-30 isolate flex h-[calc(100dvh-60px)] w-screen shrink-0 items-start justify-center overflow-y-auto px-4 py-6 scrollbar-hide sm:py-10 md:px-8"
            aria-hidden={!projectsOpen}
            inert={!projectsOpen}
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
                  onClick={() => changeScene(false)}
                  disabled={isTransitioning}
                  className="w-fit rounded border border-white/15 px-5 py-2 text-sm font-medium text-[var(--color-text-main)] transition hover:border-[var(--button-bg)] hover:text-[var(--button-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] disabled:cursor-wait disabled:opacity-50"
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
