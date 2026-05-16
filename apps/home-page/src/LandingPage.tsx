import React, { useState } from 'react';
import Header from '@shared/ui/Header';
import portfolioData from '../../portfolio-website/src/data.json';

type Project = {
  name: string;
  description: string;
  deployment?: string;
  techstack?: string[];
};

const deployedProjects = (portfolioData.projects as Project[])
  .filter((project) => Boolean(project.deployment))
  .map((project) => ({
    name: project.name,
    description: project.description,
    href: project.deployment as string,
    tag: project.techstack?.[0] ?? 'Project',
  }));

const fillerProjects = Array.from({ length: 7 }, (_, index) => ({
  name: `Project Slot ${index + 1}`,
  description: 'Reserved for an upcoming deployed project. Add a deployment link in data.json when it is ready.',
  tag: 'Soon',
}));

const LandingPage: React.FC = () => {
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col overflow-hidden"
      style={{ background: 'var(--page-bg)', color: 'var(--color-text-main)' }}
    >
      <Header title="joemidpan.com" />

      <main className="relative z-10 flex-1 overflow-hidden px-4 py-10 md:px-8">
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
            className="flex max-h-[calc(100vh-180px)] w-1/2 shrink-0 items-start justify-center overflow-y-auto px-2 py-2 scrollbar-hide"
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

              <div className="grid gap-4 md:grid-cols-3">
                {deployedProjects.map((project, index) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group min-h-56 rounded-lg border border-white/10 bg-[var(--color-card)]/90 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[var(--button-bg)] hover:bg-[var(--color-card)]"
                    style={{ transitionDelay: projectsOpen ? `${index * 80}ms` : '0ms' }}
                  >
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                        {project.tag}
                      </span>
                      <span className="text-sm text-[var(--button-bg)] transition group-hover:translate-x-1">
                        Open
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold text-[var(--color-text-main)]">
                      {project.name}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-text-subtle)]">
                      {project.description}
                    </p>
                  </a>
                ))}
                {fillerProjects.map((project, index) => (
                  <div
                    key={project.name}
                    className="min-h-56 rounded-lg border border-dashed border-white/10 bg-[var(--color-card)]/50 p-5 opacity-75 shadow-xl shadow-black/10 transition duration-300 hover:border-white/20"
                    style={{ transitionDelay: projectsOpen ? `${(deployedProjects.length + index) * 80}ms` : '0ms' }}
                  >
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                        {project.tag}
                      </span>
                      <span className="text-sm text-[var(--color-text-subtle)]">
                        Filler
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold text-[var(--color-text-main)]">
                      {project.name}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-text-subtle)]">
                      {project.description}
                    </p>
                  </div>
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
