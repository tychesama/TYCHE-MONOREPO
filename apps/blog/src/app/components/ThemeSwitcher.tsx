"use client";

import { useTheme } from '@shared/ui/hooks/useTheme';
import '@shared/ui/globals.css'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  if (!theme) return null; 

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 50,
      }}
    >
      <select
        value={theme} 
        onChange={(e) => setTheme(e.target.value)

        }
        className="bg-[var(--color-card)] text-[var(--color-text-main)] border border-gray-600 text-sm rounded px-2 py-1 shadow transition-colors"
      >
        <option value="professional">Professional</option>
        <option value="alternate">Alternative</option>
        <option value="interactive">Interactive</option>
        <option value="special1">Special 1</option>
        <option value="special2">Special 2</option>
        <option value="special3">Special 3</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;

