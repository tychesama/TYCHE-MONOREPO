"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@shared/ui/hooks/useTheme";
import ReusableModal from "./ReusableModal";
import CloseIcon from "@mui/icons-material/Close";
import '@shared/ui/globals.css'

const THEME_PREVIEW: Record<string, { card: string; text: string }> = {
  professional: { card: "#1e293b", text: "#f9fafb" },
  alternate: { card: "#1a1a1a", text: "#ffcc00" },
  interactive: { card: "#0c1324", text: "#e6f0ff" },
  special1: { card: "#1e0f1c", text: "#f7e9f3" },
  special2: { card: "#1a120b", text: "#fff3e6" },
  special3: { card: "#1a3d1c", text: "#f0f3e5" },
};

const StarDots = [
  { cx: "50%", cy: "50%", r: 1.5, o: 1 },
  { cx: "25%", cy: "30%", r: 1, o: 0.7 },
  { cx: "72%", cy: "25%", r: 0.8, o: 0.6 },
  { cx: "80%", cy: "65%", r: 1.2, o: 0.85 },
  { cx: "30%", cy: "68%", r: 0.9, o: 0.65 },
  { cx: "60%", cy: "78%", r: 1, o: 0.5 },
  { cx: "15%", cy: "55%", r: 0.8, o: 0.55 },
  { cx: "88%", cy: "40%", r: 1, o: 0.7 },
];

const BackgroundPreview = ({
  variant,
  card,
  text,
}: {
  variant: "bubbles" | "squares" | "stars";
  card: string;
  text: string;
}) => {
  const accentColor = `${text}33`;
  const accentBorder = `${text}44`;

  return (
    <div
      className="w-10 h-10 rounded-md border border-black/80 shrink-0 relative flex items-center justify-center overflow-hidden"
      title={`${variant} preview`}
      style={{ backgroundColor: card }}
    >
      {variant === "bubbles" && (
        <div
          className="w-[22px] h-[22px] rounded-full animate-spin"
          style={{
            background: accentColor,
            border: `1px solid ${accentBorder}`,
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)",
            animationDuration: "4s",
            animationTimingFunction: "linear",
          }}
        />
      )}

      {variant === "squares" && (
        <div
          className="w-[16px] h-[16px] animate-spin"
          style={{
            background: accentColor,
            border: `1px solid ${accentBorder}`,
            borderRadius: "3px",
            animationDuration: "3s",
            animationTimingFunction: "linear",
          }}
        />
      )}

      {variant === "stars" && (
        <svg
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute inset-0"
        >
          {StarDots.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="white"
              opacity={d.o}
              style={{
                animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

interface ThemeSwitcherProps {
  open: boolean;
  onClose: () => void;
}

const ThemeSwitcher = ({ open, onClose }: ThemeSwitcherProps) => {
  const { theme, setTheme, background, setBackground, bgImage, setBgImage } = useTheme();

  const [tempTheme, setTempTheme] = useState(theme);
  const [tempBackground, setTempBackground] = useState(background);
  const [tempBgImage, setTempBgImage] = useState(bgImage);

  useEffect(() => {
    if (!open) return;
    setTempTheme(theme);
    setTempBackground(background);
    setTempBgImage(bgImage);
  }, [open, theme, background, bgImage]);

  const handleSave = () => {
    setTheme(tempTheme);
    setBackground(tempBackground);
    setBgImage(tempBgImage);
    onClose();
    window.location.reload();
  };

  const handleCancel = () => {
    setTempTheme(theme);
    setTempBackground(background);
    setTempBgImage(bgImage);
    onClose();
  };

  const selectClass =
    "flex-1 min-w-0 bg-[var(--color-card)] text-[var(--color-text-main)] border border-transparent rounded-md px-3 py-2.5 text-sm font-medium tracking-wide outline-none transition hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)] focus:border-[var(--color-text-subtle)] focus:ring-2 focus:ring-blue-500/30";

  return (
    <ReusableModal title="Settings" isOpen={open} onClose={handleCancel} CloseIcon={CloseIcon}>
      {/* Color Theme */}
      <div className="mb-6">
        <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
          Color Theme
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <select value={tempTheme} onChange={(e) => setTempTheme(e.target.value)} className={selectClass}>
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

      {/* Floating Objects */}
      <div className="mb-6">
        <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
          Floating Objects
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <select value={tempBackground} onChange={(e) => setTempBackground(e.target.value as any)} className={selectClass}>
            <option value="bubbles">Bubbles</option>
            <option value="squares">Squares</option>
            <option value="stars">Stars</option>
          </select>
          <BackgroundPreview
            variant={tempBackground as any}
            card={THEME_PREVIEW[tempTheme]?.card ?? "#222"}
            text={THEME_PREVIEW[tempTheme]?.text ?? "#eee"}
          />
        </div>
      </div>

      {/* Background Image */}
      <div className="mb-6">
        <label className="block text-md font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-main)]">
          Background Image
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <select value={tempBgImage} onChange={(e) => setTempBgImage(e.target.value)} className={selectClass}>
            <option value="none.png">None</option>
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i + 1} value={`bg${i + 1}.png`}>Background {i + 1}</option>
            ))}
          </select>
          {/* Background Image preview */}
          <div
            className="w-10 h-10 rounded-md border border-black/80 overflow-hidden shrink-0 relative bg-[var(--color-card)]"
            style={{ backgroundColor: THEME_PREVIEW[tempTheme]?.card ?? "#1e293b" }}
            title="Pattern preview"
          >
            {tempBgImage !== "none.png" ? (
              <img
                src={`/backgrounds/${tempBgImage}`}
                alt="bg preview"
                style={{
                  width: "1200%",
                  height: "1200%",
                  objectFit: "cover",
                  objectPosition: "top left",
                  opacity: 0.9,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-text-subtle)] text-lg">
                —
              </div>
            )}
          </div>
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
  );
};

export default ThemeSwitcher;