"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@shared/ui/hooks/useTheme";
import ReusableModal from "@shared/ui/ReusableModal";
import CloseIcon from "@mui/icons-material/Close";

import '@shared/ui/globals.css'

const ThemeSwitcher = () => {
  const { theme, setTheme, background, setBackground } = useTheme();

  const [open, setOpen] = useState(false);
  const [tempTheme, setTempTheme] = useState<string>(theme);

  useEffect(() => {
    setTempTheme(theme);
  }, [theme]);

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
          className="bg-[var(--color-card)] text-[var(--color-text-main)] w-full h-full shadow hover:opacity-80 transition text-sm font-medium tracking-wide"
          aria-label="Open settings"
        >
          Settings
        </button>
      </div>

      {/* Reusable Modal */}
      <ReusableModal
        isOpen={open}
        onClose={handleCancel}
        CloseIcon={CloseIcon}
      >
        {/* Theme Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-muted)]"
          >
            Theme
          </label>
          <select
            value={tempTheme}
            onChange={(e) => setTempTheme(e.target.value)}
            className="w-full bg-[var(--color-card)] border border-gray-600 rounded-md px-3 py-2.5 text-sm font-medium tracking-wide text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/40"

          >
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="professional">Standard</option>
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="alternate">Black & Yellow</option>
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="interactive">Dark(WIP)</option>
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="special1">Special 1(WIP)</option>
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="special2">Special 2(WIP)</option>
            <option className="flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-text-main)] cursor-pointer"
              value="special3">Shrek Green</option>
          </select>
        </div>

        {/* Placeholder Settings */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              className="accent-blue-500"

              type="radio"
              name="background"
              checked={background === "bubbles"}
              onChange={() => setBackground("bubbles")}
            />
            Bubbles
          </label>

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              className="accent-blue-500"
              type="radio"
              name="background"
              checked={background === "squares"}
              onChange={() => setBackground("squares")}
            />
            Squares
          </label>

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              className="accent-blue-500"
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
            className="px-4 py-2 text-sm font-medium tracking-wide border border-gray-600 rounded-md hover:bg-white/5 transition text-[var(--color-text-main)]"

          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold tracking-wide rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"

          >
            Save
          </button>
        </div>
      </ReusableModal>
    </>
  );
};

export default ThemeSwitcher;
