import React from 'react';
import Hero from './components/sections/HeroSection';
import Highlight from './components/sections/HighlightSection';
import Activity from './components/sections/ActivitySection';
import Projects from './components/sections/ProjectSection';
import Skills from './components/sections/SkillsSection';
import Experience from './components/sections/ExperienceSection';
import Certifications from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';
import Education from './components/sections/EducationSection';
import data from './data.json';
import './styles.css';
import '../../../shared/ui/globals.css';
import Header from '../../../shared/ui/Header';
import Footer from '@shared/ui/Footer';
import PatternGrid from "./PatternGrid";
import type { Certification } from './types/certification';
import type { Project } from './types/project';

function normalizeCollaborators(
  collaborators: Record<string, string | undefined>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(collaborators).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  );
}

const projects: Project[] = data.projects.map((project) => ({
  ...project,
  collaborators: normalizeCollaborators(project.collaborators),
}));

const MainPage: React.FC = () => {
  const sections = [
    { id: 'profile', title: '', content: <Hero />, className: 'lg:col-span-3 lg:row-span-3' },
    { id: 'highlight', title: 'Highlight', content: <Highlight />, className: 'lg:col-span-1 lg:row-span-1' },
    { id: 'Activity', title: 'Activity', content: <Activity />, className: 'lg:col-span-1 lg:row-span-2' },
    { id: 'projects', title: 'Projects', content: <Projects projects={projects} />, className: 'lg:col-span-4 lg:row-span-3' },
    { id: 'skills', title: 'Skills', content: <Skills skills={data.skills} />, className: 'lg:col-span-3 lg:row-span-3' },
    { id: 'experience', title: 'Work Experience', content: <Experience experiences={data.experience} />, className: 'lg:col-span-1 lg:row-span-3' },
    { id: 'certifications', title: 'Certifications & Involvement', content: <Certifications certifications={data.certifications as Certification[]} />, className: 'lg:col-span-2 lg:row-span-1' },
    { id: 'education', title: 'Education', content: <Education />, className: 'lg:col-span-2 lg:row-span-3' },
    { id: 'contact', title: 'Contact Me', content: <ContactSection />, className: 'lg:col-span-2 lg:row-span-2' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="joemidpan.com" />

      <PatternGrid>
        {sections.map(({ id, title, content, className }) => {
          const isFlushSection = id === 'education' || id === 'contact';

          return (
          <section
            key={id}
            id={id}
            data-pattern-card
            className={`relative overflow-visible rounded-lg bg-transparent shadow transition transform sm:hover:scale-[1.01] ${isFlushSection ? 'p-0' : 'p-4'} ${className}`}
          >
            <div className="absolute inset-0 z-[0] bg-[var(--card-bg)] rounded-lg" />

            <div
              className="absolute inset-0 z-[1] opacity-20 bg-no-repeat rounded-lg"
              style={{
                backgroundImage: "var(--pattern-bg)",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                backgroundPosition: "var(--bg-x) var(--bg-y)",
              }}
            />

            <div className="absolute inset-0 z-[2] bg-[var(--card-bg)]/20 pointer-events-none rounded-lg" />

            <div className={`relative z-[3] flex h-full flex-col ${isFlushSection ? '' : ''}`}>
              {title && (
                <h2 className={`text-lg font-bold text-secondary ${isFlushSection ? 'px-4 pt-4' : ''}`}>{title}</h2>
              )}
              <div className={`text-sm text-[var(--color-text-subtle)] ${isFlushSection ? 'min-h-0 flex-1' : ''}`}>{content}</div>
            </div>
          </section>
        );
        })}
      </PatternGrid>

      <Footer />
    </div>
  );
};

export default MainPage;