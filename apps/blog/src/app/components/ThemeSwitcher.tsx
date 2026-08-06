"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@shared/ui/hooks/useTheme";
import ReusableModal from "./ReusableModal";
import CloseIcon from "@mui/icons-material/Close";
import "@shared/ui/globals.css";

type BackgroundVariant =
  | "bubbles"
  | "squares"
  | "stars";

function isBackgroundVariant(
  value: string,
): value is BackgroundVariant {
  return (
    value === "bubbles" ||
    value === "squares" ||
    value === "stars"
  );
}

function normalizeBackground(
  value: string,
): BackgroundVariant {
  return isBackgroundVariant(value)
    ? value
    : "bubbles";
}

const THEME_PREVIEW: Record<
  string,
  {
    card: string;
    text: string;
  }
> = {
  professional: {
    card: "#1e293b",
    text: "#f9fafb",
  },
  alternate: {
    card: "#1a1a1a",
    text: "#ffcc00",
  },
  interactive: {
    card: "#0c1324",
    text: "#e6f0ff",
  },
  special1: {
    card: "#1e0f1c",
    text: "#f7e9f3",
  },
  special2: {
    card: "#1a120b",
    text: "#fff3e6",
  },
  special3: {
    card: "#1a3d1c",
    text: "#f0f3e5",
  },
};

const STAR_DOTS = [
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
  variant: BackgroundVariant;
  card: string;
  text: string;
}) => {
  const accentColor = `${text}33`;
  const accentBorder = `${text}44`;

  return (
    <div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-black/80"
      title={`${variant} preview`}
      style={{ backgroundColor: card }}
    >
      {variant === "bubbles" && (
        <div
          className="h-[22px] w-[22px] animate-spin rounded-full"
          style={{
            background: accentColor,
            border: `1px solid ${accentBorder}`,
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.2)",
            animationDuration: "4s",
            animationTimingFunction: "linear",
          }}
        />
      )}

      {variant === "squares" && (
        <div
          className="h-[16px] w-[16px] animate-spin"
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
          className="absolute inset-0 h-full w-full"
        >
          {STAR_DOTS.map((dot, index) => (
            <circle
              key={`${dot.cx}-${dot.cy}`}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="white"
              opacity={dot.o}
              style={{
                animation: `twinkle ${
                  1.5 + index * 0.3
                }s ease-in-out infinite alternate`,
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

const ThemeSwitcher = ({
  open,
  onClose,
}: ThemeSwitcherProps) => {
  const {
    theme,
    setTheme,
    background,
    setBackground,
    bgImage,
    setBgImage,
  } = useTheme();

  const [tempTheme, setTempTheme] =
    useState(theme);

  const [tempBackground, setTempBackground] =
    useState<BackgroundVariant>(
      normalizeBackground(background),
    );

  const [tempBgImage, setTempBgImage] =
    useState(bgImage);

  const handleSave = () => {
    setTheme(tempTheme);
    setBackground(tempBackground);
    setBgImage(tempBgImage);
    onClose();

    window.location.reload();
  };

  const handleCancel = () => {
    setTempTheme(theme);
    setTempBackground(
      normalizeBackground(background),
    );
    setTempBgImage(bgImage);
    onClose();
  };

  const selectClass =
    "flex-1 min-w-0 bg-[var(--color-card)] text-[var(--color-text-main)] border border-transparent rounded-md px-3 py-2.5 text-sm font-medium tracking-wide outline-none transition hover:bg-[color-mix(in_srgb,var(--color-card)_92%,white)] focus:border-[var(--color-text-subtle)] focus:ring-2 focus:ring-blue-500/30";

  const preview =
    THEME_PREVIEW[tempTheme] ?? {
      card: "#222222",
      text: "#eeeeee",
    };

  return (
    <ReusableModal
      title="Settings"
      isOpen={open}
      onClose={handleCancel}
      CloseIcon={CloseIcon}
    >
      <div className="mb-6">
        <label className="mb-2 block text-md font-semibold uppercase tracking-wider text-[var(--color-text-main)]">
          Color Theme
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={tempTheme}
            onChange={(event) =>
              setTempTheme(event.target.value)
            }
            className={selectClass}
          >
            <option value="professional">
              Standard
            </option>
            <option value="alternate">
              Black & Yellow
            </option>
            <option value="interactive">
              Neon Slate
            </option>
            <option value="special1">
              Midnight Rose
            </option>
            <option value="special2">
              Desert Dusk
            </option>
            <option value="special3">
              Shrek Green
            </option>
          </select>

          <div
            className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
            title="Theme preview"
            style={{
              background: `linear-gradient(
                135deg,
                ${preview.card} 0%,
                ${preview.card} 50%,
                ${preview.text} 50%,
                ${preview.text} 100%
              )`,
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-md font-semibold uppercase tracking-wider text-[var(--color-text-main)]">
          Floating Objects
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={tempBackground}
            onChange={(event) => {
              const value = event.target.value;

              if (isBackgroundVariant(value)) {
                setTempBackground(value);
              }
            }}
            className={selectClass}
          >
            <option value="bubbles">
              Bubbles
            </option>
            <option value="squares">
              Squares
            </option>
            <option value="stars">
              Stars
            </option>
          </select>

          <BackgroundPreview
            variant={tempBackground}
            card={preview.card}
            text={preview.text}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-md font-semibold uppercase tracking-wider text-[var(--color-text-main)]">
          Background Image
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={tempBgImage}
            onChange={(event) =>
              setTempBgImage(event.target.value)
            }
            className={selectClass}
          >
            <option value="none.png">
              None
            </option>

            {Array.from(
              { length: 11 },
              (_, index) => {
                const imageNumber = index + 1;

                return (
                  <option
                    key={imageNumber}
                    value={`bg${imageNumber}.png`}
                  >
                    Background {imageNumber}
                  </option>
                );
              },
            )}
          </select>

          <div
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-black/80 bg-[var(--color-card)]"
            style={{
              backgroundColor: preview.card,
            }}
            title="Pattern preview"
          >
            {tempBgImage !== "none.png" ? (
              <Image
                src={`/backgrounds/${tempBgImage}`}
                alt="Background preview"
                fill
                sizes="40px"
                className="object-cover opacity-90"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg text-[var(--color-text-subtle)]">
                —
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium tracking-wide text-[var(--color-text-main)] transition hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold tracking-wide text-white transition hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </ReusableModal>
  );
};

export default ThemeSwitcher;