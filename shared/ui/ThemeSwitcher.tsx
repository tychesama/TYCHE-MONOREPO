"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import ReusableModal from "./ReusableModal";
import CloseIcon from "@mui/icons-material/Close";

import "./globals.css";

const ThemeSwitcher = () => {
  const THEME_PREVIEW: Record<string, { card: string; text: string }> = {
    professional: { card: "#1f2430", text: "#e8edf2" },
    alternate: { card: "#111111", text: "#ffd400" },
    interactive: { card: "#0b1220", text: "#e5e7eb" },
    special1: { card: "#1a1033", text: "#f4e9ff" },
    special2: { card: "#102a1f", text: "#eafff3" },
    special3: { card: "#1f4d2b", text: "#e9ffd6" },
  };

  const BackgroundPreview = ({
    variant,
    card,
    text,
  }: {
    variant: "bubbles" | "squares" | "stars";
    card: string;
    text: string;
  }) => {
    const base = `linear-gradient(135deg, ${card} 0%, ${card} 50%, ${text} 50%, ${text} 100%)`;

    const overlay =
      variant === "bubbles"
        ? `
        radial-gradient(circle at 25% 30%, rgba(255,255,255,0.22) 0 22%, transparent 24%),
        radial-gradient(circle at 70% 35%, rgba(255,255,255,0.16) 0 18%, transparent 20%),
        radial-gradient(circle at 45% 75%, rgba(255,255,255,0.18) 0 20%, transparent 22%)
      `
        : variant === "squares"
          ? `
        linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)
      `
          : `
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0 1px, transparent 2px),
        radial-gradient(circle at 70% 40%, rgba(255,255,255,0.18) 0 1px, transparent 2px),
        radial-gradient(circle at 45% 80%, rgba(255,255,255,0.20) 0 1px, transparent 2px)
      `;

    const overlaySizing =
      variant === "squares"
        ? { backgroundSize: "10px 10px, 10px 10px" }
        : { backgroundSize: "auto" };

    return (
      <div
        className="
        w-10 h-10 rounded-md overflow-hidden
        border border-black/20
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
        shrink-0
      "
        title={`${variant} preview`}
        style={{
          backgroundImage: `${overlay}, ${base}`,
          ...overlaySizing,
        }}
      />
    );
  };



  const { theme, setTheme, background, setBackground } = useTheme();

  const [open, setOpen] = useState(false);
  const [tempTheme, setTempTheme] = useState<string>(theme!);

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
          <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
            Theme
          </label>

          <div className="flex items-center gap-3">
            <select
              value={tempTheme}
              onChange={(e) => setTempTheme(e.target.value)}
              className="
        flex-1
        bg-[var(--color-card)]
        text-[var(--color-text-main)]
        border border-transparent
        rounded-md
        px-3 py-2.5
        text-sm font-medium tracking-wide
        outline-none transition
        hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)]
        focus:border-[var(--color-text-subtle)]
        focus:ring-2 focus:ring-blue-500/30
        focus:bg-[color-mix(in_srgb,var(--color-card)_88%,white)]
      "
            >
              <option value="professional">Standard</option>
              <option value="alternate">Black & Yellow</option>
              <option value="interactive">Dark (WIP)</option>
              <option value="special1">Special 1 (WIP)</option>
              <option value="special2">Special 2 (WIP)</option>
              <option value="special3">Shrek Green</option>
            </select>

            {/* Live Preview for tempTheme */}
            <div
              className="
        w-10 h-10 rounded-md overflow-hidden
        border border-black/20
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
        shrink-0
      "
              title="Theme preview"
              style={{
                background: `linear-gradient(135deg,
          ${THEME_PREVIEW[tempTheme]?.card ?? "#222"} 0%,
          ${THEME_PREVIEW[tempTheme]?.card ?? "#222"} 50%,
          ${THEME_PREVIEW[tempTheme]?.text ?? "#eee"} 50%,
          ${THEME_PREVIEW[tempTheme]?.text ?? "#eee"} 100%
        )`,
              }}
            />
          </div>
        </div>


        {/* Background Selector */}
        <div className="mb-6">
          <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
            Background
          </label>

          <div className="flex items-center gap-3">
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value as any)}
              className="
        flex-1
        bg-[var(--color-card)]
        text-[var(--color-text-main)]
        border border-transparent
        rounded-md
        px-3 py-2.5
        text-sm font-medium tracking-wide
        outline-none
        transition
        hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)]
        focus:border-[var(--color-text-subtle)]
        focus:ring-2 focus:ring-blue-500/30
        focus:bg-[color-mix(in_srgb,var(--color-card)_88%,white)]
      "
            >
              <option value="bubbles">Bubbles</option>
              <option value="squares">Squares</option>
              <option value="stars">Stars (WIP)</option>
            </select>

            <BackgroundPreview
              variant={background as any}
              card={THEME_PREVIEW[tempTheme]?.card ?? "#222"}
              text={THEME_PREVIEW[tempTheme]?.text ?? "#eee"}
            />
          </div>
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
