"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import ReusableModal from "./ReusableModal";
import CloseIcon from "@mui/icons-material/Close";

import "./globals.css";

const ThemeSwitcher = () => {
  const THEME_PREVIEW: Record<string, { card: string; text: string }> = {
    professional: { card: "#1e293b", text: "#f9fafb" },
    alternate: { card: "#1a1a1a", text: "#ffcc00" },
    interactive: { card: "#0c1324", text: "#e6f0ff" },
    special1: { card: "#1e0f1c", text: "#f7e9f3" },
    special2: { card: "#1a120b", text: "#fff3e6" },
    special3: { card: "#1a3d1c", text: "#f0f3e5" },

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
    const base = `
    radial-gradient(circle at 25% 20%, ${text}18 0%, transparent 60%),
    radial-gradient(circle at 80% 35%, ${text}12 0%, transparent 65%),
    linear-gradient(135deg, ${card} 0%, ${card} 100%)
  `;

    const overlay =
      variant === "bubbles"
        ? `
        radial-gradient(circle at 70% 35%, rgba(255,255,255,0.22) 0 28%, transparent 30%),
        radial-gradient(circle at 68% 33%, rgba(255,255,255,0.10) 0 36%, transparent 38%)
      `
        : variant === "squares"
          ? `
        linear-gradient(rgba(255,255,255,0.20), rgba(255,255,255,0.20))
      `
          : `
        radial-gradient(circle at 70% 35%, rgba(255,255,255,0.85) 0 1px, transparent 2px),
        radial-gradient(circle at 78% 28%, rgba(255,255,255,0.60) 0 1px, transparent 2px),
        radial-gradient(circle at 62% 30%, rgba(255,255,255,0.70) 0 1px, transparent 2px)
      `;
    const extra =
      variant === "squares"
        ? {
          backgroundImage: `${base}`,
          position: "relative" as const,
        }
        : {};

    return (
      <div
        className="w-10 h-10 overflow-hidden rounded-md border border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] shrink-0 relative"
        title={`${variant} preview`}
        style={{
          backgroundImage: `${overlay}, ${base}`,
        }}
      >
        {variant === "squares" && (
          <div
            className="absolute right-[7px] top-[7px] w-[14px] h-[14px] rounded-[3px]"
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.35)",
            }}
          />
        )}

        {variant === "bubbles" && (
          <div
            className="absolute right-[6px] top-[6px] w-[18px] h-[18px] rounded-full"
            style={{
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
            }}
          />
        )}
      </div>
    );
  };

  const { theme, setTheme, background, setBackground, bgImage, setBgImage } = useTheme();

  const [open, setOpen] = useState(false);

  const [tempTheme, setTempTheme] = useState<string>(theme);
  const [tempBackground, setTempBackground] = useState(background);
  const [tempBgImage, setTempBgImage] = useState(bgImage);


  useEffect(() => {
    if (!open) return;
    setTempTheme(theme);
    setTempBackground(background);
    setTempBgImage(bgImage);
  }, [open, theme, background, bgImage]);

  const handleSave = () => {
    window.location.reload();
    setTheme(tempTheme);
    setBackground(tempBackground);
    setBgImage(tempBgImage);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempTheme(theme);
    setTempBackground(background);
    setTempBgImage(bgImage);
    setOpen(false);
  };


  return (
    <>
      {/* Settings Button */}
      <div className="fixed top-0 right-0 z-50 w-[100px] h-[60px]">
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-[var(--color-card)] text-[var(--color-text-main)] w-full h-full hover:opacity-80 transition text-sm font-medium tracking-wide"
          aria-label="Open settings"
        >
          Settings
        </button>
      </div>

      {/* Reusable Modal */}
      <ReusableModal title="Settings" isOpen={open} onClose={handleCancel} CloseIcon={CloseIcon}>
        {/* Theme Selector */}
        <div className="mb-6">
          <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
            Color Theme
          </label>

          <div className="flex items-center gap-3">
            <select
              value={tempTheme}
              onChange={(e) => setTempTheme(e.target.value)}
              className="flex-1 bg-[var(--color-card)] text-[var(--color-text-main)] border border-transparent rounded-md px-3 py-2.5 text-sm font-medium tracking-wide outline-none transition hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)] focus:border-[var(--color-text-subtle)] focus:ring-2 focus:ring-blue-500/30 focus:bg-[color-mix(in_srgb,var(--color-card)_88%,white)]"
            >
              <option value="professional">Standard</option>
              <option value="alternate">Black & Yellow</option>
              <option value="interactive">Neon Slate</option>
              <option value="special1">Midnight Rose</option>
              <option value="special2">Desert Dusk</option>
              <option value="special3">Shrek Green</option>
            </select>

            <div
              className="w-10 h-10 overflow-hidden rounded-md border border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] shrink-0"
              title="Theme preview"
              style={{
                background: `linear-gradient(135deg, ${THEME_PREVIEW[tempTheme]?.card ?? "#222"} 0%, ${THEME_PREVIEW[tempTheme]?.card ?? "#222"} 50%, ${THEME_PREVIEW[tempTheme]?.text ?? "#eee"} 50%, ${THEME_PREVIEW[tempTheme]?.text ?? "#eee"} 100%)`,
              }}
            />
          </div>
        </div>

        {/* Background Selector */}
        <div className="mb-6">
          <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
            Floating Objects
          </label>

          <div className="flex items-center gap-3">
            <select
              value={tempBackground}
              onChange={(e) => setTempBackground(e.target.value as any)}
              className="flex-1 bg-[var(--color-card)] text-[var(--color-text-main)] border border-transparent rounded-md px-3 py-2.5 text-sm font-medium tracking-wide outline-none transition hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)] focus:border-[var(--color-text-subtle)] focus:ring-2 focus:ring-blue-500/30"
      >
              <option value="bubbles">Bubbles</option>
              <option value="squares">Squares</option>
              <option value="stars">Stars (WIP)</option>
            </select>

            <BackgroundPreview
              variant={tempBackground as any}
              card={THEME_PREVIEW[tempTheme]?.card ?? "#222"}
              text={THEME_PREVIEW[tempTheme]?.text ?? "#eee"}
            />
          </div>
        </div>

        {/* Pattern Image */}
        <div className="mb-6">
          <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
            Background Image
          </label>

          <div className="flex items-center gap-3">
            <select
              value={tempBgImage}
              onChange={(e) => setTempBgImage(e.target.value)}
              className="flex-1 bg-[var(--color-card)] text-[var(--color-text-main)] border border-transparent rounded-md px-3 py-2.5 text-sm font-medium tracking-wide outline-none transition hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)] focus:border-[var(--color-text-subtle)] focus:ring-2 focus:ring-blue-500/30"
      >
              <option value="none.png">None</option>
              <option value="bg1.png">Background 1</option>
              <option value="bg2.png">Background 2</option>
              <option value="bg3.png">Background 3</option>
              <option value="bg4.png">Background 4</option>
              <option value="bg5.png">Background 5</option>
              <option value="bg6.png">Background 6</option>
              <option value="bg7.png">Background 7</option>
              <option value="bg8.png">Background 8</option>
              <option value="bg9.png">Background 9</option>
              <option value="bg10.png">Background 10</option>
              <option value="bg11.png">Background 11</option>
            </select>

            <div
              className="w-10 h-10 rounded-md border border-black/80 overflow-hidden shrink-0"
              style={{
                backgroundImage: tempBgImage === "none.png" ? "none" : `url('/backgrounds/${tempBgImage}')`,
                backgroundSize: "var(--sheet-w) var(--sheet-h)",
                backgroundPosition: "var(--bg-x) var(--bg-y)",
              }}
              title="Pattern preview"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium tracking-wide border border-gray-600 rounded-md hover:bg-white/5 transition text-[var(--color-text-main)]">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold tracking-wide rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Save
          </button>
        </div>
      </ReusableModal>
    </>
  );
};

export default ThemeSwitcher;
