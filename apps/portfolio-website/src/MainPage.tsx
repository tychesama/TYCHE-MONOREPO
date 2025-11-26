import React from 'react';
import Profile from './components/sections/ProfileSection';
import Highlight from './components/sections/HighlightSection';
import Activity from './components/sections/ActivitySection';
import Projects from './components/sections/ProjectSection';
import Skills from './components/sections/SkillsSection';
import Experience from './components/sections/ExperienceSection';
import Certifications from './components/sections/CertificationsSection';
import Education from './components/sections/EducationSection';
import data from './data.json'; 

const MainPage: React.FC = () => {
  const sections = [
    { id: 'profile', title: '', content: <Profile profile={data.profile} />, className: 'col-span-3 row-span-3'},
    { id: 'highlight', title: 'Highlight', content: <Highlight />, className: 'col-span-1 row-span-1' },
    { id: 'Activity', title: 'Activity', content: <Activity />, className: 'col-span-1 row-span-2' },
    { id: 'projects', title: 'Projects', content: <Projects projects={data.projects} />, className: 'col-span-4 row-span-3' },
    { id: 'skills', title: 'Skills', content: <Skills skills={data.skills}/>, className: 'col-span-3 row-span-3' },
    { id: 'experience', title: 'Job Experience', content: <Experience experiences={data.experience} />, className: 'col-span-1 row-span-3' },
    { id: 'certifications', title: 'Certifications', content: <Certifications certifications={data.certifications} />, className: 'col-span-4 row-span-1'},
    { id: 'funfacts', title: 'Fun Facts', content: 'Email, socials, or resume download.', className: 'col-span-1 row-span-2' },
    { id: 'techstack', title: 'Extra', content: 'Email, socials, or resume download.', className: 'col-span-3 row-span-2' },
    { id: 'education', title: 'Education', content: <Education />, className: 'col-span-2 row-span-2' },
    { id: 'random', title: 'Random', content: "<Education />", className: 'col-span-1 row-span-2' },
    { id: 'random2', title: 'Random', content: "<Education />", className: 'col-span-1 row-span-2' },
  ];

  return (
    <div className="page-surface [background:var(--page-bg)] text-[var(--color-text-main)] min-h-screen transition-colors">
      <header className="bg-[var(--color-card)] shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Tyche01</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#profile" className="hover:text-primary">Resume</a>
            <a href="#projects" className="hover:text-primary">Projects</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 auto-rows-[180px] gap-6">
        {sections.map(({ id, title, content, className }) => (
          <section
            key={id}
            id={id}
            className={`card [background:var(--card-bg)] rounded shadow p-4 transition transform hover:scale-[1.01] z-10 hover:z-10 ${className}`}
          >
            <h2 className="text-lg font-bold text-secondary mb-2">{title}</h2>
            <span className="text-sm text-[var(--color-text-subtle)]">{content}</span>
          </section>
        ))}
      </main>

      <footer className="bg-[var(--color-card)] text-center py-4 mt-12 transition-colors">
        <p className="text-sm text-[var(--color-text-subtle)]">© {new Date().getFullYear()} Joem. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
