'use client'

import React, { useState, useEffect } from 'react';
import '@shared/ui/globals.css'
import ThemeSwitcher from './ThemeSwitcher';
import Logo from '@shared/icons/Dice-Logo';

interface HeaderProps {
  title?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Joem Idpan',
  navLinks = [
    { label: 'Resume', href: '#profile' },
    { label: 'Github', href: 'https://github.com/tychesama' },
  ]
}) => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDesktop, setIsDesktop]       = useState(false);

  const homeUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : 'https://tyche01.fun';

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setMenuOpen(false);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [menuOpen]);

  const linkClass =
    "hover:text-[var(--color-text-subtle)] transition-colors text-sm font-medium tracking-wide";

  return (
    <>
      <header className="bg-[var(--color-card)] shadow sticky top-0 z-30 transition-colors h-[60px]">
        <div className="flex flex-row justify-between items-center h-full px-4 md:px-8 max-w-screen-xl mx-auto">

          {/* Logo */}
          <a
            href={homeUrl}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo size={36} />
            <span className="text-xl font-bold text-[var(--color-text-main)]">
              {title}
            </span>
          </a>

          {/* Desktop nav */}
          {isDesktop && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith('http');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={linkClass}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </a>
                );
              })}
              <button
                onClick={() => setSettingsOpen(true)}
                className={`${linkClass} cursor-pointer`}
              >
                Settings
              </button>
            </nav>
          )}

          {/* Mobile hamburger */}
          {!isDesktop && (
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded transition-colors hover:bg-white/10 focus:outline-none"
            >
              <span className={`block h-0.5 w-5 bg-[var(--color-text-main)] rounded transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-[var(--color-text-main)] rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-[var(--color-text-main)] rounded transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile nav drawer */}
      {!isDesktop && (
        <div className={`fixed inset-0 z-20 transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            style={{
              position: 'absolute',
              top: '60px',
              left: 0,
              right: 0,
              background: 'var(--color-card)',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.875rem',
              fontWeight: 500,
              overflow: 'hidden',
              maxHeight: menuOpen ? '16rem' : '0',
              opacity: menuOpen ? 1 : 0,
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          >
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('http');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors text-[var(--color-text-main)]"
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={() => { setMenuOpen(false); setSettingsOpen(true); }}
              className="px-6 py-4 text-left hover:bg-white/5 transition-colors text-[var(--color-text-main)]"
            >
              Settings
            </button>
          </nav>
        </div>
      )}

      <ThemeSwitcher open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Header;