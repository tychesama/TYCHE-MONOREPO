import React from 'react';
import './globals.css'


const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-card)] text-center py-4 mt-12 z-10 transition-colors z-10">
      <p className="text-sm text-[var(--color-text-subtle)]">
        © {new Date().getFullYear()} Joem Idpan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;