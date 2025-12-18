import React from 'react';
import './globals.css'

interface HeaderProps {
  title?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Tyche01',
  navLinks = [
    { label: 'Resume', href: '#profile' },
    { label: 'Projects', href: '#projects' },
    { label: 'Github', href: 'https://github.com/tychesama/tyche' },
  ]
}) => {
  return (
    <header className="bg-[var(--color-card)] shadow sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">{title}</h1>
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
    </header>
  );
};

export default Header;