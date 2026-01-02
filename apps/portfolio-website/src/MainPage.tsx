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
import './styles.css';
import '@shared/ui/globals.css';
import Header from '@shared/ui/Header';
import Footer from '@shared/ui/Footer';

const MainPage: React.FC = () => {
  const sections = [
    { id: 'profile', title: '', content: <Profile profile={data.profile} />, className: 'col-span-3 row-span-3'},
    { id: 'highlight', title: 'Highlight', content: <Highlight />, className: 'col-span-1 row-span-1' },
    { id: 'Activity', title: 'Activity', content: <Activity />, className: 'col-span-1 row-span-2' },
    { id: 'projects', title: 'Projects', content: <Projects projects={data.projects} />, className: 'col-span-4 row-span-3' },
    { id: 'skills', title: 'Skills', content: <Skills skills={data.skills}/>, className: 'col-span-3 row-span-3' },
    { id: 'experience', title: 'Work Experience', content: <Experience experiences={data.experience} />, className: 'col-span-1 row-span-3' },
    { id: 'certifications', title: 'Certifications', content: <Certifications certifications={data.certifications} />, className: 'col-span-4 row-span-1'},
    { id: 'funfacts', title: 'Fun Facts', content: 'Email, socials, or resume download.', className: 'col-span-1 row-span-2' },
    { id: 'techstack', title: 'Extra', content: 'Email, socials, or resume download.', className: 'col-span-3 row-span-2' },
    { id: 'education', title: 'Education', content: <Education />, className: 'col-span-2 row-span-2' },
    { id: 'random', title: 'Random', content: "<Education />", className: 'col-span-1 row-span-2' },
    { id: 'random2', title: 'Random', content: "<Education />", className: 'col-span-1 row-span-2' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="Tyche01.fun" />

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

      <Footer/>
    </div>
  );
};

export default MainPage;
