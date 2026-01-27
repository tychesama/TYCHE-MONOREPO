"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import ReusableModal from "./ReusableModal";

import "./globals.css";

const ThemeSwitcher = () => {
  const { theme, setTheme, background, setBackground } = useTheme();

  const [open, setOpen] = useState(false);
  const [tempTheme, setTempTheme] = useState<string>(theme!);

  useEffect(() => {
    if (theme) {
      setTempTheme(theme);
    }
  }, [theme]);

  if (!theme) return null;

  const handleSave = () => {
    window.location.reload();
    setTheme(tempTheme);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempTheme(theme);
    setOpen(false);
  };

  return (
    <>
      {/* Settings Button */}
      <div className="fixed top-0 right-0 z-50 w-[100px] h-[60px]">
        <button
          onClick={() => setOpen(true)}
          className="bg-[var(--color-card)] text-[var(--color-text-main)] w-full h-full shadow hover:opacity-70 transition"
          aria-label="Open settings"
        >
          Settings
        </button>
      </div>

      {/* Reusable Modal */}
      <ReusableModal
        isOpen={open}
        onClose={handleCancel}
      >
        {/* Theme Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-[var(--color-text-main)]">
            Theme
          </label>
          <select
            value={tempTheme}
            onChange={(e) => setTempTheme(e.target.value)}
            className="w-full bg-[var(--color-card)] border border-gray-600 rounded px-3 py-2 text-sm text-[var(--color-text-main)]"
          >
            <option value="professional">Standard</option>
            <option value="alternate">Black & Yellow</option>
            <option value="interactive">Dark(WIP)</option>
            <option value="special1">Special 1(WIP)</option>
            <option value="special2">Special 2(WIP)</option>
            <option value="special3">Shrek Green</option>
          </select>
        </div>

        {/* Placeholder Settings */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="radio"
              name="background"
              checked={background === "bubbles"}
              onChange={() => setBackground("bubbles")}
            />
            Bubbles
          </label>

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="radio"
              name="background"
              checked={background === "squares"}
              onChange={() => setBackground("squares")}
            />
            Squares
          </label>

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="radio"
              name="background"
              checked={background === "stars"}
              onChange={() => setBackground("stars")}
            />
            Stars (WIP)
          </label>
        </div>


        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm border border-gray-600 rounded hover:opacity-80 text-[var(--color-text-main)]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </ReusableModal>
    </>
  );
};

export default ThemeSwitcher;
