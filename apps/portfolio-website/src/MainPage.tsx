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
import '@shared/ui/globals.css';
import Header from '@shared/ui/Header';
import Footer from '@shared/ui/Footer';
import PatternGrid from "./PatternGrid";
import type { Certification } from './types/certification';
import type { Project } from './types/project';

const MainPage: React.FC = () => {
  const sections = [
    { id: 'profile', title: '', content: <Hero />, className: 'col-span-3 row-span-3' },
    { id: 'highlight', title: 'Highlight', content: <Highlight />, className: 'col-span-1 row-span-1' },
    { id: 'Activity', title: 'Activity', content: <Activity />, className: 'col-span-1 row-span-2' },
    { id: 'projects', title: 'Projects', content: <Projects projects={data.projects as Project[]} />, className: 'col-span-4 row-span-3' },
    { id: 'skills', title: 'Skills', content: <Skills skills={data.skills} />, className: 'col-span-3 row-span-3' },
    { id: 'experience', title: 'Work Experience', content: <Experience experiences={data.experience} />, className: 'col-span-1 row-span-3' },
    { id: 'certifications', title: 'Achievements & Involvement', content: <Certifications certifications={data.certifications as Certification[]} />, className: 'col-span-4 row-span-1' },
    { id: 'education', title: 'Education', content: <Education />, className: 'col-span-2 row-span-2' },
    { id: 'contact', title: 'Contact Me', content: <ContactSection />, className: 'col-span-2 row-span-2' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="joemidpan.com" />

      <PatternGrid>
        {sections.map(({ id, title, content, className }) => (
          <section
            key={id}
            id={id}
            data-pattern-card
            className={`
              relative overflow-visible rounded-lg
              bg-transparent shadow p-4 transition transform hover:scale-[1.01]
              ${className}
            `}
          >
            <div className="absolute inset-0 z-0 bg-[var(--card-bg)] rounded-lg" />

            <div
              className="absolute inset-0 z-1 opacity-20 bg-no-repeat rounded-lg"
              style={{
                backgroundImage: "var(--pattern-bg)",
                backgroundRepeat: "repeat",
                backgroundSize: "auto", 
                backgroundPosition: "var(--bg-x) var(--bg-y)",
              }}
            />

            <div className="absolute inset-0 z-2 bg-[var(--card-bg)]/20 pointer-events-none rounded-lg" />

            <div className="relative z-3">
              <h2 className="text-lg font-bold text-secondary">{title}</h2>
              <div className="text-sm text-[var(--color-text-subtle)]">{content}</div>
            </div>
          </section>
        ))}
      </PatternGrid>
      <Footer />
    </div>
  );
};

export default MainPage;
