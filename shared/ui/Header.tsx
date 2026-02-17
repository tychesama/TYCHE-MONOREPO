import React from 'react';
import './globals.css';
import ThemeSwitcher from '@shared/ui/ThemeSwitcher';

interface HeaderProps {
  title?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Joem Idpan',
  navLinks = [
    { label: 'Resume', href: '#profile' },
    { label: 'Projects', href: '#projects' },
    { label: 'Github', href: 'https://github.com/tychesama' },
  ]
}) => {

  const homeUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://tyche01.fun";

  return (
    <header className="bg-[var(--color-card)] shadow sticky top-0 z-30 transition-colors h-[60px]">
      <div className="flex flex-row justify-center items-center gap-[600px] h-full">
        <a
          href={homeUrl}
          className="text-xl font-bold text-primary hover:text-primary transition-colors"
        >
          {title}
        </a>
        <nav className="space-x-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith('http');

            return (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
                {...(isExternal && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;